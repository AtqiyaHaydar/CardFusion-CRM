import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const EntriesCard = ({ id, title }) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  
  return (
    <div 
      className='p-2 mb-2 bg-white/100 rounded-md shadow-sm w-full' 
      ref={setNodeRef} 
      {...attributes} 
      {...listeners}
      style={style}
    >
      {title}
    </div>
  )
}

export default EntriesCard