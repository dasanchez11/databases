import React, { useState, useContext } from 'react'
import * as Yup from 'yup'
import TextField from '../TextField/TextField.component'
import { Formik, Form } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
// import { publicFetch } from '../../util/fetch'
import FormSuccess from '../FormSuccess/FormSuccess.component'
import FormError from '../FormError/FormError.component'
import { AuthContext } from '../../context/AuthContext'
import CustomButton from '../CustomButton/CustomButton.component'
import { signUpUser } from '../../util/user.utils'
import { FetchContext } from '../../context/FetchContext'




const SignUp = () => {
    const [signupSuccess, setSignUpSuccess] = useState()
    const [signupError, setSignUpError] = useState()
    const [redirectOnSignup, setRedirectOnSignup] = useState(false)
    const authContext = useContext(AuthContext)
    const fetchContext = useContext(FetchContext)
    const {loading,setLoading} = authContext
    

    const navigate = useNavigate()

    const validate = Yup.object({
        clientName: Yup.string().required('Required'),
        clientNit: Yup.string().required('Required'),
        clientEmail: Yup.string().email('Email is invalid ').required('Email is Required'),
        clientPassword: Yup.string().min(8, 'Must have at least 8 characters').required('Password is Required'),
        confirmPassword: Yup.string().oneOf([Yup.ref('clientPassword'), null], 'Passwords do not match').required('Confirm Password is Required')
    })

    const handleSignIn = () => {
        navigate('/signin')
    }

    const submitCredentials = async (credentials) => {
        setLoading(true)
        signUpUser(credentials,setLoading,setSignUpSuccess,setSignUpError,setRedirectOnSignup,fetchContext.publicAxios)
        setLoading(false)
    }


    return (
        <>
            {redirectOnSignup && <Navigate to='/orders' />}
            {signupSuccess && (
                <FormSuccess text={signupSuccess} />
            )}
            {signupError && (
                <FormError text={signupError} />
            )}
            <Formik
                initialValues={{
                    clientName: '',
                    clientNit: '',
                    clientEmail: '',
                    clientPassword: '',
                    confirmPassword: ''
                }}
                onSubmit={values => {
                    submitCredentials(values)
                }}
                validationSchema={validate}>
                {formik => (
                    <>
                        <Form className='flex flex-col gap-2 pt-5'>
                            <div className='flex flex-row gap-8'>
                                <TextField label='Company Name' name='clientName' type='text' />
                                <TextField label='Company Nit' name='clientNit' type='number' />
                            </div>
                            <TextField label='Email' name='clientEmail' type='email' />
                            <div className='flex flex-row gap-8'>
                                <TextField label='Password' name='clientPassword' type='password' />
                                <TextField label='Confirm Password' name='confirmPassword' type='password' />
                            </div>

          
                            <CustomButton type='submit' name='Register'>Submit</CustomButton>
                            <p className='text-sm text-black self-center mt-3'>Already have an account? <span onClick={handleSignIn} className='text-Main cursor-pointer font-semibold underline'>SignIn</span></p>

                        </Form>
                    </>
                )}
            </Formik>
        </>
    )
}

export default SignUp