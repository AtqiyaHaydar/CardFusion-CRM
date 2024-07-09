import React from 'react'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import EntriesCard from './EntriesCard'

const EntriesColumn = ({ tasks, name }) => {
  return (
    <div className='min-w-[250px]'>
      <div className='bg-white/75 rounded-xl p-4'>
      <h5 className='font-bold text-start w-full pb-4'>{name}</h5>
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
    </div>
  )
}

export default EntriesColumn