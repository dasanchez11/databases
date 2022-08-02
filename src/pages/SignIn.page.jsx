import React from 'react'
import SignIn from '../components/SignIn/SignIn.component'



const SignInPage = () => {
    return (
        <section className='h-screen w-screen flex flex-row gap-11 bg-slate-100 items-center'>
            <div className='bg-slate-50 hidden md:flex flex-col md:visible md:m-4 md:border-2 md:p-14 md:h-[95vh] md:w-[400px] md:rounded-md shadow-md'>
                <span className='text-4xl text-left'>Logo</span>

                <h3 className='text-3xl font-bold mt-16'> Welcome Back!</h3>

                <div>Image</div>


            </div>

            <div className='w-full md:w-[700px] h-[95vh] flex flex-col items-center justify-center text-blue-900 '>
                <div>
                    <div>
                        <h2 className='font-semibold text-3xl pb-4 text-black'>{'Sign In to Logistics Platform!'}</h2>
                        <h5 className='font-light text-gray-600 text-base pb-10'>Enter your details below</h5>
                    </div>
                        <SignIn/>     
                </div>
            </div>
        </section>
    )
}

export default SignInPage