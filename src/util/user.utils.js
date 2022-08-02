import { createUserDocumentFromAuth,loginUserFromAuth } from "../Firebase/firebase.utils"

export const signUpUser = async(credentialValues,setLoading,setSignUpSuccess,setSignUpError,setRedirectOnSignup,publicFetch) =>{
    try {
        setLoading(true)
        const { data } = await publicFetch.put('signup', credentialValues)
        authContext.setAuthState(data)
        setSignUpSuccess(data.message)
        setLoading(false)
        setSignUpError('')
        setTimeout(() => {
            setRedirectOnSignup(true)
        }, 700)
    } catch (error) {
        setLoading(false)
        const { message } = error.response.data
        setSignUpError(message)
        setSignUpSuccess('')
    }
}

export const signInUser = async (credentials,setLoading,setSigninSuccess,setSigninError,setredirectOnSignin,publicFetch) =>{
    try {
        await loginUserFromAuth(credentials)
        setSigninSuccess('Login Success')
        setSigninError('')
        setTimeout(() => {
            // setredirectOnSignin(true)
        }, 1000)
    } catch (error) {
        const { message } = error
        setSigninError(message)
        setSigninSuccess('')
    }
}