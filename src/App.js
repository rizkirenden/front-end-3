import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./landingpage/index";
import LoginPage from "./login/index";
import RegisterPage from "./register/index";
import MovieAdmin from "./admin/MovieAdmin";
import DaftarSaya from "./daftarsaya/index";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin/movies" element={<MovieAdmin />} />
        <Route path="/daftarsaya/" element={<DaftarSaya />} />
      </Routes>
    </Router>
  );
}

export default App;
