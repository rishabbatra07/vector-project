// conditionalNode.js - routes input down one of two branches based on a condition

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionalNode = ({ id, data }) => {
  const [expression, setExpression] = useState(data?.expression || 'value > 0');

  return (
    <BaseNode
      id={id}
      title="Conditional"
      icon="🔀"
      inputs={[{ id: 'value', label: 'value' }]}
      outputs={[
        { id: 'true', label: 'true' },
        { id: 'false', label: 'false' },
      ]}
      fields={[
        {
          name: 'expression',
          label: 'Condition',
          value: expression,
          onChange: (e) => setExpression(e.target.value),
        },
      ]}
    />
  );
};
