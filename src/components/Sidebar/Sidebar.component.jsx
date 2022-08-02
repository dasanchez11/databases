import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import SidebarCard from '../SidebarCard/SidebarCard.component'
import navItems from './Sidebar.utils'
import { v4 as uuidv4 } from "uuid";


const Sidebar = () => {
    const navigate = useNavigate()
    const onClick = (e) => {
        // navigate(`/${e.target.closest('li').id}`)
        navigate(`/${e.currentTarget.id}`)

    }
    const location = useLocation()
    const currentLocation = location.pathname.split("/")[1]
    const activePage = currentLocation
    const authContext = useContext(AuthContext)
    const { clientName,clientRole} = authContext.authState.clientInfo
    return (
        <section className='px-3 pt-6 border-r h-screen shadow-md w-[300px]'>
            <div className='text-3xl py-4'>
                Logo
            </div>
            <div className='flex flex-row gap-3 justify-center sm:justify-start items-center bg-slate-500/10 p-2 rounded-md mb-12 mt-8'>
                <div>
                    <div className="m-1 mr-2 w-10 h-10 relative flex justify-center items-center rounded-full bg-orange-500 text-xl text-white uppercase">{clientName ? clientName[0].toUpperCase() : ''}</div>
                </div>
                <div className='text-blue-900 hidden sm:flex flex-col'>
                    <h3>{clientName ? clientName : ''}</h3>
                    <h5>{clientRole ? clientRole.toUpperCase() : ''}</h5>
                </div>
            </div>
            <div className='text-sm font-bold'>
                <h4>General</h4>
            </div>
            <ul className=' gap-2 flex flex-col'>
                {navItems.map((item) => (
                    <div key={uuidv4()}>
                        {item.allowedRoles.includes(clientRole) && (
                            <div  >
                                <SidebarCard onClick={onClick} id={item.path} Logo={item.icon} activePage={activePage} label={item.label} />
                            </div>
                        )}
                    </div>
                ))}
            </ul>
        </section>
    )
}

export default Sidebar