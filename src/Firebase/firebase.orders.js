import { collection,getDocs,updateDoc,doc,arrayUnion, writeBatch , arrayRemove, query, where} from "firebase/firestore"
import { db } from "./firebase.config"



export const createOrderFirebase = async(orderId,objectToAdd,clientId) =>{

    const orderRef = doc(db,'orders',orderId)
    const userRef = doc(db,'users',clientId)
    const batch = writeBatch(db)
    try {
        batch.set(orderRef,objectToAdd);
        batch.update(userRef,{'clientOrders':arrayUnion(orderId)})
        await batch.commit()
    } catch (error) {
        console.log(error)
    }
}


export const getAllOrdersFirebase = async(isAdmin,_id) => {
    const orderRef = collection(db,'orders')
    if(isAdmin()){
        const orders = await getDocs(orderRef)
        let allOrders = []
        orders.forEach(order => allOrders.push(order.data()))
        return allOrders
    }else{
        const quer = query(orderRef, where('clientId',"==",_id))
        const querySnapshot = await getDocs(quer)
        let allOrders = []
        querySnapshot.forEach(order => allOrders.push(order.data()))
        return allOrders
    }
}



export const deleteOrderFirebase = async (orderId,clientId) =>{
    const orderRef = doc(db,'orders',orderId)
    const userRef = doc(db,'users',clientId)
    const batch = writeBatch(db)
    try {
        batch.delete(orderRef);
        batch.update(userRef,{'clientOrders':arrayRemove(orderId)})
        await batch.commit()
        
    } catch (error) {
        console.log(error)
    }
}

export const editOrderFirebase = async (orderId,objectToUpdate) =>{
    const orderRef = doc(db,'orders',orderId)
    try {
        updateDoc(orderRef,objectToUpdate)
    } catch (error) {
        console.log(error)
    }
}