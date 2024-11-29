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

function App() {
  return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
              <Route element={<LayoutMain />}>
                  <Route path="/" element={<GeneralPage />} />
                  <Route path="/product-category" element={<ProductCategoryPage />} />
                  <Route path="/product-price" element={<ProductPricePage />} />
                  <Route path={"/orders"} element={<OrderPage />} />
              </Route>
              <Route path="/kitchen" element={<KitchenPage />} />
              <Route path="/sales" element={<SalesPage />}/>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
  )
}

export default App
