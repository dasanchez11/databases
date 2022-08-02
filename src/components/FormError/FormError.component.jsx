import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const FormError = ({ text }) => (
    <section className="text-center p-2 mb-2 rounded border border-red-600 bg-red-100">
        <p className=" text-red-500 flex flex-row items-center justify-center">
            <span className='text-xl'>
                <AiOutlineCloseCircle />
            </span>
            <span className="ml-1 text-sm">{text}</span>
        </p>
    </section>
);

export default FormError;