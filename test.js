import React from 'react';
import ReactDOM from 'react-dom';
import CustomDraftEditor from './src/index';


class App extends React.Component{


    handleClick = () => {

        console.log(this.refs.editor.getHtml());
    }

    render(){

        return (
            <div>
                <button onClick={
                    this.handleClick
                }>获取文本内容</button>

                
                <CustomDraftEditor ref="editor"/>
            </div>
        )
    }

}



ReactDOM.render(<App/>,document.querySelector('#app'));