import React, { useState, useRef, useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css'; 
import 'prismjs/components/prism-javascript';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection?.rangeCount) return { start: 0, end: 0 };

    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editorRef.current as Node);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return {
      start,
      end: start + range.toString().length
    };
  };

  const restoreCursorPosition = (savedPosition: { start: number; end: number }) => {
    const { start, end } = savedPosition;
    const charIndex = { current: 0 };
    const range = document.createRange();
    range.setStart(editorRef.current as Node, 0);
    range.collapse(true);

    const setRange = (node: Node) => {
      if (charIndex.current >= end) return;

      if (node.nodeType === Node.TEXT_NODE) {
        const textNodeLength = (node.textContent || '').length;
        if (charIndex.current + textNodeLength >= start) {
          range.setStart(node, start - charIndex.current);
        }
        if (charIndex.current + textNodeLength >= end) {
          range.setEnd(node, end - charIndex.current);
        }
        charIndex.current += textNodeLength;
      } else {
        Array.from(node.childNodes).forEach(setRange);
      }
    };

    setRange(editorRef.current as Node);

    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  useEffect(() => {
    if (editorRef.current) {
      const cursorPosition = saveCursorPosition();
      editorRef.current.innerHTML = Prism.highlight(code, Prism.languages.javascript, 'javascript');  
      restoreCursorPosition(cursorPosition);
    }
  }, [code]);

  const handleInput = () => {
    if (editorRef.current) {
      setCode(editorRef.current.innerText || '');
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto font-mono">
      <div
        ref={editorRef}
        contentEditable={true}
        className="w-full h-96 p-4 overflow-auto bg-transparent border border-gray-700 rounded-md resize-none focus:outline-none text-black caret-black"
        onInput={handleInput}
        spellCheck="false"
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          outline: 'none',
        }}
      />
    </div>
  );
};

export default CodeEditor;
