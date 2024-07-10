import React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const EntriesColumn = ({ tasks, name }) => {
  return (
    <div className='bg-white border rounded-lg p-4 shadow-sm relative h-[500px] min-w-[250px] overflow-y-auto'>
      <h5 className='font-medium text-start w-full pb-4'>{name}</h5>
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
  )
}

export default EntriesColumn