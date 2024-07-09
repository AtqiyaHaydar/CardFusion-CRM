import React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const EntriesColumn = ({ tasks }) => {
  return (
    <div className='bg-white/25 min-h-[350px] rounded-lg p-4 w-[250px]'>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.map((task) => {
          return (
            <EntriesCard 
              id={task.id}
              title={task.title}
              key={task.id}
            />
          )
        })}
      </SortableContext>
    </div>
  )
}

export default EntriesColumn