import {createShipFirebase, deleteShipFirebase, editShipFirebase} from '../Firebase/firebase.ships'

export const editShip = async(shipInfo,setShips,authAxios,setLoading) =>{
    try {
        setLoading(true)
        await authAxios.patch('ship/edit-ship',{shipInfo})
        setShips(ships =>{
            const shipId = ships.findIndex((shp) => shp._id===shipInfo._id)
            ships[shipId] = shipInfo
      return [...ships]
        })
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)

    }
}

export const createShip = async (shipInfo,setShips,authAxios,setLoading) =>{
    try {
        shipInfo ={...shipInfo,_id:shipInfo.shipId}
        setLoading(true)
        await authAxios.post('ship/create-ship',{shipInfo})
        setShips(ships => [...ships,shipInfo])
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}

export const deleteShip = async(shipId,setShips,authAxios,setLoading) =>{
    try {
        setLoading(true)
        await authAxios.delete(`ship/delete-ship/${shipId}`)
        setShips(ships => ships.filter(shp => shp._id!==shipId))
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }
}


export const getAllShips = async (setLoading, authAxios, setPageCount, setItemsPerPage, setShips, setCount, page) =>{
    try {
        setLoading(true)
        const {data} = await authAxios.get(`ship/get-all-ships?page=${page}`)
        setPageCount(data.pagination.pageCount)
        setItemsPerPage(data.pagination.itemsPerPage)
        setShips(data.ships)
        setCount(data.pagination.count)
        setLoading(false)
    } catch (error) {
        console.log(error)
        setLoading(false)
    }

}
