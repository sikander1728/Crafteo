import "../../styles/home.css"
import "../Profile/Profile.css"
import BottomNav from '../mobileNav/BottomNav'
import Header from '../mobileNav/Header'
import Navbar from '../Navbar/Navbar'
import DefaultUser from "../../images/user-default-avatar.png"
import { useDispatch, useSelector } from 'react-redux'
import Settings from "../../images/settings.png"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Popup from "../Popup/Popup"
import { logoutUser } from "../../Actions/User"
import { ToastContainer } from "react-toastify"

const Profile = () => {
   const { user } = useSelector((state) => state.user)
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const dispatch = useDispatch();
   const navigate = useNavigate()

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
   return (
      <>
         <ToastContainer />
         <div className="App">
            <div className='main d-flex'>
               <Navbar />
               <Header />
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
                           <h5>{user?.posts.length} <br/> posts</h5>
                           <h5>{user?.followers.length} <br/> followers</h5>
                           <h5>{user?.following.length} <br/> followings</h5>
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
               </div>
               <BottomNav />
            </div>
         </div>
         {isPopupOpen && (
            <Popup onClose={handleClosePopup} logout={logouthandler}
               logoutUser="Logout" deleteProfile="Delete My Profile" />
         )}
      </>
   )
}

export default Profile
