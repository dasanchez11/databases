import React from 'react'

const CustomButton = ({name,onClick,type}) => {
  return (
    <button type={type?type:''} onClick={onClick} className='px-2 py-2 bg-blue-900 hover:bg-blue-700 text-white rounded-lg'>
        {name}
    </button>
  )
}

export default CustomButton