
import React from 'react'
import { useField, ErrorMessage } from 'formik'


const TextFieldEditCreate = ({ label, ...props }) => {
  const [field, meta] = useField(props)

  return (
    <div className='flex flex-col'>
      <div className="relative mt-2 border-b-2 focus-within:border-blue-900  bg-transparent z-0">
        <input name="" placeholder=" " className={`block w-full appearance-none focus:outline-none bg-transparent text-gray-600 ${meta.touched && meta.error && 'border-red-600'}`}
          {...field}
          {...props} />
        <label className="absolute top-0 -z-10 duration-300 origin-0 text-blue-900 " htmlFor={field.name}>{label}</label>
      </div>
      <div className='text-red-600 text-xs mb-4'>
        <ErrorMessage name={field.name} />
      </div>
    </div>
  )
}

export default TextFieldEditCreate