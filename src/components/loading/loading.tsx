import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

const Loading:React.FC = () => {
  return (
    <div className='animate-spin'>
      <BiLoaderAlt/>
    </div>
  )
}

export default Loading
