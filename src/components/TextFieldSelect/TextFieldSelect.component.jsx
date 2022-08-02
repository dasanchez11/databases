import React from 'react'
import { Field, ErrorMessage, useField } from 'formik'

const TextFieldSelect = (props) => {
    const [field, meta] = useField(props)
    const { name } = field
    const { label, options, ...rest } = props
    return (
        <div className='flex flex-col'>
            <div className='relative mt-2 border-b-2 focus-within:border-blue-900  bg-transparent z-0'>
                {meta.value!=='' && <input className='hidden'></input>}
                <Field className={`block w-full  focus:outline-none bg-transparent text-gray-600 ${meta.touched && meta.error && 'border-red-600'}`}
                    as='select' id='name' name='name' {...rest}>
                    {
                        options.map(option => {
                            return (
                                <option key={option.value} value={option.value}>{option.key}</option>
                            )
                        })
                    }
                </Field>
                <label className="text-[0.9rem] absolute bottom-0 -z-10 duration-300 origin-0 text-blue-900 " htmlFor={name}>{label}</label>
            </div>
            <div className='text-red-600 text-xs mb-4'>
                <ErrorMessage name={name} />
            </div>
        </div>
    )
}

export default TextFieldSelect