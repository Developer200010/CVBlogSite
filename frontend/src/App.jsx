import Topbar from "./components/topbar/Topbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Setting from "./pages/settings/Setting";
function App() {
  return (
    <>
    <Router>
    <Topbar/>
    <Routes>
    <Route path="/" element={<Homepage/>}/>
    <Route path="/posts" element={<Homepage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/post/:id" element={<Single/>}/>
    <Route path="/write" element={<Write/>}/>
    <Route path="/settings" element={<Setting/>}/>
    </Routes>
    </Router>
    </>
  );
}

export default App;
