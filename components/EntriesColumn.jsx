import React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const EntriesColumn = ({ tasks, name }) => {
  return (
    <div className='min-w-[225px]'>
      <div className='bg-white/75 rounded-xl p-4'>
        <h5 className='font-bold text-start w-full pb-4'>{name}</h5>
        <SortableContext 
          items={tasks} 
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div className="placeholder p-4 text-gray-500">No tasks</div>
          ) : (
            tasks.map(task => (
              <EntriesCard key={task.id} id={task.id} title={task.title} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}

export default EntriesColumn