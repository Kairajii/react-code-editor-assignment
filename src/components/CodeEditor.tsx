import React, { useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; // Import PrismJS theme
import 'prismjs/components/prism-javascript'; // Import the JavaScript language definition

const CodeEditor = () => {
  const [code, setCode] = useState('');

  const handleChange = (event:any) => {
    setCode(event.target.value);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto font-mono">
      <div className="relative w-full h-96 p-4 overflow-hidden border border-gray-700 rounded-md bg-gray-900">
        <textarea
          className="absolute top-0 left-0 z-0 w-full h-full p-4 text-transparent bg-transparent border-none caret-black focus:outline-none bg-white"
          value={code}
          onChange={handleChange}
          spellCheck="false"
          style={{
            whiteSpace: 'pre',
            wordWrap: 'break-word',
            overflow: 'hidden',
            resize: 'none',
            zIndex: 1, // Set the z-index to ensure it's behind the highlighted text
          }}
        />
        <pre
          className="absolute top-0 left-0 z-10 w-full h-full p-4 overflow-auto bg-transparent pointer-events-none"
          aria-hidden="true"
        >
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{
              __html: Prism.highlight(code, Prism.languages.javascript, 'javascript'),
            }}
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
