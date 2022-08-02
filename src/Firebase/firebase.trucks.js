import { collection,getDocs,updateDoc,doc,setDoc,deleteDoc} from "firebase/firestore"
import { db } from "./firebase.config"

export const getAllTrucksFirebase = async() =>{
    const truckRef = collection(db,'trucks')
    const trucks = await getDocs(truckRef)
    let allTrucks = []
    trucks.forEach(truck => allTrucks.push(truck.data()))
    return allTrucks
}

export const createTruckFirebase = async(truckInfo) =>{
    try {
     const truckRef = doc(db,'trucks',truckInfo._id)
     await setDoc(truckRef,truckInfo)
    } catch (error) {
     console.log(error)  
    }
 }
 
 
 export const editTruckFirebase = async(truckId,truckToUpdate) =>{
     try {
         const truckRef = doc(db,'trucks',truckId)
         updateDoc(truckRef,truckToUpdate)        
     } catch (error) {
      console.log(error)   
     }
 }
 
 export const deleteTruckFirebase = async(truckId) =>{
     try {
         const truckRef = doc(db,'trucks',truckId)
         await deleteDoc(truckRef)
     } catch (error) {
         console.log(error)  
     }
 
 }