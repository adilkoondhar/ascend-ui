import React from 'react';
import { Handle, Position } from 'reactflow';

const CustomNode = ({ data, selected, id }) => {
  const handleContextMenu = (event) => {
    event.preventDefault();
    if (data.onComplete) {
      data.onComplete(id);
    }
  };

  return (
    <div 
      style={{
        borderRadius: '12px',
        padding: '2px',
        background: data.nodeColor || 'linear-gradient(90deg, rgba(190,52,180,0.8) 0%, rgba(67,137,224,0.8) 100%)',
        boxShadow: selected 
          ? '0 0 20px rgba(155, 89, 182, 0.8)' 
          : '0 0 15px rgba(155, 89, 182, 0.5)',
        width: '180px',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      className="hover:shadow-lg hover:shadow-purple-500/30 active:scale-95"
      data-testid={`node-${id}`}
      onContextMenu={handleContextMenu}
    >
      <div 
        style={{
          background: '#1a1a1a',
          borderRadius: '10px',
          padding: '16px',
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'all',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ marginRight: '8px', fontSize: '20px' }}>{data.icon}</span>
            <span>{data.label}</span>
          </div>
          <div 
            style={{
              background: '#333',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {data.completed ? (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: '#4ADE80' }}
              >
                <path 
                  d="M20 6L9 17L4 12" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{ color: 'white' }}
              >
                <path 
                  d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>
        
        {data.subLabel && (
          <div style={{ color: '#aaa', fontSize: '14px', marginTop: '4px' }}>
            {data.subLabel}
          </div>
        )}
      </div>
      
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ background: '#4589E0', border: 'none', width: '8px', height: '8px' }} 
      />
      
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: '#4589E0', border: 'none', width: '8px', height: '8px' }} 
      />
    </div>
  );
};

export default CustomNode;