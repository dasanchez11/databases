import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'

const UserRow = ({item,setUsers ,setEditModalOpen,setEditUser}) => {
    const handleEdit = () =>{
        setEditModalOpen(true)
        setEditUser(item)
    }

    return (
        <tr>
            <td className='text-base border text-center border-blue-900 '>{item._id}</td>
            <td className='text-base border text-center border-blue-900 '>{item.clientEmail}</td>
            <td className='text-base border text-center border-blue-900 '> {item.clientName}</td>
            <td className='text-base border text-center border-blue-900 '>{item.clientNit}</td>
            <td className='text-base border text-center border-blue-900 '>{item.clientOrders}</td>
            <td className='text-base border text-center border-blue-900 '>{item.clientRole}</td>
            <td className='text-base  text-center text-white '>
                <div className='flex flex-row items-center gap-2 h-full pl-2'>
                    <div onClick={handleEdit} className='bg-blue-900 rounded-sm p-3 hover:cursor-pointer'>
                        <AiOutlineEdit />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default UserRow