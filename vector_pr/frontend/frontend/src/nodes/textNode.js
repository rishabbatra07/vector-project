// textNode.js
// Text node with auto-resizing textarea and dynamic Handles generated
// from {{ variable }} placeholders in the text.

import { useState, useEffect, useRef, useMemo } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import './nodes.css';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

// Matches {{ variableName }} where variableName is a valid JS identifier
const VARIABLE_REGEX = /\{\{\s*([A-Za-z_$][A-Za-z0-9_$]*)\s*\}\}/g;

const extractVariables = (text) => {
  const matches = new Set();
  let match;
  const regex = new RegExp(VARIABLE_REGEX);
  while ((match = regex.exec(text)) !== null) {
    matches.add(match[1]);
  }
  return Array.from(matches);
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const { updateNodeField } = useStore(selector, shallow);
  const textareaRef = useRef(null);
  const [size, setSize] = useState({ width: 240, height: 80 });

  const variables = useMemo(() => extractVariables(currText), [currText]);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setCurrText(value);
    updateNodeField(id, 'text', value);
  };

  // Auto-resize the textarea (and the node) based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    // Reset height to measure scrollHeight accurately
    el.style.height = 'auto';
    const newHeight = Math.max(40, el.scrollHeight);

    // Roughly size width based on the longest line, capped between bounds
    const lines = currText.split('\n');
    const longestLine = lines.reduce((a, b) => (b.length > a.length ? b : a), '');
    const estimatedWidth = Math.min(420, Math.max(240, longestLine.length * 7.5 + 60));

    el.style.height = `${newHeight}px`;
    setSize({
      width: estimatedWidth,
      height: newHeight + 90 + variables.length * 4,
    });
  }, [currText, variables.length]);

  return (
    <div
      className="node-container"
      style={{ width: size.width, minHeight: size.height, position: 'relative' }}
    >
      {variables.map((varName, idx) => (
        <Handle
          key={varName}
          type="target"
          position={Position.Left}
          id={`${id}-${varName}`}
          className="node-handle"
          style={{ top: `${((idx + 1) / (variables.length + 1)) * 100}%` }}
        >
          <span className="handle-label handle-label-left">{varName}</span>
        </Handle>
      ))}

      <div className="node-header">
        <span className="node-icon">📝</span>
        <span className="node-title">Text</span>
      </div>

      <div className="node-body">
        <div className="node-field">
          <label className="node-label">Text</label>
          <textarea
            ref={textareaRef}
            className="node-textarea"
            value={currText}
            onChange={handleTextChange}
            rows={1}
            style={{ width: '100%', overflow: 'hidden' }}
          />
        </div>
        {variables.length > 0 && (
          <div className="node-static-text">
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="node-handle"
      />
    </div>
  );
};
