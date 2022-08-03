import React, { useState } from 'react'
import Modal from '../components/Modal/Modal.component'

import { useEffect } from 'react'
import UserRow from '../components/UserRow/UserRow.component'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import {FetchContext} from '../context/FetchContext'
import EditUser from '../components/EditUser/EditUser.component'
import Pagination from '../components/Pagination/Pagination.component'
import { getAllUsers } from '../util/users.utils'

const Users = () => {
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [editUser, setEditUser] = useState('')
    const {setLoading} = authContext
    const [users, setUsers] = useState([])

    //Pagination Variables
    const [page, setPage] = useState(1)
    const [pageCount, setPageCount] = useState(0)
    const [count, setCount] = useState()
    const [itemsPerPage, setItemsPerPage] = useState()

    useEffect(() => {
        const getData = async () => {
            getAllUsers(fetchContext.authAxios,setLoading,setPageCount,setItemsPerPage,setUsers,setCount,page)
        }
        getData()
    }, [page,setLoading,fetchContext.authAxios])

    return (
        <div className='h-[87vh] w-[80vw] overflow-x-scroll max-h-[87vh]'>
            {editModalOpen && <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}><EditUser userToEdit={editUser} setUsers={setUsers} onClose={()=>{setEditModalOpen(false);setEditUser('')}} /></Modal>}
            {users.length === 0 ? <div className='text-center'>No Users to Display</div> : <>

                <table className="w-[110%] table-auto font-thin border-blue-900 text-left m-3 ">
                    <thead>
                        <tr className='text-xs font-bold w-auto'>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>User ID</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit' >Email</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Name</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Nit</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Orders</td>
                            <td className='w-auto px-2 text-left border border-blue-900 min-w-fit'>Role</td>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((item) => {
                            return (
                                <UserRow key={item._id} item={item} setUsers={setUsers} setEditModalOpen={setEditModalOpen} 
                                setEditUser={setEditUser} 
                                />
                            )
                        })}


                    </tbody>
                </table>
                <Pagination page={page} setPage={setPage} pageCount={pageCount} count={count} itemsPerPage={itemsPerPage} />
            </>}
        </div>
    )
}

export default Users