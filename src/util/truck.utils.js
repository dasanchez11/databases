import { createTruckFirebase, editTruckFirebase } from "../Firebase/firebase.trucks"



export const editTruck = async (truckInfo, setTrucks,authAxios,setLoading) => {
    try {
        setLoading(true)
        await authAxios.patch('truck/edit-truck',{truckInfo})
        setTrucks(trucks => {
            const truckId = trucks.findIndex((trck) => trck._id === truckInfo._id)
            trucks[truckId] = truckInfo
            return [...trucks]
        })
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

export const createTruck = async (truckInfo, setTrucks,authAxios,setLoading) => {
    try {
        setLoading(true)
        await authAxios.post('truck/create-truck',{truckInfo})
        setTrucks(trucks => [...trucks, truckInfo])
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)

    }
}

export const deleteTruck = async (truckId, setTrucks,authAxios,setLoading) => {
    try {
        setLoading(true)
        await authAxios.delete(`truck/delete-truck/${truckId}`)
        setTrucks(trucks => trucks.filter(truck => truck._id !== truckId))
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}




export const getAllTrucks = async (setLoading, authAxios, setPageCount, setItemsPerPage, setTrucks, setCount, page) => {
    try {
        setLoading(true)
        const { data } = await authAxios.get(`truck/get-all-trucks?page=${page}`)
        setLoading(false)
        setPageCount(data.pagination.pageCount)
        setItemsPerPage(data.pagination.itemsPerPage)
        setTrucks(data.trucks)
        setCount(data.pagination.count)
    } catch (error) {
        setLoading(false)
        console.log(error)
    }
}
