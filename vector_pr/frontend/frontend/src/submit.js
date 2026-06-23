// submit.js

import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
    nodes: state.nodes,
    edges: state.edges,
});

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

export const SubmitButton = () => {
    const { nodes, edges } = useStore(selector, shallow);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${BACKEND_URL}/pipelines/parse`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            const { num_nodes, num_edges, is_dag } = data;

            alert(
                `Pipeline Analysis\n\n` +
                `Number of nodes: ${num_nodes}\n` +
                `Number of edges: ${num_edges}\n` +
                `Is DAG: ${is_dag ? 'Yes ✅' : 'No ❌'}`
            );
        } catch (error) {
            alert(`Failed to analyze pipeline: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="submit-bar">
            <button className="submit-button" type="button" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>
    );
}
