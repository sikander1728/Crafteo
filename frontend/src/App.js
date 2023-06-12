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

function App() {
  const { isauthenticated , user} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(LoadUser())
    
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isauthenticated ? <Home /> : <SignIn />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/accounts/password/reset" element={<ForgotPassword />} />
        <Route exact path="/resetPassword/:id/:token" element={<ResetPassword />} />
        <Route exact path="/create-new-post" element={isauthenticated ? <NewPost/> : <SignIn/>}/>
        <Route exact path={`/${user?.username}`} element={isauthenticated ? <Profile/> : <SignIn/>} />
        <Route exact path="/accounts/edit" element={ isauthenticated? <EditProfile/> : <SignIn/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
