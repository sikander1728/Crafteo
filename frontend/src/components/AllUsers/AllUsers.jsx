import React from 'react'
import "../AllUsers/Allusers.css"

const AllUsers = ({username, userAvatar}) => {
   // const {user} = useSelector((state)=> state.user)
   return (
      <div className='users d-flex align-items-center mb-3 '>
         <div className='avatar' style=
            {{
               backgroundImage: `url(${userAvatar})`,
               backgroundPosition: 'center',
               backgroundSize: 'cover'
            }} >
         </div>
         <div className="username ms-2">
            <h5>{username}</h5>
            <h6>Follow</h6>
         </div>
      </div>
   )
}

export default AllUsers
