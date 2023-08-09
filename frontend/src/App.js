import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import SignIn from './pages/Signin';
import Signup from "./pages/Signup";
import NotFound from "./components/NotFound/NotFound";
import Home from "./pages/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadUser } from "./Actions/User";
import NewPost from "./components/NewPost/NewPost";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Edit Profile/EditProfile";
import SingleUserProfile from "./components/SingleUserProfile/SingleUserProfile";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/mobileNav/Header";
import BottomNav from "./components/mobileNav/BottomNav";
import SearchUser from "./components/SearchUser/SearchUser";
import RotateLoader from "react-spinners/RotateLoader";

function App() {
  const { isauthenticated, user, loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])
  return loading ? <div className="react-spinner" style={{height: '100vh'}}>
    <RotateLoader color='rgb(77, 181, 255)' />
  </div> : (
    <Router>
      {
        isauthenticated && <>
          <Navbar />
          <Header />
        </>
      }
      <Routes>
        <Route exact path="/" element={isauthenticated ? <Home /> : <SignIn />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/accounts/password/reset" element={<ForgotPassword />} />
        <Route exact path="/resetPassword/:id/:token" element={<ResetPassword />} />
        <Route exact path="/create-new-post" element={isauthenticated ? <NewPost /> : <SignIn />} />
        <Route exact path={`/${user?.username}`} element={isauthenticated ? <Profile /> : <SignIn />} />
        <Route exact path="/accounts/edit" element={isauthenticated ? <EditProfile /> : <SignIn />} />
        <Route exact path='/:username' element={isauthenticated ? <SingleUserProfile /> : <SignIn />} />
        <Route exact path="/search" element={isauthenticated ? <SearchUser /> : <SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {isauthenticated && <BottomNav />}
    </Router>
  )
}

export default App;
