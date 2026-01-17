import React from 'react'
import Landing from '../../PageComponents/HomescreenComponents/Landing'
import Navbar from '../../PageComponents/HomescreenComponents/Navbar'
import Courses from '../../PageComponents/HomescreenComponents/Courses'
import Awards from '../../PageComponents/HomescreenComponents/Awards'
import Testimonial from '../../PageComponents/HomescreenComponents/Testimonial'
import Campus from '../../PageComponents/HomescreenComponents/Campus'


const Homescreen = () => {
  return (
    <div>
        <Landing/>
        <Courses/>
      
        <Awards/>
         <Campus/>
        <Testimonial/>
        
    </div>
  )
}

export default Homescreen