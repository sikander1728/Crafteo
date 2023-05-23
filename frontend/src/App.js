import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import SignIn from './pages/Signin';
import Signup from "./pages/Signup";
import NotFound from "./components/NotFound/NotFound";
import Home from "./pages/Home"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadUser } from "./Actions/User";

function App() {
  const { isauthenticated } = useSelector((state) => state.user)
  console.log("authenticated", isauthenticated)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(LoadUser())
  }, [dispatch])
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={isauthenticated ? <Home /> : <SignIn />} />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/accounts/password/reset" element={<ResetPassword />} />
        <Route exact path="/frogotPassword/:id/:token" element={<ForgotPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route exact path="/home" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App;
