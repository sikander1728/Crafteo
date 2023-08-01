import React from 'react'
import '../PostCards/PostCards.css'

const PostCards = ({ post, openPost }) => {
   const handleImageClick = () => {
      openPost(post);
   };

   return (
      <div className="card"

         style={{ backgroundImage: `url(${post.image.url})` }} onClick={handleImageClick}>
         <div className="card-overlay"></div>
      </div>
   )
}

export default PostCards
