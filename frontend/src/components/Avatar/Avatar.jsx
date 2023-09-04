import { useSelector } from 'react-redux'
import '../Avatar/Avatar.css'
import Defaultavatar from "../../images/user-default-avatar.png"

const Avatar = () => {
  const {user} = useSelector((state)=> state.user)
  return (
    <div className='avatar' style=
    {{
        backgroundImage: `url(${user?.avatar? user.avatar.url : Defaultavatar})`, 
        backgroundPosition: 'center',
        backgroundSize: 'cover'
    }} >      
    </div>

  )
}

export default Avatar
