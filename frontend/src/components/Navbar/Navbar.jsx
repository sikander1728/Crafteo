import '../Navbar/Navbar.css'
import { AiFillHome, AiOutlineSearch, AiOutlineHeart } from 'react-icons/ai'
import { HiShoppingCart } from 'react-icons/hi'
import Avatar from '../Avatar/Avatar'
import Dropup from '../Dropup/Dropup'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar'>
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
          <li>
            <AiOutlineSearch className='menu-icon mt-auto mb-auto' />
            <span className='menu-list'>Search</span>
          </li>
          <li>
            <HiShoppingCart className='menu-icon mt-auto mb-auto' />
            <span className='menu-list'>Shop</span>
          </li>
          <li>
            <AiOutlineHeart className='menu-icon mt-auto mb-auto' />
            <span className='menu-list'>Notification</span>
          </li>
        </ul>
      </div>
      <div className='profile'>
        <div className='profile-dropdown'>
          <Avatar />
          <Dropup />
        </div>
      </div>
    </div>
  )
}

export default Navbar
