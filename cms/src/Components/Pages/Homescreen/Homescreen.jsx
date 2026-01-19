import React from 'react'
import Landing from '../../PageComponents/HomescreenComponents/Landing'
import Navbar from '../../PageComponents/HomescreenComponents/Navbar'
import Courses from '../../PageComponents/HomescreenComponents/Courses'
import Awards from '../../PageComponents/HomescreenComponents/Awards'
import Testimonial from '../../PageComponents/HomescreenComponents/Testimonial'
import Campus from '../../PageComponents/HomescreenComponents/Campus'
import Infrastructure from '../../PageComponents/HomescreenComponents/Infrastructure'
import Ourgallary from '../../PageComponents/HomescreenComponents/Ourgallary'


const Homescreen = () => {
  return (
    <div className='overflow-x-hidden'>
        <Landing/>
        <Courses/>
      
        <Awards/>
         <Campus/>
         <Infrastructure/>
         <Ourgallary/>
        <Testimonial/>
        
    </div>
  )
}

export default Homescreen