import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/User';
import AllUsers from '../components/AllUsers/AllUsers';
import BottomNav from '../components/mobileNav/BottomNav';
import Header from '../components/mobileNav/Header';
import Navbar from '../components/Navbar/Navbar';
import '../styles/home.css'
import Defaultavatar from "../images/user-default-avatar.png"
import Posts from '../components/Posts/Posts';
import NoPost from '../images/no-photo.png'
import Loading from '../components/Loading/Loading'
import { getPostofFollowing } from '../Actions/Post';

const Home = () => {
    const { users } = useSelector((state) => state.allUsers)
    const { posts, loading } = useSelector((state) => state.postoffollowing)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getPostofFollowing())
    }, [dispatch])

    return (
        <div className="App">
            <div className='main d-flex'>
                <Navbar />
                <Header />
                <div className='content-section d-flex'>
                    <div className="posts-section">
                        {
                            loading ? <Loading /> :
                                posts && posts.length > 0 ? posts.map((post) => {
                                    return <Posts
                                        key={post._id} postId={post._id}
                                        caption={post.caption} postImage={post.image.url}
                                        ownerName={post.owner.username} ownerImage={post.owner.avatar ? post.owner.avatar.url : Defaultavatar}
                                        ownerId={post.owner._id} likes={post.likes} comments={post.comments} />
                                }) : <div className='no-post-section display-grid place-items-center'>
                                    <div className='text-center'>
                                        <img src={NoPost} alt="No post yet" />
                                        <h4 className='pt-3'>No Post Yet</h4>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className="suggested-users-section">
                        {
                            users && users.length > 0 ? users.map((user) => {
                                return <AllUsers key={user._id} userAvatar={user?.avatar ? user.avatar.url : Defaultavatar}
                                    username={user.username} />
                            }) : <h4>No Users Yet</h4>
                        }
                    </div>
                </div>
                <BottomNav />
            </div>
        </div>
    )
}

export default Home