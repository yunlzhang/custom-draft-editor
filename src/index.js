import React,{Component} from 'react';
import {Editor,RichUtils,CompositeDecorator,Modifier} from 'draft-js';
import {resetBlockWithType,addNewBlockAt,getCurrentBlock,createEditorState,findLinkEntities} from './func'
import isSoftNewlineEvent from 'draft-js/lib/isSoftNewlineEvent';
import {CONTINUS_BLOCKS} from './constant'

import './iconfont/iconfont';


import './css/hint.css';
import './css/editor.scss';
import './css/draft.css';

/* componets */
import EditorBar from './bar';
import customRender from './customrender' ;
import InsertLink from './component/link_edit';
import Link from './component/link_render';
/* end */

import convert2Html from './util/draft2html'; 

const linkDecorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);


class CustomDraftEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorState: createEditorState(this.props.article || '',linkDecorator),
            linkData:{
                linkText:'',
                linkAddress:'',
                isShow:false
            }
        };
        this.blockRendererFn = customRender.call(this,this.onChange, this.getEditorState);
    }

    onChange = (editorState,callback)=> {
        this.setState({editorState},()=>{
            typeof callback === 'function' && callback();
        });
    }

    getHtml = ()=>{
        let editorState = this.state.editorState;
        let result = convert2Html(editorState.getCurrentContent());
        return result;
    }

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
          this.onChange(newState);
          return 'handled';
        }
        return 'not-handled';
    }

    toggleInlineStyle = (inlineStyle)=>{
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    toggleBlockType = (blockType) => {
        this.onChange(
          RichUtils.toggleBlockType(
            this.state.editorState,
            blockType
          )
        );
    }

    handlePastedText = (text, html, es) => {
        const currentBlock = getCurrentBlock(this.state.editorState);
        console.log(currentBlock.getType())
        if (currentBlock.getType() === 'atomic:image') {
            const { editorState } = this.state;
            const content = editorState.getCurrentContent();
            this.onChange(
                EditorState.push(
                    editorState,
                    Modifier.insertText(
                        content,
                        editorState.getSelection(),
                        text
                    )
                )
            );
            return 'handled';
        }

        // if (this.handlePastedText && this.handlePastedText(text, html, es) === 'handled') {
        //     alert(2);
        //     return 'handled';
        // }
        return 'not-handled';
    }



    handleReturn = (e) =>{
        const { editorState } = this.state;
        if (isSoftNewlineEvent(e)) {
            this.onChange(RichUtils.insertSoftNewline(editorState));
            return 'handled';
        }
        if (!e.altKey && !e.metaKey && !e.ctrlKey) {
            const currentBlock = getCurrentBlock(editorState);
            const blockType = currentBlock.getType();
    
            if (currentBlock.getLength() === 0) {
                switch (blockType) {
                    case 'header-one':
                    case 'header-two':
                    case 'header-three':
                    case 'header-four':
                    case 'blockquote':
                    case 'unordered-list-item':
                    case 'ordered-list-item':
                    case 'code-block':
                        this.onChange(resetBlockWithType(editorState, 'unstyled'));
                        return 'handled';
                    default:
                        return 'not-handled';
                }
            }
    
            const selection = editorState.getSelection();
    
            if (selection.isCollapsed() && currentBlock.getLength() === selection.getStartOffset()) {
                if (CONTINUS_BLOCKS.indexOf(blockType) < 0) {
                    this.onChange(addNewBlockAt(editorState, currentBlock.getKey()));
                return 'handled';
                }
                return 'not-handled';
            }
            return 'not-handled';
        }
        return 'not-handled';
    }

    getEditorState = () =>{
        return this.state.editorState;
    }

    setLinkData = (data) => {
        this.setState({
            linkData:Object.assign({},this.state.linkData,data)
        })
    }

    render(){
        let {editorState,linkData}  = this.state;
        let className = 'custom-draft-editor'
        let contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' hide-placeholder';
            }
        }
        return (
            <div ref="custom-editor" className={className}>
                <div className="editor-bar">
                    <EditorBar 
                    toggleInlineStyle={this.toggleInlineStyle} 
                    toggleBlockType={this.toggleBlockType}
                    setEditorState={this.onChange}
                    setLinkData={this.setLinkData}
                    getEditorState = {this.getEditorState}
                    editor={this.editor} 
                    uploadFunc={this.props.uploadFunc}
                    editorState={editorState}></EditorBar>
                </div>
                <div className="editor-content">
                    <Editor 
                        editorState={this.state.editorState} 
                        handleKeyCommand={this.handleKeyCommand}
                        handleReturn={this.handleReturn}
                        placeholder="writing something"
                        blockRendererFn={this.blockRendererFn}
                        ref={(ref) => this.editor = ref}
                        handlePastedText={this.handlePastedText}
                        onChange={this.onChange} />
                    <InsertLink 
                        setEditorState={this.onChange}
                        getEditorState = {this.getEditorState}
                        setLinkData={this.setLinkData}
                        editor={this.editor} 
                        linkData={linkData} />
                </div>
            </div>    
        )
    }
}

export default CustomDraftEditor;