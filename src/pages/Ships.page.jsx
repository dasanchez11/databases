import React from 'react'
import { useState,useEffect } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from '../components/Modal/Modal.component'
import Pagination from '../components/Pagination/Pagination.component'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { FetchContext } from '../context/FetchContext'

import ShipsRow from '../components/ShipsRow/ShipsRow.component'
import EditShip from '../components/EditShip/EditShip.component'
import { getAllShips } from '../util/ships.utils'

const Ships = () => {
    const [ships,setShips] = useState([])
    const [shipToEdit,setShipToEdit] = useState('')

    // Pagination
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [count, setCount] = useState()
    const [itemsPerPage, setItemsPerPage] = useState()
    const [editShipOpen,setEditShipOpen] = useState(false)

    const handleNewShipClick = () =>{
        setEditShipOpen(true)
        setShipToEdit('')
    }

    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)

    const {setLoading} = authContext


    useEffect(() => {
        const getData = async () => {
            getAllShips(setLoading,fetchContext.authAxios,setPageCount,setItemsPerPage,setShips,setCount,page)
        }
        getData()
    }, [page,setLoading])
    
    return (
        <div className='h-[87vh] w-[80vw] overflow-x-scroll max-h-[87vh]'>
            <div onClick={handleNewShipClick} className='text-xl text-blue-900 text-center flex flex-row items-center gap-2 cursor-pointer w-fit p-2 hover:bg-blue-500 hover:text-white rounded-sm'>
                <h1>Add a New Ship</h1>
                <AiOutlinePlus />
            </div>
            {editShipOpen && <Modal open={editShipOpen} onClose={() => setEditShipOpen(false)}><EditShip setShips={setShips} shipToEdit={shipToEdit} onClose={() => { setEditShipOpen(false); setShipToEdit('') }} /></Modal>}
            {ships.length === 0 ? <div className='text-center'>No Ships to Display</div> : <>

                <table className="w-[110%] table-auto font-thin border-blue-900 text-left m-3 ">
                    <thead>
                        <tr className='text-xs font-bold w-auto'>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Ship ID</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Status</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Capacity</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Model</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Brand</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Year</td>
                        </tr>
                    </thead>
                    <tbody>
                        {ships.map((item) => {
                            return (
                                <ShipsRow key={item._id} item={item} setShips={setShips} setEditModalOpen={setEditShipOpen} setShipToEdit={setShipToEdit} />
                            )
                        })}


                    </tbody>
                </table>
                <Pagination page={page} setPage={setPage} pageCount={pageCount} count={count} itemsPerPage={itemsPerPage} />
            </>}
        </div>
    )
}

export default Ships