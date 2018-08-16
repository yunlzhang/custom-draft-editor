import React, { Component } from 'react'

import { generateKeyBind } from '../func';

export default class LinkButton extends Component{

    constructor(){
        super();
        this.state = {
            isActive:false
        }
    }


    onClick = () => {
        let {setLinkData,getEditorState} = this.props;

        let editorState = getEditorState();
        let selectionState = editorState.getSelection();
        let anchorKey = selectionState.getAnchorKey();
        let currentContent = editorState.getCurrentContent();
        let currentContentBlock = currentContent.getBlockForKey(anchorKey);
        let start = selectionState.getStartOffset();
        let end = selectionState.getEndOffset();
        let selectedText = currentContentBlock.getText().slice(start, end);

        setLinkData({
            isShow:true,
            linkText:selectedText
        })   
    }


    render(){
        let {label} = this.props;
        return(
            <button
                className={`editor-control hint--bottom ${this.state.isActive ? 'active' : ''}`}
                type="button"
                onClick={this.onClick}
                aria-label={label}//+`(${generateKeyBind(this.props)})`
            > 
                <svg aria-hidden="true" className="icon"><use xlinkHref='#icon-link'></use></svg>
            </button>
        )
    }
}