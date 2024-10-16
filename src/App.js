import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import User from "./pages/User";
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="*" element={<Home />} />
        </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
