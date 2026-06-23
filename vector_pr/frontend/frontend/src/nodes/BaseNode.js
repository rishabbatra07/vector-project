// BaseNode.js
// Generic abstraction for pipeline nodes. Handles the common layout
// (title, body, styling) and renders configurable Handles + fields.

import { Handle, Position } from 'reactflow';
import { useStore } from '../store';
import { shallow } from 'zustand/shallow';
import './nodes.css';

const selector = (state) => ({ updateNodeField: state.updateNodeField });

/**
 * @param {string} id - node id
 * @param {string} title - display title
 * @param {Array} inputs - [{ id: 'system', label: 'System', style }]
 * @param {Array} outputs - [{ id: 'response', label: 'Response', style }]
 * @param {Array} fields - [{ name, label, type: 'text'|'select'|'textarea', options, value, onChange }]
 * @param {string} icon - optional emoji/icon
 * @param {object} style - extra style overrides for the container
 * @param {React.ReactNode} children - optional custom body (overrides fields)
 */
export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  fields = [],
  icon,
  style = {},
  children,
}) => {
  const { updateNodeField } = useStore(selector, shallow);

  const handleFieldChange = (name, value) => {
    updateNodeField(id, name, value);
  };

  return (
    <div className="node-container" style={style}>
      {inputs.map((input, idx) => (
        <Handle
          key={`in-${input.id}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          style={{ top: input.top ?? `${((idx + 1) / (inputs.length + 1)) * 100}%`, ...(input.style || {}) }}
          className="node-handle"
        >
          {input.label && (
            <span className="handle-label handle-label-left">{input.label}</span>
          )}
        </Handle>
      ))}

      <div className="node-header">
        {icon && <span className="node-icon">{icon}</span>}
        <span className="node-title">{title}</span>
      </div>

      <div className="node-body">
        {children
          ? children
          : fields.map((field) => (
              <div className="node-field" key={field.name}>
                {field.label && <label className="node-label">{field.label}</label>}
                {field.type === 'select' ? (
                  <select
                    className="node-select"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange ? field.onChange(e) : handleFieldChange(field.name, e.target.value);
                    }}
                  >
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    className="node-textarea"
                    value={field.value}
                    rows={field.rows || 2}
                    onChange={(e) => {
                      field.onChange ? field.onChange(e) : handleFieldChange(field.name, e.target.value);
                    }}
                  />
                ) : (
                  <input
                    className="node-input"
                    type="text"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange ? field.onChange(e) : handleFieldChange(field.name, e.target.value);
                    }}
                  />
                )}
              </div>
            ))}
      </div>

      {outputs.map((output, idx) => (
        <Handle
          key={`out-${output.id}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          style={{ top: output.top ?? `${((idx + 1) / (outputs.length + 1)) * 100}%`, ...(output.style || {}) }}
          className="node-handle"
        >
          {output.label && (
            <span className="handle-label handle-label-right">{output.label}</span>
          )}
        </Handle>
      ))}
    </div>
  );
};
