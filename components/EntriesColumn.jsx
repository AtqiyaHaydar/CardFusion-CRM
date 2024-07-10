import React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const EntriesColumn = ({ tasks, name }) => {
  return (
    <div className='bg-white/75 backdrop-blur-sm rounded-xl p-4 shadow-sm relative h-[525px] min-w-[250px] overflow-hidden'>
      <h5 className='font-medium text-start w-full pb-4'>{name}</h5>
      <div className='overflow-y-auto flex items-center justify-start flex-col h-full no-scrollbar'>
        <SortableContext 
          items={tasks} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="placeholder p-4 text-gray-500">No tasks</div>
          ) : (
            tasks.map(task => (
              <EntriesCard
                key={task.id}
                id={task.id}
                title={task.title}
                userName={task?.userName}
                contactInfo={task?.contactInfo}
                interactionHistory={task?.interactionHistory}
                status={task?.status}
                notes={task?.notes}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default EntriesColumn