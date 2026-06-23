# VectorShift Pipeline Builder - Frontend Technical Assessment

## Project structure
- `frontend/` - React app (Create React App + ReactFlow + Zustand)
- `backend/` - FastAPI app

## Running the frontend
```
cd frontend
npm install
npm start
```
App runs at http://localhost:3000

## Running the backend
```
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
API runs at http://localhost:8000

## What was implemented
1. **Node abstraction** (`frontend/src/nodes/BaseNode.js`) - a reusable component that
   renders the node header, input/output handles, and configurable fields
   (text, select, textarea). All existing nodes (Input, Output, LLM, Text)
   and 5 new nodes (Math, Filter, Delay, API Request, Conditional) are built
   on top of it.
2. **Styling** - `index.css` and `nodes/nodes.css` provide a unified modern
   theme (gradient headers, consistent spacing/typography, styled toolbar
   and submit button).
3. **Text node logic** - the Text node textarea auto-resizes (width & height)
   as you type, and any `{{ variableName }}` in the text automatically
   creates a corresponding target Handle on the left side of the node.
4. **Backend integration** - `submit.js` POSTs `{ nodes, edges }` to
   `POST /pipelines/parse`. The backend computes `num_nodes`, `num_edges`,
   and whether the graph is a DAG, returning
   `{ num_nodes, num_edges, is_dag }`. The frontend shows this in an alert.
