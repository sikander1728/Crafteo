import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SignIn from './pages/Signin';
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignIn/>}/>
        <Route exact path="/register" element={<Signup/>}/>
      </Routes>
    </Router>
  )
}

export default App;
