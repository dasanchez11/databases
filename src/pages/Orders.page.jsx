import React,{useState} from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import EditOrder from '../components/EditOrder/EditOrder.component'
import Modal from '../components/Modal/Modal.component'
import Pagination from '../components/Pagination/Pagination.component'
import TableRow from '../components/TableRow/TableRow.component'
import { AuthContext } from '../context/AuthContext'
import { getAllOrdersFirebase } from '../Firebase/firebase.orders'




const Orders = () => {
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [count,setCount] = useState()
    const [itemsPerPage,setItemsPerPage]= useState()
    const [orders,setOrders] = useState([])
    const [editModalOpen,setEditModalOpen] = useState(false)
    const [editOrder,setEditOrder] = useState('')
    const authContext = useContext(AuthContext)
    const {setLoading,isAdmin} = authContext
    const {_id} = authContext.authState.clientInfo

    useEffect(()=>{
        const getData = async() =>{
            try {
                setLoading(true)     
                const result = await getAllOrdersFirebase(isAdmin,_id)
                setLoading(false)
                setPageCount(1)
                setItemsPerPage(10)
                setOrders(result)
                setCount(12)
                
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        getData()
    },[page,isAdmin,_id,setLoading])


    const handleNewOrderClick = () =>{
        setEditModalOpen(true)
        setEditOrder('')
    }
 
    return (
        <div className='h-[87vh] w-[80vw] overflow-x-scroll max-h-[87vh]'>
            <div onClick={handleNewOrderClick} className='text-xl text-blue-900 text-center flex flex-row items-center gap-2 cursor-pointer w-fit p-2 hover:bg-blue-500 hover:text-white rounded-sm'>
                <h1>Create an Order</h1>
                <AiOutlinePlus/>
            </div>
            {editModalOpen && <Modal open={editModalOpen} onClose={()=>setEditModalOpen(false)}><EditOrder setOrders={setOrders} orderToEdit={editOrder} onClose={()=>{setEditModalOpen(false);setEditOrder('')}}/></Modal>}
            {orders.length===0 ? <div className='text-center'>No Orders to Display</div> : <>
            
            <table className="w-[110%] table-auto font-thin border-blue-900 text-left m-3 ">
                <thead>
                    <tr className='text-xs font-bold w-auto'>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Client Id</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit' >Order Status</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Transport</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Product</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Quantity</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Register</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Delivery</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Price</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Discount</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Guide</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Place</td>
                        <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Vehicle</td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item) => {
                        return (
                            <TableRow key={item._id} item={item} setOrders={setOrders} setEditModalOpen={setEditModalOpen} setEditOrder={setEditOrder}/>
                        )
                    })}


                </tbody>
            </table>
            <Pagination page={page} setPage={setPage} pageCount={pageCount} count={count} itemsPerPage={itemsPerPage} />
            </>}
        </div>
    )
}

export default Orders