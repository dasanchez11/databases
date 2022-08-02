// import { AiOutlineDashboard, AiOutlinePieChart,AiOutlineSetting } from 'react-icons/ai'
// import { HiOutlineIdentification } from 'react-icons/hi'
import { HiOutlineUsers } from 'react-icons/hi'

import { FaTruck ,FaRegNewspaper} from 'react-icons/fa'
import {RiShipFill} from 'react-icons/ri'




const navItems = [
    {
      label: 'Orders',
      path: 'orders',
      icon: FaRegNewspaper,
      allowedRoles: ['user','admin']
    },
    {
        label: 'Users',
        path: 'users',
        icon: HiOutlineUsers,
        allowedRoles: ['admin']
      },
    {
      label: 'Trucks',
      path: 'trucks',
      icon: FaTruck,
      allowedRoles: ['admin']
    },
    {
      label: 'Ships',
      path: 'ships',
      icon: RiShipFill,
      allowedRoles: ['admin']
    }
  ];

  export default navItems