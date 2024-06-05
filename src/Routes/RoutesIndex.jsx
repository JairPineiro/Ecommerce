import { Route, Routes } from "react-router-dom";
import { Home, Dashboard, Login, Secret, Signup, Product } from '@/Pages'
import { useAuthContext } from "../Hook/useAuthContext";

export const RoutesIndex = () => {
  const { isAuth } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={isAuth ? <Dashboard /> : <Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/secret" element={ isAuth ? <Secret/> : <Login/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/product/:id" element={<Product/>} />
    </Routes>
  );
};
