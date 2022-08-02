import React, { useState } from 'react'
import TextField from '../TextField/TextField.component'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import { useNavigate, Navigate } from 'react-router-dom'
import FormSuccess from '../FormSuccess/FormSuccess.component'
import FormError from '../FormError/FormError.component'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../CustomButton/CustomButton.component'
import { FetchContext } from '../../context/FetchContext'
import { signInUser } from '../../util/user.utils'

const SignIn = () => {
    const [signinSuccess, setSigninSuccess] = useState()
    const [signinError, setSigninError] = useState()
    const [redirectOnSignin, setredirectOnSignin] = useState(false)
    const navigate = useNavigate()
    const validate = Yup.object({
        clientEmail: Yup.string().email('Email is invalid ').required('Email is Required'),
        clientPassword: Yup.string().min(8, 'Must have at least 8 characters').required('Password is Required'),
    })
    const authContext = useContext(AuthContext)
    const {setLoading} = authContext
    const fetchContext = useContext(FetchContext)
    const publicFetch = fetchContext.publicAxios
    const { isAuthenticated } = authContext
    const handleRegister = () => {
        navigate('/signup')
    }
    const submitCredentials = async (credentials) => {
        signInUser(credentials,setLoading,setSigninSuccess,setSigninError,setLoading,setredirectOnSignin,publicFetch)
    }


    return (
        <>
            {isAuthenticated() && <Navigate to='/orders' />}
            {redirectOnSignin && <Navigate to='/orders' />}
            {signinSuccess && (
                <FormSuccess text={signinSuccess} />
            )}
            {signinError && (
                <FormError text={signinError} />
            )}
            <Formik
                initialValues={{
                    clientEmail: '',
                    clientPassword: '',
                }}
                onSubmit={values => {
                    submitCredentials(values)
                }}
                validationSchema={validate}>
                {formik => (
                    <>
                        <Form className='flex flex-col gap-2 pt-5'>
                            <TextField label='Email' name='clientEmail' type='email' />
                            <TextField label='Password' name='clientPassword' type='password' />
                            <div className='flex flex-row justify-end text-sm font-normal cursor-pointer p-2' >
                                <span className=''>Forgot password?</span>
                            </div>

                            <CustomButton type='submit' name='Login'>Submit</CustomButton>
                            <p className='text-sm text-black self-center mt-3'>Don't have an account? <span onClick={handleRegister} className='text-blue-900 cursor-pointer font-semibold underline'>Register</span></p>

                        </Form>
                    </>
                )}
            </Formik>
        </>


    )
}

export default SignIn