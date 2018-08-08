import React from 'react';

import { EditorBlock, EditorState, SelectionState } from 'draft-js';

import { getCurrentBlock } from './../func';

class ImageBlock extends React.Component {

    focusBlock = () => {
        const { block, blockProps } = this.props;
        const { getEditorState, setEditorState } = blockProps;
        const key = block.getKey();
        const editorState = getEditorState();
        const currentblock = getCurrentBlock(editorState);
        if (currentblock.getKey() === key) {
            return;
        }
        const newSelection = new SelectionState({
            anchorKey: key,
            focusKey: key,
            anchorOffset: 0,
            focusOffset: 0
        });
        setEditorState(EditorState.forceSelection(editorState, newSelection));
    };

    render() {
        const { block } = this.props;
        const data = block.getData();
        const src = data.get('src');
        if (src) {
            return (
                <div>
                    <div className="custom-img" onClick={this.focusBlock}>
                        <img alt="" src={src} />
                    </div>
                    <figcaption>
                        <EditorBlock {...this.props} />
                    </figcaption>
                </div>
            );
        }
        return <EditorBlock {...this.props} />;
    }
}

export default ImageBlock;
