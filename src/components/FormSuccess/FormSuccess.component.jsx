import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';


const FormSuccess = ({ text }) => (
  <section className="text-center p-2 mb-2 rounded border border-green-600 bg-green-100">
    <p className="text-green-700 font-bold flex flex-row items-center justify-center">
      <span className='text-xl'>
        <AiOutlineCheckCircle />
      </span>
      <span className="ml-1 text-sm">{text}</span>
    </p>
  </section>
);

export default FormSuccess;