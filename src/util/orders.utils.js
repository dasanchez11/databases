import { v4 as uuidv4 } from 'uuid';
import { createOrderFirebase, deleteOrderFirebase, editOrderFirebase } from '../Firebase/firebase.orders';

export const deleteOrder = async (authContext, setOrders, itemId) => {
  try {
    const clientId = authContext.authState.clientInfo._id
    await deleteOrderFirebase(itemId,clientId)
    authContext.authState.clientInfo.clientOrders = authContext.authState.clientInfo.clientOrders.filter(order => order !== itemId)
    authContext.setAuthState({...authContext.authState})
    setOrders(orders => orders.filter(order => order._id !== itemId))
  } catch (error) {
    console.log(error)
  }
}

export const createDiscount = (values) => {
  const { transportType, deliveryPrice, productQuantity } = values
  if (!transportType) {
    throw new Error('No type specified')
  }
  if (productQuantity > 5) {
    if (transportType === 'sea') return deliveryPrice * 0.03
    if (transportType === 'land') return deliveryPrice * 0.02
  } else
    return 0
}

export const createOrder = async(vals, deliveryDiscount, authContext, setOrders) => {
  const {setLoading,isAdmin} = authContext
  let clientId
  if(isAdmin()){
    clientId = vals.clientId
  }else{
    clientId = authContext.authState.clientInfo._id
  }
  const orderId = uuidv4()
  let values = returnFields(vals,deliveryDiscount)
  values = {...values,_id:orderId}
  try {
    setLoading(true)
    await createOrderFirebase(orderId,values,clientId)
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
  authContext.authState.clientInfo.clientOrders.push(orderId)
  authContext.setAuthState({...authContext.authState})
  setOrders(orders => [...orders, values] )
}

const returnFields = (vals,deliveryDiscount) =>{
  const {fleetNumber,portDelivery,transportType,...otherVals} = vals
  let values
  if(transportType==='land'){
    const wareHouseDelivery = portDelivery
    const deliveryVehicle = fleetNumber
    values = {...otherVals,transportType,wareHouseDelivery,deliveryVehicle,deliveryDiscount}
  }else{
    values = { ...vals,deliveryDiscount }
  }

  return values
}

const returnFieldsPlain = (vals) =>{
  const {fleetNumber,portDelivery,transportType,...otherVals} = vals
  let values
  if(transportType==='land'){
    const wareHouseDelivery = portDelivery
    const deliveryVehicle = fleetNumber
    values = {...otherVals,transportType,wareHouseDelivery,deliveryVehicle}
  }else{
    values = { ...vals }
  }

  return values
}



export const editOrder = async (editOrder,setOrders,authContext) =>{
  try {
    const {setLoading} = authContext
    const {_id} = editOrder
    const deliveryDiscount = createDiscount(editOrder)
    editOrder = {...editOrder,deliveryDiscount}
    editOrder = returnFieldsPlain(editOrder)
    setLoading(true)
    await editOrderFirebase(_id,editOrder)
    setOrders(orders =>{
      const orderId = orders.findIndex((ord) => ord._id===_id)
      orders[orderId] = editOrder
      return [...orders]
    })
    setLoading(false)
  } catch (error) {
    console.log(error)
  }
}
