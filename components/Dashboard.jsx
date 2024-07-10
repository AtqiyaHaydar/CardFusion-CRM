"use client"

import React, { useState } from 'react';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import EntriesColumn from './EntriesColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import EntriesCard from './EntriesCard';

const Dashboard = () => {
  const [columns, setColumns] = useState({
    column1: { name: "New Leads", tasks: [{ id: '1', title: "Placeholder" }] },
    column2: { name: "No Interested", tasks: [{ id: '2', title: "Placeholder" }] },
    column3: { name: "Interaction1 OK", tasks: [{ id: '3', title: "Placeholder" }] },
    column4: { name: "Interaction2 OK", tasks: [{ id: '4', title: "Placeholder" }] },
    column5: { name: "Interaction3 OK", tasks: [{ id: '5', title: "Placeholder" }] },
    column6: { name: "Pre-Qualified", tasks: [{ id: '6', title: "Placeholder" }] },
    column7: { name: "Deal Closed", tasks: [{ id: '7', title: "Placeholder" }] },
    column8: { name: "FeedBack", tasks: [{ id: '8', title: "Placeholder" }] },
    column9: { name: "FollowUp", tasks: [{ id: '9', title: "Placeholder" }] },
    column10: { name: "Ended", tasks: [{ id: '10', title: "Placeholder" }] }
  });

  const [activeId, setActiveId] = useState(null);

  const findActiveTask = (id) => {
    for (const column of Object.values(columns)) {
      const task = column.tasks.find(task => task.id === id);
      if (task) return task;
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const [sourceColumnId, sourceIndex] = findTask(active.id);
    const [targetColumnId, targetIndex] = findTask(over.id);

    if (!sourceColumnId || !targetColumnId) return;
    if (sourceColumnId === targetColumnId && sourceIndex === targetIndex) return;

    setColumns(columns => {
      const sourceTasks = [...columns[sourceColumnId].tasks];
      const targetTasks = sourceColumnId === targetColumnId ? sourceTasks : [...columns[targetColumnId].tasks];
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);

      if (sourceColumnId === targetColumnId) {
        sourceTasks.splice(targetIndex, 0, movedTask);
      } else {
        targetTasks.splice(targetIndex, 0, movedTask);
      }

      return {
        ...columns,
        [sourceColumnId]: { ...columns[sourceColumnId], tasks: sourceTasks },
        [targetColumnId]: { ...columns[targetColumnId], tasks: targetTasks }
      };
    });
  };

  const findTask = (taskId) => {
    for (const [columnId, column] of Object.entries(columns)) {
      const index = column.tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        return [columnId, index];
      }
    }
    return [null, null];
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeTask = activeId ? findActiveTask(activeId) : null;

  return (
    <div>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className='flex gap-x-4 overflow-x-scroll min-h-[550px] scroll-container'>
          {Object.entries(columns).map(([columnId, { name, tasks }]) => (
            <EntriesColumn key={columnId} columnId={columnId} name={name} tasks={tasks} />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <EntriesCard id={activeTask.id} title={activeTask.title} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
