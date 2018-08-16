import React from 'react';
import {INLINE_BUTTONS,BLOCK_BUTTONS,CUSTOM_BUTTONS} from './constant'
import {generateKeyBind} from './func';

import ImageButton from './component/image';
import LinkButton from './component/link';

const InlineControl = props => {
    let {toggleInlineStyle,editorState} = props;
    /* eslint-disable no-unused-vars */
    let currentStyle = editorState.getCurrentInlineStyle();
    
    return <button 
        className={`editor-control hint--bottom editor-${props.label} ${currentStyle.has(props.style) ? 'active' :''}` } 
        aria-label={props.label}//+`(${generateKeyBind(props)})`
        onMouseDown={
            (e) => {
                e.preventDefault();
                toggleInlineStyle(props.style);
            }
        }
        >{props.icon ? <svg aria-hidden="true" className="icon"><use xlinkHref={'#'+props.icon}></use></svg> : props.label}</button>

}

const BlockControl = props => {
    let {toggleBlockType,editorState} = props;
    let selection = editorState.getSelection();
    let blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();
    return <button 
        className={`editor-control hint--bottom editor-${props.label} ${props.style === blockType ? 'active' :''}` } 
        aria-label={props.label}//+`(${generateKeyBind(props)})`
        onMouseDown={
            (e) => {
                e.preventDefault();
                toggleBlockType(props.style);
            }
        }
        >{props.icon ? <svg aria-hidden="true" className="icon"><use xlinkHref={'#'+props.icon}></use></svg> : props.label}</button>

}

const EditorBar = (props) => {
    return (
        <div>
            {INLINE_BUTTONS.map((item,index) => {
                return <InlineControl key={index} {...Object.assign({},props,item)}/>
            })}
            {BLOCK_BUTTONS.map((item,index) => {
                return <BlockControl key={index} {...Object.assign({},props,item)}/>
            })}
            <ImageButton {...Object.assign({},CUSTOM_BUTTONS.IMAGE,props)}/>
            <LinkButton {...Object.assign({},CUSTOM_BUTTONS.LINK,props)}/>
        </div>
    )
}

export default EditorBar;