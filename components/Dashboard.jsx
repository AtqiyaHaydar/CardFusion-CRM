"use client"

import React, { useState } from 'react'
import { closestCorners, DndContext, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import EntriesColumn from './EntriesColumn'
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable'

const Dashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Text 1" },
    { id: 2, title: "Text 2" },
    { id: 3, title: "Text 3" },
  ])

  const getTaskPos = id => tasks.findIndex(task => task.id === id)

  const handleDragEnd = (event) => {
    const {active, over} = event
    
    if (active.id === over.id) return;

    setTasks(tasks => {
      const originalPos = getTaskPos(active.id)
      const newPos = getTaskPos(over.id)

      return arrayMove(tasks, originalPos, newPos)
    })
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <EntriesColumn 
          tasks={tasks}
        />
      </DndContext>
    </div>
  )
}

export default Dashboard