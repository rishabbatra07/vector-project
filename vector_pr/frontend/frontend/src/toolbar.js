// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="toolbar">
            <div className="toolbar-brand">
                <span className="toolbar-brand-icon">⚡</span>
                <span className="toolbar-brand-text">Pipeline Builder</span>
            </div>
            <div className="toolbar-nodes">
                <DraggableNode type='customInput' label='Input' icon='📥' />
                <DraggableNode type='llm' label='LLM' icon='🤖' />
                <DraggableNode type='customOutput' label='Output' icon='📤' />
                <DraggableNode type='text' label='Text' icon='📝' />
                <DraggableNode type='math' label='Math' icon='➕' />
                <DraggableNode type='filter' label='Filter' icon='🔍' />
                <DraggableNode type='delay' label='Delay' icon='⏱️' />
                <DraggableNode type='apiRequest' label='API Request' icon='🌐' />
                <DraggableNode type='conditional' label='Conditional' icon='🔀' />
            </div>
        </div>
    );
};
