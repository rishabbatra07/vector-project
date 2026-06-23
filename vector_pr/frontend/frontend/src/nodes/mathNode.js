// mathNode.js - performs a basic arithmetic operation on two inputs

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const MathNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'Add');

  return (
    <BaseNode
      id={id}
      title="Math"
      icon="➕"
      inputs={[
        { id: 'a', label: 'a' },
        { id: 'b', label: 'b' },
      ]}
      outputs={[{ id: 'result', label: 'result' }]}
      fields={[
        {
          name: 'operation',
          label: 'Operation',
          type: 'select',
          options: ['Add', 'Subtract', 'Multiply', 'Divide'],
          value: operation,
          onChange: (e) => setOperation(e.target.value),
        },
      ]}
    />
  );
};
