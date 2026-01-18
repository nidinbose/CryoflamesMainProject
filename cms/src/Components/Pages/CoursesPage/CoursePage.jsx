import React, {useEffect} from 'react'
import Courses from '../../PageComponents/HomescreenComponents/Courses'

const CoursePage = () => {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "smooth" });
}, []);

  return (
    <div>
        <Courses/>
    </div>
  )
}

export default CoursePage