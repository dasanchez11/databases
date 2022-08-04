

export const signUpUser = async (credentialValues,authContext, setLoading, setSignUpSuccess, setSignUpError, setRedirectOnSignup, publicFetch) => {
    try {
        setLoading(true)
        console.log(publicFetch)
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

export const signInUser = async (credentials,authContext, setLoading, setSigninSuccess, setSigninError, setredirectOnSignin, publicFetch) => {
    try {
        setLoading(true)
        const { data } = await publicFetch.post('signin', credentials)
        authContext.setAuthState(data)
        setSigninSuccess(data.message)
        setSigninError('')
        setTimeout(() => {
            setredirectOnSignin(true)
        }, 700)
        setLoading(false)
    } catch (error) {
        setLoading(false)
        const { message } = error.response.data
        setSigninError(message)
        setSigninSuccess('')
    }
}