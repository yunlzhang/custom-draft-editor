
import ImageBlock from './component/image_render'

export default (setEditorState, getEditorState) => (contentBlock) => {
    const type = contentBlock.getType();
    switch (type) {
        case 'atomic:image': 
            return {
                component: ImageBlock,
                props: {
                    setEditorState,
                    getEditorState,
                },
            };
        // case 'LINK':
        //     console.log('hhhhhh')
        // break;
        default: return null;
    }
};
  