import React, { useState } from 'react';
import Popup from './Popup';

const Header = () => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className='flex w-full border-y-2 items-center justify-between h-[8vh]'>
      <div className='flex text-lg font-bold mx-4'>Manage Staff</div>
      <button
        className='flex mx-10 bg-[#1702fe] text-white font-medium w-[6vw] h-[5vh] rounded-md items-center justify-center'
        onClick={togglePopup}
      >
        Add Staff
      </button>
      {showPopup && <Popup togglePopup={togglePopup} />}
    </div>
  );
};

export default Header;
