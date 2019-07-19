import React from 'react';
import RehypeReact from 'rehype-react';

export const createRenderAst = ({ components }) =>
    new RehypeReact({
        createElement: React.createElement,
        components
    }).Compiler;
