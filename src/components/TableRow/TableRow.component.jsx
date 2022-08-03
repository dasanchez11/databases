import React from 'react'
import { useContext } from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import { AuthContext } from '../../context/AuthContext'
import { FetchContext } from '../../context/FetchContext'
import { deleteOrder } from '../../util/orders.utils'

const TableRow = ({ item,setOrders ,setEditModalOpen,setEditOrder}) => {
    const fetchContext = useContext(FetchContext)
    const authContext = useContext(AuthContext)
    const transport = {
        'sea': { 'vehicle': item.fleetNumber, 'place': item.portDelivery },
        'land': { 'vehicle': item.deliveryVehicle, 'place': item.wareHouseDelivery }
    }

    const handleDelete = async() =>{
        try {
            deleteOrder(authContext,setOrders,item._id,fetchContext.authAxios)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = () =>{
        setEditModalOpen(true)
        setEditOrder(item)
    }

    return (
        <tr>
            <td className='text-base border text-center border-blue-900 '>{item.clientId}</td>
            <td className='text-base border text-center border-blue-900 '>{item.orderStatus}</td>
            <td className='text-base border text-center border-blue-900 '> {item.transportType}</td>
            <td className='text-base border text-center border-blue-900 '>{item.productType}</td>
            <td className='text-base border text-center border-blue-900 '>{item.productQuantity}</td>
            <td className='text-base border text-center border-blue-900 '>{item.registerDate}</td>
            <td className='text-base border text-center border-blue-900 '>{item.deliveryDate}</td>
            <td className='text-base border text-center border-blue-900 '>$ {item.deliveryPrice}</td>
            <td className='text-base border text-center border-blue-900 '>$ {item.deliveryDiscount?item.deliveryDiscount:0}</td>
            <td className='text-base border text-center border-blue-900 '>{item.guideNumber}</td>
            <td className='text-base border text-center border-blue-900 '>{transport[item.transportType].place}</td>
            <td className='text-base border text-center border-blue-900 '>{transport[item.transportType].vehicle}</td>
            <td className='text-base  text-center text-white '>
                <div className='flex flex-row items-center gap-2 h-full pl-2'>
                    <div onClick={handleEdit} className='bg-blue-900 rounded-sm p-3 hover:cursor-pointer h-full w-full'>
                        <AiOutlineEdit />
                    </div>
                    <div onClick={handleDelete} className='bg-red-500 rounded-sm p-3 hover:cursor-pointer h-full w-full'>
                        <HiOutlineTrash />
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableRow