import React from 'react'
import { Link } from 'react-router-dom'
import errorImage from '../../images/404.png'
import '../NotFound/NotFound.css'

const NotFound = () => {
   return (
      <>
         <div className="container">
            <div className="row">
               <div className="col text-center error-image-box">
                  <img src={errorImage} alt="404 page not found" />
                  <div className='mt-4'>
                     <h2>UH OH! You're lost.</h2>
                  </div>
                  <div className='d-flex justify-content-center'>
                     <p className='w-50'>The page you are looking for does not exist.
                        How you got here is a mystery.
                        But you can click the button below to go back to the homepage.
                     </p>
                  </div>
                  <div className='redirect-home-button'>
                     <Link to='/'>
                        <button className="btn rounded-5 ">Back to Home</button>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default NotFound
