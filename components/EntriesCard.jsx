import React from 'react'

import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const EntriesCard = ({ id, title, userName, contactInfo, interactionHistory, status, notes }) => {
  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id})

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  }
  
  return (
    <div 
      className='p-2 mb-2 text-sm bg-white/100 rounded-md shadow-sm w-full' 
      ref={setNodeRef} 
      {...attributes} 
      {...listeners}
      style={style}
    >
      <p className='font-semibold'>{userName}</p>
      <p className='text-[13px]'>{contactInfo?.email} <br></br> {contactInfo?.phone}</p>
      <div className='w-full bg-black/10 h-[1px] my-2' />
      <p className='font-medium'>Interaction History: </p>
      <p className='text-[13px]'>{interactionHistory.join(', ')}</p>
      <div className='w-full bg-black/10 h-[1px] my-2' />
      <p className='text-[13px]'>Status: {status}</p>
      <p className='text-[13px]'>Notes: {notes}</p>
    </div>
  )
}

export default EntriesCard