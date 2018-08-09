import React, { Component } from 'react';
import {EditorState,RichUtils,Modifier,} from 'draft-js';
import {moveSelectionToEnd} from '../func';

function IsURL(str_url){
    let reg = /(http|https):\/\/.+/g
    if (reg.test(str_url)){
        return true;
    }else{
        return false;
    }
}
 

class InsertLink extends Component{

    constructor(props){
        super(props);
        this.state = {
            isActive:false
        }
    }

    onInput = (e) => {
        let {setLinkData} = this.props;
        let type = e.target.getAttribute('data-type');
        if(type === 'text'){
            setLinkData({
                linkText:e.target.value
            })
        }else{
            setLinkData({
                linkAddress:e.target.value
            })
            this.setState({
                isActive:IsURL(e.target.value)
            })
        }        
    }

    close = () => {
        let {setLinkData} = this.props;

        setLinkData({
            linkText:'',
            linkAddress:'',
            isShow:false
        })
    }


    confirm = ()=>{
        if(!this.state.isActive) return;
        let {getEditorState,setEditorState,linkData,setLinkData,editor} = this.props;
        let editorState = getEditorState();
        let selection = editorState.getSelection();
        let contentState = editorState.getCurrentContent();
        let contentStateWithEntity = contentState.createEntity(
            'LINK',
            'MUTABLE',
            {url: linkData.linkAddress},

        );
        let entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newEditorState;
        if(selection.isCollapsed()){//选区没内容
            newEditorState = EditorState.set(editorState, { currentContent: Modifier.replaceText(
                contentState,
                selection,
                `${linkData.linkText || linkData.linkAddress}`,
                editorState.getCurrentInlineStyle(),
                entityKey,
            )});
        }else{
            newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        }

        newEditorState = moveSelectionToEnd(newEditorState);
        setEditorState(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey),()=>{
            setLinkData({
                linkText:'',
                linkAddress:'',
                isShow:false
            })
            editor && editor.focus();
            
        });
    }

    render(){
        let {linkData} = this.props;
        if(!linkData.isShow) return null;
        return (
            <div className="insert-link-wrap">
                <div className="insert-link-inner">
                    <span className="close" onClick={this.close}>&times;</span>
                    <h3>插入链接</h3>
                    <div className="link-text">
                        <span>链接内容:</span>
                        <input type="text" data-type="text" value={linkData.linkText}  onChange={this.onInput}/>
                    </div>
                    <div className="link-address">
                        <span>链接地址:</span>
                        <input type="text" data-type="value" value={linkData.linkAddress} onChange={this.onInput}/>
                    </div>
                    <div className="buttons">
                        <div className="cancel btn" onClick={this.close}>取消</div>
                        <div className={`confirm btn ${this.state.isActive ? 'active' : ''}`} onClick={this.confirm}>确认</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default InsertLink;