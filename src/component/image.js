import React from 'react';

import { addNewBlock,generateKeyBind } from '../func';


export default class ImageButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive:false
        }
        this.onClick = this.onClick.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onClick() {
        this.input.value = null;
        this.input.click();
        this.setState({
            isActive:true
        })
    }


    setImg(src){
        this.props.setEditorState(addNewBlock(
            this.props.getEditorState(),
            'atomic:image', {
                src,
            }
        ));
        this.setState({
            isActive:false
        })
    }

    onChange(e) {
        e.preventDefault();
        let uploadFunc = this.props.uploadFunc;
        if(typeof uploadFunc !== 'function') return;
        const file = e.target.files[0];
        if (file.type.indexOf('image/') === 0) {
            uploadFunc(file,this.setImg.bind(this))            
        }
    }

  render() {
    let {label} = this.props;
    return (
      <button
        className={`editor-control hint--bottom ${this.state.isActive ? 'active' : ''}`}
        type="button"
        onClick={this.onClick}
        aria-label={label}//+`(${generateKeyBind(this.props)})`
      > 
        <svg aria-hidden="true" className="icon"><use xlinkHref='#icon-image'></use></svg>
        <input
          type="file"
          accept="image/*"
          ref={(c) => { this.input = c; }}
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </button>
    );
  }
}
