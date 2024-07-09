"use client"

import React, { useState } from 'react'
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import EntriesColumn from './EntriesColumn'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const Dashboard = () => {
  const [columns, setColumns] = useState({
    column1: [
      { id: '1', title: "Text 1" },
      { id: '2', title: "Text 2" },
      { id: '3', title: "Text 3" },
    ],
    column2: [
      { id: '4', title: "Text 4" },
      { id: '5', title: "Text 5" },
      { id: '6', title: "Text 6" },
    ],
    column3: [
      { id: '7', title: "Text 7" },
      { id: '8', title: "Text 8" },
      { id: '9', title: "Text 9" },
    ],
    column4: [
      { id: '10', title: "Text 10" },
      { id: '11', title: "Text 11" },
      { id: '12', title: "Text 12" },
    ]
  });

  const [activeId, setActiveId] = useState(null);

  const findActiveTask = (id) => {
    for (const tasks of Object.values(columns)) {
      const task = tasks.find(task => task.id === id);
      if (task) return task;
    }
    return null;
  }

  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const [sourceColumn, sourceIndex] = findTask(active.id);
    const [targetColumn, targetIndex] = findTask(over.id);

    if (!sourceColumn || !targetColumn) return;
    if (sourceColumn === targetColumn && sourceIndex === targetIndex) return;

    setColumns(columns => {
      const sourceTasks = [...columns[sourceColumn]];
      const targetTasks = sourceColumn === targetColumn ? sourceTasks : [...columns[targetColumn]];
      const [movedTask] = sourceTasks.splice(sourceIndex, 1);

      if (sourceColumn === targetColumn) {
        sourceTasks.splice(targetIndex, 0, movedTask);
      } else {
        targetTasks.splice(targetIndex, 0, movedTask);
      }

      return {
        ...columns,
        [sourceColumn]: sourceTasks,
        [targetColumn]: targetTasks
      };
    });
  }

  const findTask = (taskId) => {
    for (const [column, tasks] of Object.entries(columns)) {
      const index = tasks.findIndex(task => task.id === taskId);
      if (index !== -1) {
        return [column, index];
      }
    }
    return [null, null];
  }

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
        <div className='flex gap-x-4'>
          {Object.entries(columns).map(([columnId, tasks]) => (
            <EntriesColumn key={columnId} columnId={columnId} tasks={tasks} />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? <EntriesCard id={activeTask.id} title={activeTask.title} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default Dashboard
