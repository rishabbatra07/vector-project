from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Node(BaseModel):
    id: str
    type: str | None = None
    data: Dict[str, Any] | None = None


class Edge(BaseModel):
    id: str | None = None
    source: str
    target: str


class Pipeline(BaseModel):
    nodes: List[Node] = []
    edges: List[Edge] = []


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}


def is_dag(nodes: List[Node], edges: List[Edge]) -> bool:
    """Returns True if the given graph is a Directed Acyclic Graph."""
    node_ids = {node.id for node in nodes}

    adjacency: Dict[str, List[str]] = {node_id: [] for node_id in node_ids}
    for edge in edges:
        if edge.source in adjacency and edge.target in node_ids:
            adjacency[edge.source].append(edge.target)

    # 0 = unvisited, 1 = visiting, 2 = visited
    state = {node_id: 0 for node_id in node_ids}

    def has_cycle(node_id: str) -> bool:
        state[node_id] = 1
        for neighbor in adjacency.get(node_id, []):
            if state[neighbor] == 1:
                return True
            if state[neighbor] == 0 and has_cycle(neighbor):
                return True
        state[node_id] = 2
        return False

    for node_id in node_ids:
        if state[node_id] == 0:
            if has_cycle(node_id):
                return False

    return True


@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        'num_nodes': num_nodes,
        'num_edges': num_edges,
        'is_dag': dag,
    }
