import { useEffect } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  Home,
  Contacto,
  ProductoDetail,
  Success,
  Failure,
  Pending,
} from "./view";
import { NavBar } from "./components/NavBar";
import { Footer } from "./components/Footer";
import { CartProvider } from "./context/cartContext";
import { Cart } from "./view/Cart/Cart";
import PanelAdmin from "./view/AdminPanel/PanelAdmin";
import Login from "./view/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ProductosView from "./view/Productos/ProductosView";
import RemerasView from "./view/Productos/RemerasView";
import HoddiesView from "./view/Productos/HoddiesView";
import PandShortsView from "./view/Productos/PandShorts";

// =========================================================================
// FIX: Componente para forzar el scroll al inicio en cada cambio de ruta
// =========================================================================
const ScrollToTop = () => {
  // useLocation() rastrea el cambio en la URL
  const { pathname } = useLocation();

  useEffect(() => {
    // Cuando pathname (la ruta) cambia, movemos el scroll a la coordenada (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]);

  // Este componente no renderiza nada, solo maneja el efecto secundario.
  return null;
};
// =========================================================================

export const AppRouter = () => {
  return (
    <BrowserRouter>
      {/* PASO 2: Colocamos el componente ScrollToTop dentro del BrowserRouter.
        Se ejecutará cada vez que la ruta cambie.
      */}
      <ScrollToTop />

      <CartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/productos" element={<ProductosView />} />
          <Route path="/productos/remeras" element={<RemerasView />} />
          <Route path="/productos/hoodies" element={<HoddiesView />} />
          <Route path="/productos/pants-shorts" element={<PandShortsView />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/productos/:id" element={<ProductoDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/failure" element={<Failure />} />
          <Route path="/pending" element={<Pending />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <PanelAdmin />
              </ProtectedRoute>
            }
          />

          {/* 👤 Login */}
          <Route path="/login" element={<Login />} />

          {/* fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
};
