
export const editUser = async (userData, setUsers,authAxios,setLoading) => {
    console.log(userData._id)
    try {
        await authAxios.patch(`user/edit-client/${userData._id}`,{userData})
        setUsers(users => {
            const userId = users.findIndex((usr) => usr._id === userData._id)
            users[userId] = userData
            return [...users]
        })
    } catch (error) {
        console.log(error)
    }
}


export const getAllUsers = async (authAxios, setLoading,setPageCount, setItemsPerPage,setUsers,setCount,page) => {
    try {
        setLoading(true)
        const { data } = await authAxios.get(`user/get-all-users?page=${page}`)
        setLoading(true)
        setPageCount(data.pagination.pageCount)
        setItemsPerPage(data.pagination.itemsPerPage)
        setUsers(data.clients)
        setCount(data.pagination.count)
        setLoading(false)

    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}


