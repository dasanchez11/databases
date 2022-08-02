import React from 'react'

const SidebarCard = ({id,activePage,onClick,Logo,label}) => {
    return (
        <li onClick={onClick} id={id} className={`${activePage === id ? 'text-blue-900 bg-blue-700/20' : ''} justify-center sm:justify-start flex flex-row items-center text-lg gap-3 p-4 hover:bg-slate-500/10 rounded-md cursor-pointer`}>
            <div className='text-3xl sm:text-xl'>
             {<Logo/>}
            </div>
            <div className='hidden sm:flex'>
                {label}
            </div>
        </li>
    )
}

export default SidebarCard