// apiRequestNode.js - performs an HTTP request

import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APIRequestNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');
  const [url, setUrl] = useState(data?.url || '');

  return (
    <BaseNode
      id={id}
      title="API Request"
      icon="🌐"
      inputs={[{ id: 'body', label: 'body' }]}
      outputs={[{ id: 'response', label: 'response' }]}
      fields={[
        {
          name: 'method',
          label: 'Method',
          type: 'select',
          options: ['GET', 'POST', 'PUT', 'DELETE'],
          value: method,
          onChange: (e) => setMethod(e.target.value),
        },
        {
          name: 'url',
          label: 'URL',
          value: url,
          onChange: (e) => setUrl(e.target.value),
        },
      ]}
    />
  );
};
