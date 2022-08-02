import {createShipFirebase, deleteShipFirebase, editShipFirebase} from '../Firebase/firebase.ships'

export const editShip = async(shipInfo,setShips) =>{
    try {
        await editShipFirebase(shipInfo._id,shipInfo)
        setShips(ships =>{
            const shipId = ships.findIndex((shp) => shp._id===shipInfo._id)
            ships[shipId] = shipInfo
      return [...ships]
        })
    } catch (error) {
        console.log(error)
    }
}

export const createShip = async (shipInfo,setShips) =>{
    try {
        await createShipFirebase(shipInfo)
        setShips(ships => [...ships,shipInfo])
    } catch (error) {
        console.log(error)
    }
}

export const deleteShip = async(shipId,setShips) =>{
    try {
        await deleteShipFirebase(shipId)
        setShips(ships => ships.filter(shp => shp._id!==shipId))
    } catch (error) {
        console.log(error)
    }
}

