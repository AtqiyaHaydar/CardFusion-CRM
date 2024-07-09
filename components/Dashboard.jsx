"use client"

import React, { useState } from 'react';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import EntriesColumn from './EntriesColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import EntriesCard from './EntriesCard';

const Dashboard = () => {
  const [columns, setColumns] = useState({
    column1: { name: "New Leads", tasks: [
      { id: '1', title: "Text 1" },
      { id: '2', title: "Text 2" },
      { id: '3', title: "Text 3" }
    ]},
    column2: { name: "No Interested", tasks: [
      { id: '4', title: "Text 4" },
      { id: '5', title: "Text 5" },
      { id: '6', title: "Text 6" }
    ]},
    column3: { name: "Interaction1 OK", tasks: [
      { id: '7', title: "Text 7" },
      { id: '8', title: "Text 8" },
      { id: '9', title: "Text 9" }
    ]},
    column4: { name: "Interaction2 OK", tasks: [
      { id: '10', title: "Text 10" },
      { id: '11', title: "Text 11" },
      { id: '12', title: "Text 12" }
    ]},
    column5: { name: "Interaction3 OK", tasks: [
      { id: '13', title: "Text 13" },
      { id: '14', title: "Text 14" },
      { id: '15', title: "Text 15" }
    ]},
    column6: { name: "Pre-Qualified", tasks: [
      { id: '16', title: "Text 16" },
      { id: '17', title: "Text 17" },
      { id: '18', title: "Text 18" }
    ]},
    column7: { name: "Deal Closed", tasks: [
      { id: '19', title: "Text 19" },
      { id: '20', title: "Text 20" },
      { id: '21', title: "Text 21" }
    ]},
    column8: { name: "FeedBack", tasks: [
      { id: '22', title: "Text 22" },
      { id: '23', title: "Text 23" },
      { id: '24', title: "Text 24" }
    ]},
    column9: { name: "FollowUp", tasks: [
      { id: '25', title: "Text 25" },
      { id: '26', title: "Text 26" },
      { id: '27', title: "Text 27" }
    ]},
    column10: { name: "Ended", tasks: [
      { id: '28', title: "Text 28" },
      { id: '29', title: "Text 29" },
      { id: '30', title: "Text 30" }
    ]}
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
