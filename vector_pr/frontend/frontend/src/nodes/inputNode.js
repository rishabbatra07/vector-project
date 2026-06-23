// inputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="📥"
      outputs={[{ id: 'value', label: 'value' }]}
      fields={[
        {
          name: 'inputName',
          label: 'Name',
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: 'inputType',
          label: 'Type',
          type: 'select',
          options: ['Text', 'File'],
          value: inputType,
          onChange: (e) => setInputType(e.target.value),
        },
      ]}
    />
  );
};
