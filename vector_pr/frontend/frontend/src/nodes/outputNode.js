// outputNode.js

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode
      id={id}
      title="Output"
      icon="📤"
      inputs={[{ id: 'value', label: 'value' }]}
      fields={[
        {
          name: 'outputName',
          label: 'Name',
          value: currName,
          onChange: (e) => setCurrName(e.target.value),
        },
        {
          name: 'outputType',
          label: 'Type',
          type: 'select',
          options: ['Text', 'Image'],
          value: outputType,
          onChange: (e) => setOutputType(e.target.value),
        },
      ]}
    />
  );
};
