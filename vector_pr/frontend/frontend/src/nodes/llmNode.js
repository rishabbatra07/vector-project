// llmNode.js

import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="LLM"
      icon="🤖"
      inputs={[
        { id: 'system', label: 'system' },
        { id: 'prompt', label: 'prompt' },
      ]}
      outputs={[{ id: 'response', label: 'response' }]}
      style={{ minWidth: 220 }}
    >
      <div className="node-static-text">
        Runs the connected prompt through a large language model and returns
        its response.
      </div>
    </BaseNode>
  );
};
