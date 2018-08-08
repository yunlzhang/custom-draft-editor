import React from 'react';

import { convertToHTML } from 'draft-convert';


export const styleToHTML = (style) => {
  switch (style) {
    case '': return <p/>
    default:
      return null;
  }
};

export const blockToHTML = (block) => {
  const blockType = block.type;
  switch (blockType) {
    case 'atomic:image': {
        const imgData = block.data;
        const text = block.text;
        return {
            start: `<figure ><img src="${imgData.src}" alt="${text}" /><figcaption>`,
            end: '</figcaption></figure>',
        };
    }
    case 'code-block': {
        return {
            start: `<pre><code>`,
            end: '</code></pre>',
        };
    }
    default: return null;
  }
};


export const entityToHTML = (entity, originalText) => {
  if (entity.type === 'LINK') {
    return (
      <a
        href={entity.data.url}
        target="_blank"
      >
        {originalText}
      </a>
    );
  }
  return originalText;
};

export const options = {
  styleToHTML,
  blockToHTML,
  entityToHTML,
};

export default (contentState, htmlOptions = options) => convertToHTML(htmlOptions)(contentState);
