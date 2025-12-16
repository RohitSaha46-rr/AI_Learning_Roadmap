import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserHome from "./pages/UserHome";
import RoadmapViewer from "./pages/RoadmapViewer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/userPage" element={<UserHome />} />
      <Route path="/roadmap/:id" element={<RoadmapViewer />} />
    </Routes>
  );
}

export default App;
