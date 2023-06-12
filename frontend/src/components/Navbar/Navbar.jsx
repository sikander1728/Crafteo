import '../Navbar/Navbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai'
import { HiShoppingCart } from 'react-icons/hi'
import { BiMessageSquareAdd } from 'react-icons/bi'
import Avatar from '../Avatar/Avatar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
  const {user} = useSelector((state)=> state.user)
  return (
    <div className={'desktop-navbar'}>
      <div className="brand_name position-absolute">
        <img src="/logo.png" alt="crafteo_logo" />
      </div>
      <div className='menu position-absolute'>
        <ul className='list-unstyled'>
          <li className='d-flex'>
            <Link to='/' className='text-light text-decoration-none'>
              <AiFillHome className='menu-icon mt-auto mb-auto' />
              <span className='menu-list'>Home</span>
            </Link>
          </li>
          <li className='d-flex'>
            <Link to='/create-new-post' className='text-light text-decoration-none'>
              <BiMessageSquareAdd className='menu-icon mt-auto mb-auto' />
              <span className='menu-list'>Create</span>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <AiOutlineSearch className='menu-icon mt-auto mb-auto' />
              <span className='menu-list'>Search</span>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <HiShoppingCart className='menu-icon mt-auto mb-auto' />
              <span className='menu-list'>Shop</span>
            </Link>
          </li>
          <li>
            <Link to='/' className='text-light text-decoration-none'>
              <AiOutlineHeart className='menu-icon mt-auto mb-auto' />
              <span className='menu-list'>Notification</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className='profile'>
        <div className='profile-dropdown'>
          <Link to={`/${user?.username}`} className='text-light text-decoration-none d-flex'>
            <Avatar />
            <div className='profile-heading menu-list'>
              <h5 className='m-auto'>Profile</h5>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar
