import Header from "@/Components/Header";
import { BrowserRouter } from "react-router-dom";
import { RoutesIndex } from "@/Routes/RoutesIndex";
import { AuthProvider,  } from "./Context/AuthContext";
import { CartProvider } from "./Context/CartContext";
import "./App.css";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Header />
            <RoutesIndex />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
