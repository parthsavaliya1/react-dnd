import React, { useState } from 'react';
import { useDrop,useDrag } from 'react-dnd';

const LeftColumn = ({ id, name, onDrag }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { id, type: 'COLUMN' },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}
      onClick={() => onDrag(id)}
    >
      {name}
    </div>
  );
};

const RightColumn = ({ name }) => {
  return <div>{name}</div>;
};

const RightSide = ({ droppedColumns }) => {
  return (
    <div>
      {droppedColumns.map((column, index) => (
        <RightColumn key={index} name={column.name} />
      ))}
    </div>
  );
};

const App = () => {
  const [droppedColumns, setDroppedColumns] = useState([]);

  const onDrag = (id) => {
    // Find the column from the left side
    const column = columns.find(col => col.id === id);
    // Add the column to the droppedColumns state
    setDroppedColumns([...droppedColumns, column]);
  };

  const [, drop] = useDrop({
    accept: 'COLUMN',
    drop: () => {},
  });

  const columns = [
    { id: 1, name: 'Column 1' },
    { id: 2, name: 'Column 2' },
    { id: 3, name: 'Column 3' },
    { id: 4, name: 'Column 4' },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ marginRight: '20px' }}>
        {columns.map((column) => (
          <LeftColumn key={column.id} id={column.id} name={column.name} onDrag={onDrag} />
        ))}
      </div>
      <div ref={drop}>
        <RightSide droppedColumns={droppedColumns} />
      </div>
    </div>
  );
};

export default App;
