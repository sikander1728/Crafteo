import React from 'react'
import '../../styles/home.css'
import '../NewPost/NewPost.css'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createNewPost } from '../../Actions/Post'
import uploadImage from "../../images/upload-image.png"
import { useEffect } from 'react'
import { errorToast } from '../../Toasts/error'
import { successToast } from '../../Toasts/success'
import { ToastContainer } from 'react-toastify'
import { LoadUser } from '../../Actions/User'
import { useNavigate } from 'react-router-dom'
import Loading from '../Loading/Loading'

const NewPost = () => {
   const [image, setImage] = useState(null)
   const [caption, setCaption] = useState("")
   const { loading, posterror, postsuccess } = useSelector((state) => state.post)
   const { user } = useSelector((state) => state.user)
   const dispatch = useDispatch();
   const navigate = useNavigate()

   useEffect(() => {
      if (posterror) {
         errorToast(posterror)
         setTimeout(() => {
            dispatch({
               type: "clearError"
            })
         }, 1000);
      }
      if (postsuccess) {
         successToast(postsuccess)
         setTimeout(() => {
            dispatch({
               type: "clearSuccess"
            })
         }, 1000);
      }

   }, [dispatch, posterror, postsuccess])

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

   const submithandler = async (e) => {
      e.preventDefault();
      console.log(caption)
      await dispatch(createNewPost(caption, image))
      dispatch(LoadUser())
      navigate(`/${user?.username}`)
   }

   return (
      <div className="App">
         <ToastContainer />
         <div className='main d-flex'>
            <div className='content-section'>
               <div className="create-new-post-section">
                  {
                     loading ? <Loading /> :
                        <>
                           <h2>Create New Post</h2>
                           {
                              image ?
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
                                    <div className="post-content-section ">
                                       <div className="post-caption pb-4">
                                          <textarea
                                             type="text"
                                             rows={10}
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
                                 :
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
                        </>
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewPost