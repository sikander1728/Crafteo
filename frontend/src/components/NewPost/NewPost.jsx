import React from 'react'
import '../../styles/home.css'
import Navbar from '../Navbar/Navbar'
import Header from '../mobileNav/Header'
import BottomNav from '../mobileNav/BottomNav'
import '../NewPost/NewPost.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost } from '../../Actions/Post'
import uploadImage from "../../images/upload-image.png"
import { useEffect } from 'react'
import { errorToast } from '../../Toasts/error'
import { successToast } from '../../Toasts/success'
import { ToastContainer } from 'react-toastify'

const NewPost = () => {
   const [image, setImage] = useState(null)
   const [caption, setCaption] = useState("")
   const { loading, posterror, postsuccess } = useSelector((state) => state.post)
   const dispatch = useDispatch();

   useEffect(()=>{
      if(posterror){
         errorToast(posterror)
         setTimeout(() => {
            dispatch({
              type: "clearError"
            })
          }, 1000);
      }
      if(postsuccess){
         successToast(postsuccess)
         setTimeout(() => {
            dispatch({
              type: "clearSuccess"
            })
          }, 1000);
      }

   },[dispatch, posterror, postsuccess])

   const handleImageChange = (e) => {
      const file = e.target.files[0]
      const Reader = new FileReader();

      Reader.onload = () => {
         if (Reader.readyState === 2) {
            setImage(Reader.result)
         }
      }

      Reader.readAsDataURL(file);
   }

   const submithandler = (e) => {
      e.preventDefault();
      console.log(caption)
      dispatch(createNewPost(caption, image))
   }

   return (
      <div className="App">
         <ToastContainer/>
         <div className='main d-flex'>
            <Navbar />
            <Header />
            <div className='content-section'>
               <div className="create-new-post-section">
                  <h2>Create New Post</h2>
                  {
                     image ?
                        <>
                           <form onSubmit={submithandler} className='post-secondary-section d-flex pt-4'>
                              <div className="image-selector-section text-center">
                                 <div className="post-image pt-3 pb-3">
                                    <img className='post-display-image' src={image} alt="post" />
                                 </div>
                                 <div className="file-chosen pt-3 pb-3">
                                    <input type="file" className="custom-file-input" accept='image/*'
                                       onChange={handleImageChange} />
                                 </div>
                              </div>
                              <div className="post-content-section mb-5">
                                 <div className="post-caption pb-4">
                                    <textarea
                                       type="text"
                                       placeholder='Wtite a Caption...'
                                       value={caption}
                                       onChange={(e) => setCaption(e.target.value)}
                                    ></textarea>
                                 </div>
                                 <div className="post-button text-end">
                                    <button disabled={loading} type='submit'>Post</button>
                                 </div>
                              </div>
                           </form>
                        </> :
                        <div className='initial-post-section'>
                           <form className='text-center pt-5 pb-5'>
                              <div className="upload-image">
                                 <img src={uploadImage} alt="uploadImage" />
                              </div>
                              <div className="file-chosen pt-3 pb-3">
                                 <input type="file" className="custom-file-input" accept='image/*'
                                    onChange={handleImageChange} />
                              </div>
                           </form>
                        </div>
                  }
               </div>
            </div>
            <BottomNav />
         </div>
      </div>
   )
}

export default NewPost
