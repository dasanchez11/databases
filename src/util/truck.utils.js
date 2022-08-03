import { createTruckFirebase, editTruckFirebase } from "../Firebase/firebase.trucks"



export const editTruck = async (truckInfo, setTrucks) => {
    try {
        await editTruckFirebase(truckInfo._id, truckInfo)
        setTrucks(trucks => {
            const truckId = trucks.findIndex((trck) => trck._id === truckInfo._id)
            trucks[truckId] = truckInfo
            return [...trucks]
        })
    } catch (error) {
        console.log(error)
    }
}

export const createTruck = async (truckInfo, setTrucks) => {
    try {
        await createTruckFirebase(truckInfo)
        setTrucks(trucks => [...trucks, truckInfo])

    } catch (error) {
        console.log(error)
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
