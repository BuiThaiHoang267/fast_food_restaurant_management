import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css'
import Layout_main from "./layouts/layout-main.tsx";
import GeneralPage from "./pages/general-page.tsx";
import ProductCategoryPage from './pages/product-category-page.tsx';
import ProductPricePage from "./pages/product-price-page.tsx";

function App() {
  return (
    <BrowserRouter>
      <Layout_main>
          <Routes>
              <Route path="/" element={<GeneralPage />} />
              <Route path="/product-category" element={<ProductCategoryPage />} />
              <Route path="/product-price" element={<ProductPricePage />} />
          </Routes>
      </Layout_main>
    </BrowserRouter>
  )
}

export default App
