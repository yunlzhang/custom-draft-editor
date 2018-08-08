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
            start: `<figure class="img-figure"><img src="${imgData.src}" alt="${text}" /><figcaption className="md-block-image-caption">`,
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


// export const entityToHTML = (entity, originalText) => {
//   if (entity.type === Entity.LINK) {
//     return (
//       <a
//         className="md-inline-link"
//         href={entity.data.url}
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         {originalText}
//       </a>
//     );
//   }
//   return originalText;
// };

export const options = {
  styleToHTML,
  blockToHTML,
//   entityToHTML,
};

export default (contentState, htmlOptions = options) => convertToHTML(htmlOptions)(contentState);
