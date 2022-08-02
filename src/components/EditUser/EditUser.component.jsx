import React, { useState,useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomButton from '../CustomButton/CustomButton.component'
import TextFieldEditCreate from '../TextFieldEditCreate/TextFieldEditCreate.component'
import { editUser } from '../../util/users.utils'

const EditUser = ({ userToEdit, setUsers, onClose }) => {
    const validate = Yup.object({
        _id: Yup.string().required('Required'),
        clientEmail: Yup.string().email().required('Required'),
        clientName: Yup.string().required('Required'),
        clientNit: Yup.number().required('Required'),
        clientOrders: Yup.array().required('Required'),
        clientRole: Yup.string().required('Required')
    })
    const [newOrder,setNewOrder] = useState()
    const [clientOrders,setClientOrders] = useState(0)
    const [initialValues, setInitialValues] = useState({
        _id: '',
        clientEmail: '',
        clientName: '',
        clientNit: '',
        clientOrders: '',
        clientRole: ''
    })
    

    useEffect(() => {
        setNewOrder(userToEdit === '')
        if (userToEdit !== '') {
            let {clientOrders} = userToEdit
            const orders = clientOrders.length
            setClientOrders(orders)
            setInitialValues(userToEdit)
        }
    }, [userToEdit])

    const submitCredentials = (values) =>{
        try {
            editUser(values, setUsers)
            onClose()

        } catch (error) {
            console.log(error)
        }
    }



    return (
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={values => { submitCredentials(values) }}
            validationSchema={validate}
        >
            {formik =>
            (
                <div className='fixed h-[70vh] w-[50vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='bg-white h-full w-full overflow-x-scroll '>
                        <h1 className='text-center p-6 pb-0'>{newOrder ? 'Create' : 'Edit'} User</h1>
                        <Form >
                            <div className='grid grid-cols-2 gap-5 p-8'>
                                <div>
                                    <TextFieldEditCreate disabled label='User ID' name='_id' type='text' />
                                    <TextFieldEditCreate disabled label='Email' name='clientEmail' type='email' />
                                    <TextFieldEditCreate label='Name' name='clientName' type='text' />
                                </div>
                                <div>
                                    <TextFieldEditCreate value={clientOrders} disabled label='Orders' name='clientOrders' type='number' />
                                    <TextFieldEditCreate label='Nit' name='clientNit' type='number' />
                                    <TextFieldEditCreate label='Role' name='clientRole' type='text' />
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <CustomButton type='submit' name={`${newOrder ? 'Create User' : 'Edit User'}`}>Submit</CustomButton>
                            </div>
                        </Form>

                    </div>
                </div>

            )
            }
        </Formik>
    )
}

export default EditUser