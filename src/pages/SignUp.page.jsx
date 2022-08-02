import React from 'react'
import SignUp from '../components/SignUp/SignUp.component'

const SignUpPage = () => {
 
    return (
        <section className='h-screen w-screen flex flex-row gap-11 bg-slate-100 items-center'>
            <div className='bg-slate-50 hidden md:flex flex-col md:visible md:m-4 md:border-2 md:p-14 md:h-[95vh] md:w-[400px] md:rounded-md shadow-md'>
                <span className='text-4xl text-left'>LOGO</span>

                <h3 className='text-3xl font-bold mt-16'>{'Manage Your Company has never been so Easy!'}</h3>

                <div>Image</div>


            </div>

            <div className='w-full md:w-[700px] h-[95vh] flex flex-col items-center justify-center text-Main'>
                <div>
                    <div>
                        <h2 className='font-semibold text-3xl pb-4 text-black'>{`Register for Free!`}</h2>
                        <h5 className='font-light text-gray-600 text-base pb-10'>Enter your details below</h5>
                    </div>
                        <SignUp/> 
                </div>
            </div>
        </section>
    )
}

export default SignUpPage