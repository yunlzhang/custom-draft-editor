const INLINE_BUTTONS = [
    {
        label: 'Bold',
        style: 'BOLD',
        icon: 'icon-bold',
        keyWin:'ctrl+b',
        keyMAC:'⌘+b',
        type:'inline'
    }, {
        label: 'Italic',
        style: 'ITALIC',
        icon: 'icon-italic',
        keyWin:'ctrl+i',
        keyMAC:'⌘+i',
        type:'inline'
    }, {
        label: 'Underline',
        style: 'UNDERLINE',
        icon : 'icon-underline',
        keyWin:'',
        keyMAC:'',
        type:'inline'
    }
]

const BLOCK_BUTTONS = [
    {
        label: 'H1',
        style: 'header-one',
        keyWin:'ctrl+alt+1',
        keyMAC:'⌘+⌥+1',
        type:'block'
    }, {
        label: 'H2',
        style: 'header-two',
        keyWin:'ctrl+alt+2',
        keyMAC:'⌘+⌥+2',
        type:'block'
    }, {
        label: 'H3',
        style: 'header-three',
        keyWin:'ctrl+alt+3',
        keyMAC:'⌘+⌥+3',
        type:'block'
    }, {
        label: 'H4',
        style: 'header-four',
        keyWin:'ctrl+alt+4',
        keyMAC:'⌘+⌥+4',
        type:'block'
    }, {
        label: 'Blockquote',
        style: 'blockquote',
        icon:'icon-blockquote',
        keyWin:'ctrl+shift+u',
        keyMAC:'⌘+⇧+u',
        type:'block'
    }, {
        label: 'UL',
        style: 'unordered-list-item',
        icon: 'icon-ul',
        keyWin:'ctrl+shift+7',
        keyMAC:'⌘+⇧+7',
        type:'block'
    },
    {
        label: 'OL',
        style: 'ordered-list-item',
        icon: 'icon-ol',
        keyWin:'ctrl+shift+8',
        keyMAC:'⌘+⇧+8',
        type:'block'
    }, {
        label: 'Code Block',
        style: 'code-block',
        icon: 'icon-code',
        keyWin:'ctrl+alt+c',
        keyMAC:'⌘+⌥+c',
        type:'block'
    }
]

const CONTINUS_BLOCKS = [
    'unstyled',
    'blockquote',
    'unordered-list-item',
    'ordered-list-item',
    'code'
]

const CUSTOM_BUTTONS = {
    IMAGE:{
        label: 'image',
        style: 'atomic:image',
        icon: 'icon-image',
        keyWin:'ctrl+alt+c',
        keyMAC:'⌘+⌥+c',
        type:'block'
    }
}


export {
    INLINE_BUTTONS,
    BLOCK_BUTTONS,
    CUSTOM_BUTTONS,
    CONTINUS_BLOCKS,
}