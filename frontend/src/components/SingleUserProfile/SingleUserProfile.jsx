import "../../styles/home.css"
import "../Profile/Profile.css"
import DefaultUser from "../../images/user-default-avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import '../SingleUserProfile/SingleUserProfile.css'
import { useEffect } from "react"
import { getSingleProfile } from "../../Actions/User"
import { useParams } from "react-router-dom"
// import Settings from "../../images/settings.png"
// import { Link, useNavigate } from 'react-router-dom'
// import { useState } from 'react'
// import PostCards from "../PostCards/PostCards"
// import RotateLoader from "react-spinners/RotateLoader"

const SingleUserProfile = () => {
  const {users} = useSelector((state)=> state.singleUser)
  const params = useParams();
  // const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const { posts, loading } = useSelector((state) => state.myPosts)
  // const [isPostOpen, setIsPostOpen] = useState(false);
  // const [selectedPost, setSelectedPost] = useState(null);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(()=>{
    dispatch(getSingleProfile(params.username))
  })

  return (
    <div className="App">
      <div className='main d-flex'>
        <div className='content-section'>
          <div className="user-info d-flex">
            <div className="avatar-section text-center">
              {
                users?.avatar ?
                    <div className='d-flex justify-content-center'>
                      <div className="avatar-background" style={{ backgroundImage: `url(${users?.user.avatar.url})` }}></div>
                    </div>
                   :
                    <img className='user-profile-avatar' src={DefaultUser} alt="" />
              }
            </div>
            <div className="user-detail-section single-user">
              <div className="title-edit-profile-row d-flex pt-2 pb-2">
                <h3>{users?.user.username}</h3>
                {/* <Link to="/accounts/edit">
                  <button className='ms-4 edit-profile-button'>Edit Profile</button>
                </Link>
                <img className='settings-icon mt-1 ms-3' src={Settings}
                   alt="profil-setting-icon" /> */}
              </div>
              <div className="post-foolower-following-section d-flex pt-2">
                <h5>{users?.user.posts.length} <br /> posts</h5>
                <h5>{users?.user.followers.length} <br /> followers</h5>
                <h5>{users?.user.following.length} <br /> followings</h5>
              </div>
            </div>
          </div>
          <div className="mobile-post-following-section pb-2">
            <div className="post-foolower-following-section d-flex pt-2">
              <h5>{users?.user.posts.length} <br /> posts</h5>
              <h5>{users?.user.followers.length} <br /> followers</h5>
              <h5>{users?.user.following.length} <br /> followings</h5>
            </div>
          </div>
          <div className="myposts-section">
            {/* <div className="posts-cards">
              {
                loading ? (
                  <div className="react-spinner">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleUserProfile
