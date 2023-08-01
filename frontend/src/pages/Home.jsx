import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../Actions/User';
import AllUsers from '../components/AllUsers/AllUsers';
import '../styles/home.css'
import Defaultavatar from "../images/user-default-avatar.png"
import Posts from '../components/Posts/Posts';
import NoPost from '../images/no-photo.png'
import { getPostofFollowing } from '../Actions/Post';
import { errorToast } from '../Toasts/error';
import { successToast } from '../Toasts/success';
import { ToastContainer } from 'react-toastify';
import RotateLoader from 'react-spinners/RotateLoader'

const Home = () => {
    const { users, message, iserror, loading: userLoading } = useSelector((state) => state.allUsers)
    const { posts, loading } = useSelector((state) => state.postoffollowing)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllUsers())
        dispatch(getPostofFollowing())

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
    }, [dispatch, iserror, message])

    return (
        <div className="App">
            <ToastContainer />
            <div className='main d-flex'>
                <div className='content-section profile-content d-flex'>
                    {
                        loading || userLoading ?
                            <div className="react-spinner">
                                <RotateLoader color='rgb(77, 181, 255)' />
                            </div> :
                            <>
                                <div className="posts-section">
                                    {
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
                                                username={user.username} userId={user._id} />
                                        }) : <h4>No More User To Follow</h4>
                                    }
                                </div>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Home