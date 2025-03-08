'use client';

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap,
  addEdge, 
  useNodesState, 
  useEdgesState 
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from '@/components/CustomNode';
import NodePanel from '@/components/NodePanel';

// Register custom node types
const nodeTypes = {
  customNode: CustomNode,
};

// Initial nodes setup - added completed: false to each node
const initialNodes = [
  {
    id: 'readFileApi',
    type: 'customNode',
    position: { x: 100, y: 100 },
    data: { 
      label: 'readFile',
      subLabel: 'api.ts',
      icon: '📄',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Reads the API TypeScript file from the filesystem',
      inputs: [],
      outputs: ['File contents as string'],
      dependencies: ['fs/promises'],
      completed: false,
    }
  },
  {
    id: 'bundleApi',
    type: 'customNode',
    position: { x: 400, y: 100 },
    data: { 
      label: 'bundle',
      subLabel: 'apiContents',
      icon: '📦',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Bundles the API code into a single package',
      inputs: ['API file contents'],
      outputs: ['Bundled API code'],
      dependencies: ['esbuild', 'typescript'],
      completed: false,
    }
  },
  {
    id: 'readFileSdk',
    type: 'customNode',
    position: { x: 100, y: 300 },
    data: { 
      label: 'readFile',
      subLabel: 'sdk.ts', 
      icon: '📄',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Reads the SDK TypeScript file from the filesystem',
      inputs: [],
      outputs: ['File contents as string'],
      dependencies: ['fs/promises'],
      completed: false,
    }
  },
  {
    id: 'bundleSdk',
    type: 'customNode',
    position: { x: 400, y: 300 },
    data: { 
      label: 'bundle',
      subLabel: 'sdkContents',
      icon: '📦',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Bundles the SDK code into a single package',
      inputs: ['SDK file contents'],
      outputs: ['Bundled SDK code'],
      dependencies: ['esbuild', 'typescript'],
      completed: false,
    }
  },
  {
    id: 'concat',
    type: 'customNode',
    position: { x: 700, y: 200 },
    data: { 
      label: 'concat',
      subLabel: 'api, sdk',
      icon: '🔗',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Concatenates API and SDK bundles together',
      inputs: ['Bundled API code', 'Bundled SDK code'],
      outputs: ['Combined code bundle'],
      dependencies: [],
      completed: false,
    }
  },
  {
    id: 'fullBundle',
    type: 'customNode',
    position: { x: 1000, y: 200 },
    data: { 
      label: 'fullBundle',
      icon: '📑',
      nodeColor: 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
      description: 'Final bundled output with all components',
      inputs: ['Combined code bundle'],
      outputs: ['Production-ready bundle'],
      dependencies: ['webpack', 'terser'],
      completed: false,
    }
  }
];

// Initial edges setup
const initialEdges = [
  { id: 'e1-2', source: 'readFileApi', target: 'bundleApi', animated: true },
  { id: 'e3-4', source: 'readFileSdk', target: 'bundleSdk', animated: true },
  { id: 'e2-5', source: 'bundleApi', target: 'concat', animated: true, type: 'smoothstep' },
  { id: 'e4-5', source: 'bundleSdk', target: 'concat', animated: true, type: 'smoothstep' },
  { id: 'e5-6', source: 'concat', target: 'fullBundle', animated: true }
];

export default function RoadmapGraph({ onNodeCompletionChange, initialCompleted = [] }) {
  // Initialize nodes with completed state from props
  const [nodes, setNodes, onNodesChange] = useNodesState(
    initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        completed: initialCompleted.includes(node.id)
      }
    }))
  );
  
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // Track and report completion status
  useEffect(() => {
    const completedNodes = nodes.filter(node => node.data.completed);
    const completedCount = completedNodes.length;
    const completedNodeIds = completedNodes.map(node => node.id);
    
    if (onNodeCompletionChange) {
      onNodeCompletionChange(completedCount, nodes.length, completedNodeIds);
    }
  }, [nodes, onNodeCompletionChange]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event, node) => {
    setSelectedNode(node);
    setIsPanelOpen(true);
  }, []);

  const closePanel = useCallback(() => {
    setIsPanelOpen(false);
  }, []);
  
  // Function to toggle node completion - memoized with useCallback
  const toggleNodeComplete = useCallback((nodeId) => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              completed: !node.data.completed,
            },
          };
        }
        return node;
      })
    );
  }, [setNodes]);

  // Use useMemo to prevent unnecessary recreations of the nodes array
  const nodesWithCallbacks = useMemo(() => {
    return nodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onComplete: () => toggleNodeComplete(node.id)
      }
    }));
  }, [nodes, toggleNodeComplete]);

  return (
    <div className="w-full h-96 bg-[#0e0e0e] relative overflow-hidden rounded-2xl">
      <ReactFlow
        nodes={nodesWithCallbacks}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        defaultViewport={{ x: 0, y: 0, zoom: 1.5 }}
        minZoom={0.5}
        maxZoom={2}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#333" gap={16} size={1} />
        <Controls style={{ bottom: 10, right: 10, top: 'auto' }} className='w-fit' />
        {/* <MiniMap
          nodeStrokeColor={(n) => {
            return '#fff';
          }}
          nodeColor={(n) => {
            return '#444';
          }}
          nodeBorderRadius={8}
          style={{ background: '#222', border: '1px solid #444' }}
        /> */}
      </ReactFlow>

      <NodePanel 
        node={selectedNode} 
        isOpen={isPanelOpen} 
        onClose={closePanel}
        onToggleComplete={toggleNodeComplete}
      />
    </div>
  );
}