import { useEffect, useState, useCallback } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import AllUsers from '../AllUsers/AllUsers'
import '../SinglePost/SinglePost.css'
import { likeandUnlike } from "../../Actions/Post"
import { FaRegCommentDots } from 'react-icons/fa'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'

const SinglePost = ({ onclose, post }) => {
   const [liked, setLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(post.likes.length);
   const { user } = useSelector((state) => state.user)
   const dispatch = useDispatch();

   const checkLikedByCurrentUser = useCallback(() => {
      return post.likes.some((item) => item._id === user._id);
   }, [post.likes, user._id]);

   useEffect(() => {
      const likedByCurrentUser = checkLikedByCurrentUser();
      setLiked(likedByCurrentUser);
   }, [post.likes, user._id, checkLikedByCurrentUser]);

   const likehandler = () => {
      if (liked) {
         setLikeCount((prevCount) => prevCount - 1);
      } else {
         setLikeCount((prevCount) => prevCount + 1);
      }
      setLiked((prevLiked) => !prevLiked);
      dispatch(likeandUnlike(post._id));
   };

   return (
      <div className="singlepost-overlay">
         <div className="singlepost-content d-flex">
            <div className="single-post d-flex w-100">
               <div className="singlepost-image"
                  style={{ backgroundImage: `url(${post?.image?.url})` }}></div>
               <div className="singlepost-body">
                  <AiOutlineClose onClick={onclose} />
                  <AllUsers userAvatar={post?.owner.avatar?.url} username={post.owner.username} />
                  <div className="caption">
                     <p>{post.caption}</p>
                  </div>
                  <div className="like-comment-section">
                     <div className="like-comments-icons text-start text-black">
                        <span onClick={likehandler}>
                           {
                              liked ? <BsHeartFill style={{ color: 'red' }} /> : <BsHeart />
                           }
                        </span>
                        <FaRegCommentDots className="ms-4" />
                     </div>
                     <div className="likes-number text-start pt-3 text-black">
                        <h6 style={{ cursor: 'pointer' }}>{likeCount} likes</h6>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SinglePost
