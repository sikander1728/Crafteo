import "../Posts/Posts.css"
import { Link } from "react-router-dom"
import { FaRegCommentDots } from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useEffect, useState, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {likeandUnlike } from "../../Actions/Post"
import Dialog from "../Dialog/Dialog"
import AllUser from '../AllUsers/AllUsers'

const Posts = ({
   postId, caption, postImage, likes = [], comments = [],
   ownerImage, ownerName,
}) => {

   const [liked, setLiked] = useState(false);
   const [isDialogOpen, setIsDialogOpen] = useState(false);
   const [likeCount, setLikeCount] = useState(likes.length);
   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.user)

   const checkLikedByCurrentUser = useCallback(() => {
      return likes.some((item) => item._id === user._id);
   }, [likes, user._id]);

   useEffect(() => {
      const likedByCurrentUser = checkLikedByCurrentUser();
      setLiked(likedByCurrentUser);
   }, [likes, user._id, checkLikedByCurrentUser]);
   
   const likehandler = () => {
      if (liked) {
         setLikeCount((prevCount) => prevCount - 1);

      } else {
         setLikeCount((prevCount) => prevCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);   
      dispatch(likeandUnlike(postId));
   };

   const handleOpenDialog = () => {
      setIsDialogOpen(true);
   };

   const handleCloseDialog = () => {
      setIsDialogOpen(false);
   };

   return (
      <>
         <div className="post-section">
            <div className="post-header d-flex">
               <Link to={`/${ownerName}`} className="d-flex align-items-center w-75">
                  <div className='avatar' style=
                     {{
                        backgroundImage: `url(${ownerImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover'
                     }} >
                  </div>
                  <h5 className="ps-3 pt-2">{ownerName}</h5>
               </Link>
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
               <FaRegCommentDots className="ms-4"  onClick={handleOpenDialog}/>
            </div>
            <div className="likes-number mt-3">
               <h6 style={{ cursor: 'pointer' }} onClick={handleOpenDialog}>{likeCount} likes</h6>
            </div>
            <div className="post-caption">
               <p>
                  {caption}
               </p>
            </div>
         </div>
         {isDialogOpen && (
            <Dialog onClose={handleCloseDialog} DialogTitle='Likes'>
               <AllUser />
            </Dialog>
         )}
      </>
   )
}

export default Posts
