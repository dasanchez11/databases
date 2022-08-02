import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { deleteTruck } from '../../util/truck.utils'

const TrucksRow = ({item,setTrucks ,setEditModalOpen,setEditTruck}) => {
    // const authContext = useContext(AuthContext)

    const handleDelete = async () => {
        try {
            deleteTruck(item._id,setTrucks)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleEdit = () => {
        setEditModalOpen(true)
        setEditTruck(item)
    }

    return (
        <tr>
            <td className='text-base border text-center border-blue-900 '>{item._id}</td>
            <td className='text-base border text-center border-blue-900 '>{item.status}</td>
            <td className='text-base border text-center border-blue-900 '> {item.capacity}</td>
            <td className='text-base border text-center border-blue-900 '>{item.model}</td>
            <td className='text-base border text-center border-blue-900 '>{item.brand}</td>
            <td className='text-base border text-center border-blue-900 '>{item.year}</td>
            <td className='text-base  text-center text-white '>
                <div className='flex flex-row items-center gap-2 h-full pl-2'>
                    <div onClick={handleEdit} className='bg-blue-900 rounded-sm p-3 hover:cursor-pointer'>
                        <AiOutlineEdit />
                    </div>
                    <div onClick={handleDelete} className='bg-red-500 rounded-sm p-3 hover:cursor-pointer'>
                        <HiOutlineTrash />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TrucksRow