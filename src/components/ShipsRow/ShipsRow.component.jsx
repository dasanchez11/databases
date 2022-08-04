import React from 'react'
import { useContext } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { deleteShip } from '../../util/ships.utils'
import {AuthContext} from '../../context/AuthContext'
import {FetchContext} from '../../context/FetchContext'


const ShipsRow = ({item,setShips ,setEditModalOpen,setShipToEdit}) => {
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const {setLoading} = authContext

    const handleDelete = async () => {
        try {
            deleteShip(item._id,setShips,fetchContext.authAxios,setLoading)
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleEdit = () => {
        setEditModalOpen(true)
        setShipToEdit(item)
    }

    return (
        <tr>
            <td className='text-base border text-center border-blue-900 '>{item.shipId}</td>
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

export default ShipsRow
