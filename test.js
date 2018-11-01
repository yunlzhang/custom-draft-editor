import React from 'react';
import ReactDOM from 'react-dom';

import './dist/editor.css';

import CustomDraftEditor from './dist/editor.min.js';

class App extends React.Component{

    handleClick = () => {
        console.log(this.refs.editor.getHtml());

    }

    uploadFunc = (file,callback) => {
        let formData = new FormData();

        formData.append('file',file);


        fetch('http://localhost:9001/upload',{
            method:'POST',
            body:formData
        }).then(res => {
            return res.json()
        })
        .then(res => {
            if(res.code === 200){
                callback(res.url)
            }
        })
    }

    render(){

        return (
            <div>
                <button onClick={
                    this.handleClick
                }>获取文本内容</button>

                
                <CustomDraftEditor ref="editor" uploadFunc={this.uploadFunc}/>
            </div>
        )
    }

}



ReactDOM.render(<App/>,document.querySelector('#app'));