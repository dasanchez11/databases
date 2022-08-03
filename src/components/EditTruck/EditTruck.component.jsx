import React, { useState,useEffect } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import CustomButton from '../CustomButton/CustomButton.component'
import TextFieldEditCreate from '../TextFieldEditCreate/TextFieldEditCreate.component'
import { createTruck, editTruck } from '../../util/truck.utils'


const EditTruck = ({ truckToEdit, setTrucks, onClose }) => {
    const validate = Yup.object({
        truckId: Yup.string().matches(/^[a-zA-Z]{3}[0-9]{3}$/, '3 Letters,3 numbers sequece').required('Required'),
        status: Yup.string().required('Required'),
        capacity: Yup.number().required('Required'),
        model: Yup.string().required('Required'),
        brand: Yup.string().required('Required'),
        year: Yup.number().required('Required')
    })
    const [newOrder,setNewOrder] = useState()
    const [initialValues, setInitialValues] = useState({
        truckId: '',
        status: '',
        capacity: '',
        model: '',
        brand: '',
        year: ''
    })
    

    useEffect(() => {
        setNewOrder(truckToEdit === '')
        if (truckToEdit !== '') {
            setInitialValues(truckToEdit)
        }
    }, [truckToEdit])

    const submitCredentials = (values) =>{
        try {
            if (newOrder){
                createTruck(values,setTrucks)
            }else{
                editTruck(values, setTrucks)
            }
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
                <div className='fixed h-[50vh] w-[50vw] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                    <div className='bg-white h-full w-full overflow-x-scroll '>
                        <h1 className='text-center p-6 pb-0'>{newOrder ? 'Create' : 'Edit'} Truck</h1>
                        <Form >
                            <div className='grid grid-cols-2 gap-5 p-8'>
                                <div>
                                    <TextFieldEditCreate label='Vehicle ID' name='truckId' type='text' />
                                    <TextFieldEditCreate label='Status' name='status' type='text' />
                                    <TextFieldEditCreate label='Capacity' name='capacity' type='number' />
                                </div>
                                <div>
                                    <TextFieldEditCreate label='Model' name='model' type='text' />
                                    <TextFieldEditCreate label='Brand' name='brand' type='text' />
                                    <TextFieldEditCreate label='Year' name='year' type='number' />
                                </div>
                            </div>
                            <div className='flex flex-row justify-center'>
                                <CustomButton type='submit' name={`${newOrder ? 'Create Truck' : 'Edit Truck'}`}>Submit</CustomButton>
                            </div>
                        </Form>

                    </div>
                </div>
            )
            }
        </Formik>
    )
}

export default EditTruck