import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import LayoutMain from "./layouts/layout-main.tsx";
import GeneralPage from "./pages/general-page.tsx";
import ProductCategoryPage from './pages/product-category-page.tsx';
import ProductPricePage from "./pages/product-price-page.tsx";
import KitchenPage from "./pages/kitchen-page.tsx";
import SalesPage from "./pages/sales-page.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<LayoutMain />}>
              <Route path="/" element={<GeneralPage />} />
              <Route path="/product-category" element={<ProductCategoryPage />} />
              <Route path="/product-price" element={<ProductPricePage />} />
          </Route>
          <Route path="/kitchen" element={<KitchenPage />} />
          <Route path="/sales" element={<SalesPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
