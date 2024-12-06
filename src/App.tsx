import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import LayoutMain from "./layouts/layout-main.tsx";
import GeneralPage from "./pages/general-page.tsx";
import ProductCategoryPage from './pages/product-category-page.tsx';
import ProductPricePage from "./pages/product-price-page.tsx";
import KitchenPage from "./pages/kitchen-page.tsx";
import SalesPage from "./pages/sales-page.tsx";
import OrderPage from "./pages/order-page.tsx";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginPage from "./pages/login-page.tsx";
import AccountManagementPage from "./pages/account-management-page.tsx";
import ReportSalePage from "./pages/report-sale-page.tsx";
import ReportProductPage from "./pages/report-product-page.tsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/protected-route.tsx";

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route element={<ProtectedRoute />}>
                  <Route element={<LayoutMain />}>
                      <Route path="/" element={<GeneralPage />} />
                      <Route path="/product-category" element={<ProductCategoryPage />} />
                      <Route path="/product-price" element={<ProductPricePage />} />
                      <Route path={"/orders"} element={<OrderPage />} />
                      <Route path={"/account-management"} element={<AccountManagementPage />} />
                      <Route path={"/report-sale"} element={<ReportSalePage/>} />
                      <Route path={"/report-product"} element={<ReportProductPage/>} />
                  </Route>
                  <Route path="/kitchen" element={<KitchenPage />} />
                  <Route path="/sales" element={<SalesPage />}/>
              </Route>
          </Routes>
        </BrowserRouter>
          <ToastContainer position="bottom-right"/>
      </LocalizationProvider>
  )
}

export default App
