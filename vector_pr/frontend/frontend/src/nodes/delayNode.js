// delayNode.js - delays the pipeline execution by N seconds

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [seconds, setSeconds] = useState(data?.seconds || '1');

  return (
    <BaseNode
      id={id}
      title="Delay"
      icon="⏱️"
      inputs={[{ id: 'input', label: 'in' }]}
      outputs={[{ id: 'output', label: 'out' }]}
      fields={[
        {
          name: 'seconds',
          label: 'Seconds',
          value: seconds,
          onChange: (e) => setSeconds(e.target.value),
        },
      ]}
    />
  );
};
