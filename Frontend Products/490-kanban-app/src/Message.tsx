import React from 'react';
import kanbanImage from './kanban-template.png'; // Adjust the path if the image is in a subfolder

function KanbanBoard() {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Simple Kanban Board</h1>
      <img
        src={kanbanImage}
        alt="Kanban Board"
        style={{ maxWidth: '100%', height: 'auto', border: '2px solid #ccc' }}
      />
    </div>
  );
}

export default KanbanBoard;
