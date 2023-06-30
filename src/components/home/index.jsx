import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import SideBar from '../SideBar';
import ContentTable from '../content/ContentTable';
import Header from '../Header';
import ManageStaff from '../ManageStaff';

const Home = () => {
  return (
    <Router>
      <div className='flex w-full h-full'>
        <div className='flex w-1/6 h-full'>
          <SideBar />
        </div> 
        <div className='flex flex-col flex-1'>
          <Routes>
            <Route path="/" element={
              <>
                <Header />
                <Outlet />
              </>
            }>
              <Route path="/manage-staff" element={<ContentTable />} />
                  
              <Route path="/" component={ManageStaff} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default Home;
