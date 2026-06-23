// filterNode.js - filters an incoming list/array by a condition

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const FilterNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'contains');
  const [value, setValue] = useState(data?.value || '');

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔍"
      inputs={[{ id: 'items', label: 'items' }]}
      outputs={[{ id: 'filtered', label: 'filtered' }]}
      fields={[
        {
          name: 'condition',
          label: 'Condition',
          type: 'select',
          options: ['contains', 'equals', 'startsWith', 'endsWith'],
          value: condition,
          onChange: (e) => setCondition(e.target.value),
        },
        {
          name: 'value',
          label: 'Value',
          value: value,
          onChange: (e) => setValue(e.target.value),
        },
      ]}
    />
  );
};
