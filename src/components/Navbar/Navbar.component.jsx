import React from 'react';
import { useContext } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import { AuthContext } from '../../context/AuthContext';

const SearchInput = () => (
    <div className="flex">
        <input
            className="py-2 px-4 border  border-gray-300 rounded-full focus:outline-none w-32 sm:w-64"
            placeholder="Search"
        />
        <button className="rounded-full bg-gradient px-4 ml-2 text-blue-900 flex items-center text-xs focus:outline-none shadow-lg">
            <span className='text-Main font-bold text-xl'>
                <BsArrowRight />
            </span>
        </button>
    </div>
);

const Navbar = () => {
    const authContext = useContext(AuthContext)
    return (
        <nav className="flex justify-between px-4">
            <div className="">
                <SearchInput />
            </div>
            <div onClick={()=>authContext.logout()} className="flex flex-row items-center rounded-sm px-5 gap-3 text-blue-900 hover:text-white hover:bg-blue-500 cursor-pointer">
                <h1>LogOut</h1>
                <AiOutlineLogout/>
            </div>
        </nav>
    );
};

export default Navbar;