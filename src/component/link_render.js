import React from 'react';
const Link = (props) => {
    const { contentState, entityKey } = props;
    const { url } = contentState.getEntity(entityKey).getData();
    return (
      <a href={url}
        target="_blank"
      >{props.children}</a>
    );
};

export default Link;