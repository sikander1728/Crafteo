import "../../styles/home.css"
import "../Profile/Profile.css"
import DefaultUser from "../../images/user-default-avatar.png"
import { useDispatch, useSelector } from 'react-redux'
import Settings from "../../images/settings.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popup from "../Popup/Popup"
import { deleteProfile, logoutUser } from "../../Actions/User"
import { ToastContainer } from "react-toastify"
import { useEffect } from "react"
import { getMyPosts } from "../../Actions/Post"
import PostCards from "../PostCards/PostCards"
import SinglePost from "../SinglePost/SinglePost"
import RotateLoader from "react-spinners/RotateLoader"

const Profile = () => {
   const { user } = useSelector((state) => state.user)
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const { posts, loading } = useSelector((state) => state.myPosts)
   const [isPostOpen, setIsPostOpen] = useState(false);
   const [selectedPost, setSelectedPost] = useState(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      dispatch(getMyPosts())
   }, [dispatch])

   const handleIconClick = () => {
      setIsPopupOpen(true);
   };

   const handleClosePopup = () => {
      setIsPopupOpen(false);
   };
   const logouthandler = async () => {
      await dispatch(logoutUser())
      navigate('/');
   }
   const deleteProfileHandler = async () => {
      await dispatch(deleteProfile())
      dispatch(logoutUser())
   }
   const handlePostOpen = (post) => {
      console.log(post)
      setSelectedPost(post)
      setIsPostOpen(true)
   }
   const handlePostClose = () => {
      setSelectedPost(null)
      setIsPostOpen(false)
   }
   const Items = [{
      label: 'Logout',
      onClick: logouthandler
   },
   {
      label: 'Delete My Profile',
      onClick: deleteProfileHandler
   },
   ]
   return (
      <>
         <ToastContainer />
         <div className="App">
            <div className='main d-flex'>
               <div className='content-section'>
                  <div className="user-info d-flex">
                     <div className="avatar-section text-center">
                        {
                           user?.avatar ?
                              <>
                                 <div className='d-flex justify-content-center'>
                                    <div className="avatar-background" style={{ backgroundImage: `url(${user?.avatar.url})` }}></div>
                                 </div>
                              </> :
                              <>
                                 <img className='user-profile-avatar' src={DefaultUser} alt="" />
                              </>
                        }
                     </div>
                     <div className="user-detail-section">
                        <div className="title-edit-profile-row d-flex pt-2 pb-2">
                           <h3>{user?.username}</h3>
                           <Link to="/accounts/edit">
                              <button className='ms-4 edit-profile-button'>Edit Profile</button>
                           </Link>
                           <img className='settings-icon mt-1 ms-3' src={Settings}
                              onClick={handleIconClick} alt="profil-setting-icon" />
                        </div>
                        <div className="post-foolower-following-section d-flex pt-2">
                           <h5>{user?.posts.length} <br /> posts</h5>
                           <h5>{user?.followers.length} <br /> followers</h5>
                           <h5>{user?.following.length} <br /> followings</h5>
                        </div>
                     </div>
                  </div>
                  <div className="mobile-post-following-section pb-2">
                     <div className="post-foolower-following-section d-flex pt-2">
                        <h5>{user?.posts.length} <br /> posts</h5>
                        <h5>{user?.followers.length} <br /> followers</h5>
                        <h5>{user?.following.length} <br /> followings</h5>
                     </div>
                  </div>
                  <div className="myposts-section">
                     <div className="posts-cards">
                        {
                           loading ? (
                              <div className="react-spinner post-loader">
                                 <RotateLoader color='rgb(77, 181, 255)' />
                              </div>
                           ) : (
                              posts?.length > 0 ? (
                                 posts.map((post) => (
                                    <PostCards key={post._id} post={post} openPost={handlePostOpen} />
                                 ))
                              ) : (
                                 <div className="text-center w-100">
                                    <h5>No Post Made Yet</h5>
                                 </div>
                              )
                           )
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {isPostOpen && (
            <SinglePost onclose={handlePostClose} post={selectedPost} />
         )}
         {isPopupOpen && (
            <Popup onClose={handleClosePopup} Items={Items} />
         )}
      </>
   )
}

export default Profile
