import { Routes, Route, useNavigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import DetailsForm from "./components/DetailsForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/submit" element={<DetailsForm />} />
    </Routes>
  );
}

export default App;
