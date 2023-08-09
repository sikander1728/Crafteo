import "../../styles/home.css"
import "../Profile/Profile.css"
import DefaultUser from "../../images/user-default-avatar.png"
import { useSelector, useDispatch } from 'react-redux'
import '../SingleUserProfile/SingleUserProfile.css'
import { useEffect, useState } from "react"
import { folloUnfollow, getSingleProfile } from "../../Actions/User"
import { useParams } from "react-router-dom"
import PostCards from "../PostCards/PostCards"
import RotateLoader from "react-spinners/RotateLoader"
import SinglePost from "../SinglePost/SinglePost"
import { getUserPosts } from "../../Actions/Post"
import { ToastContainer } from 'react-toastify';
import { errorToast } from "../../Toasts/error"
import { successToast } from "../../Toasts/success"

const SingleUserProfile = () => {
  const { users } = useSelector((state) => state.singleUser)
  const params = useParams();
  const { posts, loading } = useSelector((state) => state.userPosts)
  const { user: loggedInUser } = useSelector((state) => state.user)
  const {iserror, message} = useSelector((state)=> state.allUsers)
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [following, setFollowing] = useState(loggedInUser.following.includes(users?.user?._id))
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSingleProfile(params.username))
    dispatch(getUserPosts(params.username))

    if (iserror) {
      errorToast(iserror)
      setTimeout(() => {
          dispatch({
              type: "ClearError"
          })
      }, 1000);
  }
  if (message) {
      successToast(message)
      setTimeout(() => {
          dispatch({
              type: "ClearSuccess"
          })
      }, 1000);
  }
  }, [dispatch, params.username, iserror, message])

  const handlePostOpen = (post) => {
    setSelectedPost(post)
    setIsPostOpen(true)
  }
  const handlePostClose = () => {
    setSelectedPost(null)
    setIsPostOpen(false)
  }

  const followhandle = async (userId) => {
    await dispatch(folloUnfollow(userId));
    setFollowing(!following);
  }

  return (
    <div className="App">
      <ToastContainer/>
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
                {loggedInUser._id !== users?.user._id && (
                  <button className='ms-4 edit-profile-button' onClick={()=> followhandle(users?.user?._id)}>
                    {following ? 'Unfollow' : 'Follow'}
                  </button>
                )}
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
            <div className="posts-cards">
              {
                loading ? (
                  <div className="react-spinner post-loader">
                    <RotateLoader color='rgb(77, 181, 255)' />
                  </div>
                ) :
                  posts?.length > 0 ? (
                    posts.map((post) => (
                      <PostCards key={post._id} post={post} openPost={handlePostOpen} />
                    ))) : (
                    <div className="text-center w-100">
                      <h5>No Post Made Yet</h5>
                    </div>
                  )
              }
            </div>
          </div>
          {isPostOpen && (
            <SinglePost onclose={handlePostClose} post={selectedPost} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleUserProfile
