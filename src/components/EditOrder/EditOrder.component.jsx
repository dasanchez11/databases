import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomButton from '../CustomButton/CustomButton.component'
import TextFieldEditCreate from '../TextFieldEditCreate/TextFieldEditCreate.component'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import TextFieldSelect from '../TextFieldSelect/TextFieldSelect.component'
import { createDiscount, createOrder, editOrder } from '../../util/orders.utils'
import { transportTypes, statusTypes, availableClients } from '../../util/dropdowns.utils'
import { FetchContext } from '../../context/FetchContext'

const transportOptions = transportTypes()
const statusOptions = statusTypes()



const EditOrder = ({ orderToEdit, setOrders, onClose }) => {
    const [isTransportType, setIsTransportType] = useState('')
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const {isAdmin} = authContext
    const [discount, setDiscount] = useState(0)
    const validate = Yup.object({
        clientId: Yup.string().required('Required'),
        orderStatus: Yup.string().required('Required'),
        transportType: Yup.mixed().oneOf(['sea', 'land'], 'MUST be either "sea" or "land"').required('Required'),
        productType: Yup.string().required('Required'),
        productQuantity: Yup.number().moreThan(0).required('Required'),
        registerDate: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'A valid yyyy-mm-dd format is required').required('Required'),
        deliveryDate: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, 'A valid yyyy-mm-dd format is required').required('Required'),
        deliveryPrice: Yup.number().moreThan(0).required('Required'),
        guideNumber: Yup.string().matches(/^[0-9]{10}$/, 'Must contain 10 numbers').required('Required'),
        portDelivery: Yup.string().required('Required'),
        fleetNumber: isTransportType === 'sea' ?
            Yup.string().matches(/^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}$/, '3 Letters,4 numbers,1 Letter sequece').required('Required') :
            Yup.string().matches(/^[a-zA-Z]{3}[0-9]{3}$/, '3 Letters,3 numbers sequece').required('Required')
    })

    const [newOrder, setNewOrder] = useState()
    const [initialValues, setInitialValues] = useState({
        clientId: '',
        orderStatus: '',
        transportType: '',
        productType: '',
        productQuantity: '',
        registerDate: '',
        deliveryDate: '',
        deliveryPrice: '',
        guideNumber: '',
        portDelivery: '',
        fleetNumber: '',
    })


    useEffect(() => {
        setNewOrder(orderToEdit === '')
        if (orderToEdit !== '') {
            setIsTransportType(orderToEdit.transportType)
            let values = orderToEdit
            if (orderToEdit.transportType === 'land') {
                let { wareHouseDelivery, deliveryVehicle, ...others } = orderToEdit
                const portDelivery = wareHouseDelivery
                const fleetNumber = deliveryVehicle
                values = { ...others, portDelivery, fleetNumber }
            }
            setInitialValues(values)
            setStatusSelect(values.orderStatus)
            setClientSelect(values.clientId)
        }else{
            if(!isAdmin()){
                // setClientSelect(authContext.authState.clientInfo._id)
                setInitialValues(state=>({...state,clientId:authContext.authState.clientInfo._id}))
            }
        }
    }, [orderToEdit,authContext.authState.clientInfo._id,isAdmin])

    const submitCredentials = (values) => {

        const deliveryDiscount = createDiscount(values)
        setDiscount(deliveryDiscount)
        try {
            if (newOrder) {
                createOrder(values, deliveryDiscount, authContext, setOrders,fetchContext.authAxios)
            } else {
                editOrder(values, setOrders, authContext,fetchContext.authAxios)
            }
            onClose()
        } catch (error) {
            console.log(error)

        } 
    }

    const [usersOptions, setUsersOptions] = useState([])
    const [clientSelect, setClientSelect] = useState()
    const [statusSelect,setStatusSelect] = useState('')

    useEffect(() => {
        const getData = async () => {
            const res = await availableClients(fetchContext.authAxios)
            setUsersOptions(res)
        }
        getData()
    }, [setUsersOptions])

    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={values => { submitCredentials(values) }}
            validationSchema={validate}
        >
            {formik =>
            (
                <div className='fixed h-[70vh] w-[40vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='bg-white h-full w-full overflow-x-scroll '>
                        <h1 className='text-center p-6 pb-0'>{newOrder ? 'Create' : 'Edit'} Order</h1>
                        <Form >
                            <div className='grid grid-cols-2 gap-5 p-8'>
                                <div>
                                    <TextFieldSelect value={isTransportType} label='Transport Type' name='transportType' onInput={e => setIsTransportType(e.target.value)} options={transportOptions} />
                                    <TextFieldSelect value={statusSelect} label='Order Status' name='orderStatus' onInput={e => setStatusSelect(e.target.value)} options={statusOptions} />
                                    {/* <TextFieldEditCreate label='Order Status' name='orderStatus' type='text' /> */}
                                    <TextFieldEditCreate label='Delivery Date' name='deliveryDate' type='text' />
                                    {/* <TextFieldEditCreate label='Client Id' name='clientId' type='text' /> */}
                                    <TextFieldEditCreate label='Product Type' name='productType' type='text' />
                                    <TextFieldEditCreate label='Product Quantity' name='productQuantity' type='number' />
                                    <TextFieldEditCreate label='Register Date' name='registerDate' type='text' />
                                </div>
                                <div>
                                    {isAdmin() ? <TextFieldSelect value={clientSelect} label='Client' name='clientId' onInput={e => setClientSelect(e.target.value)} options={usersOptions} />:
                                    <TextFieldEditCreate disabled label='Client' name='clientId' type='text'/>}
                                    <TextFieldEditCreate label={`${isTransportType === 'sea' ? 'Ship ID' : 'Truck'}`} name='fleetNumber' type='text' />
                                    <TextFieldEditCreate label={`${isTransportType === 'sea' ? 'Port Delivery' : 'Warehouse'}`} name='portDelivery' type='text' />
                                    <TextFieldEditCreate label='Delivery Price' name='deliveryPrice' type='number' />
                                    <TextFieldEditCreate label='Discount' disabled value={discount} name='deliveryPriceDiscounted' type='number' />
                                    <TextFieldEditCreate label='Guide Number' name='guideNumber' type='number' />
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <CustomButton type='submit' name={`${newOrder ? 'Create Order' : 'Edit Order'}`}>Submit</CustomButton>
                            </div>
                        </Form>

                    </div>
                </div>

            )
            }
        </Formik>

    )
}

export default EditOrder