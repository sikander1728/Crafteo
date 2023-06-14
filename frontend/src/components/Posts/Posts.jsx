import "../Posts/Posts.css"
import { Link } from "react-router-dom"
import { FiMoreHorizontal } from 'react-icons/fi'
import { FaRegCommentDots } from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useEffect, useState } from "react"
import Popup from "../Popup/Popup"
import { useDispatch, useSelector } from "react-redux"
import { getPostofFollowing, likeandUnlike } from "../../Actions/Post"

const Posts = ({
   postId, caption, postImage, likes = [], comments = [],
   ownerImage, ownerName, ownerId,
   isAccount = false
}) => {

   const [liked, setLiked] = useState(false)
   const [isPopupOpen, setIsPopupOpen] = useState(false);
   const dispatch = useDispatch()
   const {user} = useSelector((state)=> state.user)

   const likehandler = async () => {
      setLiked(!liked)
      await dispatch(likeandUnlike(postId))
      dispatch(getPostofFollowing())
   }
   const handleIconClick = () => {
      setIsPopupOpen(true);
   };

   const handleClosePopup = () => {
      setIsPopupOpen(false);
   };

   useEffect(()=>{
      likes.forEach((item)=>{
         if(item._id === user._id){
            setLiked(true)
         }
      })
   },[likes, user._id])

   const Items = [
      {
         label: 'Update Caption',
      },
      {
         label: 'Delete Post',
      }
   ]

   return (
      <>
         <div className="post-section">
            <div className="post-header d-flex">
               <Link to={`/username`} className="d-flex align-items-center w-75">
                  <div className='avatar' style=
                     {{
                        backgroundImage: `url(${ownerImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                     }} >
                  </div>
                  <h5 className="ps-3 pt-2">{ownerName}</h5>
               </Link>
               <div className="more w-25 d-flex justify-content-end align-items-center">
                  {
                     isAccount ? <FiMoreHorizontal onClick={handleIconClick} /> : null
                  }
               </div>
            </div>
            <div className="post-image mt-2">
               <img src={postImage} alt="post-img" />
            </div>
            <div className="like-comments-icons mt-3">
               <span onClick={likehandler}>
                  {
                     liked ? <BsHeartFill style={{ color: 'red' }} /> : <BsHeart />
                  }
               </span>
               <FaRegCommentDots className="ms-4" />
            </div>
            <div className="likes-number mt-3">
               <h6>{likes.length} likes</h6>
            </div>
            <div className="post-caption">
               <p>
                  {caption}
               </p>
            </div>
         </div>
         {isPopupOpen && (
            <Popup onClose={handleClosePopup} Items={Items} />
         )}
      </>
   )
}

export default Posts
