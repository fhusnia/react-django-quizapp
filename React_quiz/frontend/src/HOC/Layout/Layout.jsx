import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

function Layout(props) {
  return (
    <div className='p-3'>
        <Navbar/>
        <div className='flex justify-center p-3'>
          <div className='basis-full sm:basis-1/2'>
            {props.children}
          </div>
         
        </div>
    </div>
  )
}

export default Layout