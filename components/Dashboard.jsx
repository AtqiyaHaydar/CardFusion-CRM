"use client"

import React, { useState } from 'react';
import { closestCorners, DndContext, DragOverlay, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import EntriesColumn from './EntriesColumn';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import EntriesCard from './EntriesCard';

const Dashboard = () => {
  const [columns, setColumns] = useState({
    column1: {
      name: "New Leads",
      tasks: [{
        id: '1',
        title: "Lead 1",
        userName: "John Doe",
        contactInfo: { email: "john.doe@example.com", phone: "123-456-7890" },
        interactionHistory: ["Initial contact", "Follow-up call"],
        status: "Pending",
        notes: "Interested in product X"
      }]
    },
    column2: {
      name: "No Interested",
      tasks: [{
        id: '2',
        title: "Not Interested",
        userName: "Jane Smith",
        contactInfo: { email: "jane.smith@example.com", phone: "987-654-3210" },
        interactionHistory: ["Exploratory meeting"],
        status: "Closed",
        notes: "Prefers competitor's product"
      }]
    },
    column3: {
      name: "Interaction1 OK",
      tasks: [{
        id: '3',
        title: "Interaction 1 Success",
        userName: "Michael Johnson",
        contactInfo: { email: "michael.johnson@example.com", phone: "555-123-4567" },
        interactionHistory: ["Demo session", "Positive feedback"],
        status: "Active",
        notes: "Scheduled follow-up"
      }]
    },
    column4: {
      name: "Interaction2 OK",
      tasks: [{
        id: '4',
        title: "Interaction 2 Success",
        userName: "Sarah Brown",
        contactInfo: { email: "sarah.brown@example.com", phone: "777-987-6543" },
        interactionHistory: ["Product trial", "Decision maker meeting"],
        status: "Active",
        notes: "Needs pricing information"
      }]
    },
    column5: {
      name: "Interaction3 OK",
      tasks: [{
        id: '5',
        title: "Interaction 3 Success",
        userName: "Robert Lee",
        contactInfo: { email: "robert.lee@example.com", phone: "111-222-3333" },
        interactionHistory: ["Contract negotiation"],
        status: "Active",
        notes: "Finalizing terms"
      }]
    },
    column6: {
      name: "Pre-Qualified",
      tasks: [{
        id: '6',
        title: "Pre-Qualified Lead",
        userName: "Emily Davis",
        contactInfo: { email: "emily.davis@example.com", phone: "444-555-6666" },
        interactionHistory: ["Qualification call"],
        status: "Qualified",
        notes: "Needs demo of advanced features"
      }]
    },
    column7: {
      name: "Deal Closed",
      tasks: [{
        id: '7',
        title: "Closed Deal",
        userName: "David Wilson",
        contactInfo: { email: "david.wilson@example.com", phone: "999-888-7777" },
        interactionHistory: ["Signed contract"],
        status: "Closed",
        notes: "Upsell opportunity for future"
      }]
    },
    column8: {
      name: "FeedBack",
      tasks: [{
        id: '8',
        title: "Feedback Received",
        userName: "Olivia Martinez",
        contactInfo: { email: "olivia.martinez@example.com", phone: "333-777-9999" },
        interactionHistory: ["User feedback session"],
        status: "Pending",
        notes: "Issues with current setup"
      }]
    },
    column9: {
      name: "FollowUp",
      tasks: [{
        id: '9',
        title: "Follow-up Needed",
        userName: "Daniel White",
        contactInfo: { email: "daniel.white@example.com", phone: "666-444-2222" },
        interactionHistory: ["Follow-up email sent"],
        status: "Active",
        notes: "Awaiting response"
      }]
    },
    column10: {
      name: "Ended",
      tasks: [{
        id: '10',
        title: "End of Cycle",
        userName: "Sophia Brown",
        contactInfo: { email: "sophia.brown@example.com", phone: "222-999-8888" },
        interactionHistory: ["Final review"],
        status: "Closed",
        notes: "Client opted out"
      }]
    }
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
          {activeTask ? (
            <EntriesCard 
              id={activeTask.id}
              title={activeTask.title}
              userName={activeTask.userName}
              contactInfo={activeTask.contactInfo}
              interactionHistory={activeTask.interactionHistory}
              status={activeTask.status}
              notes={activeTask.notes}
            />
          ) : 
            null
          }
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default Dashboard;
