import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <div className='flex w-full h-screen bg-[#0e0f20] text-[#81656a]'>
      <ul className='flex w-full font-bold text-xl justify-around flex-col h-[45vh] p-5'>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/party">Party</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/all-entries">All Entries and Bill</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/items">Items</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/reports">Reports</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/manage-staff">Manage Staff</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/setting">Setting</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/paid-plan">Paid Plan</Link>
        </li>
        <li className='flex h-[5vh] hover:text-white justify-start hover:cursor-pointer items-center my-1 hover:bg-blue-800 w-full'>
          <Link to="/help-support">Help and Support</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
