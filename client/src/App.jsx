import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";

import CreateSupplier from './components/Suppliers/CreateSupplier'; 
import UpdateSupplier from './components/Suppliers/UpdateSupplier'; 
import DeleteSupplier from './components/Suppliers/DeleteSupplier'; 
import SupplierList from './components/Suppliers/SupplierList'; 

import CreateCategory from './components/Category/CreateCategory';
import UpdateCategory from './components/Category/UpdateCategory';
import DeleteCategory from './components/Category/DeleteCategory';
import CategoryList from './components/Category/CategoryList';

import CreateProduct from './components/Products/CreateProduct'; 
import UpdateProduct from './components/Products/UpdateProduct'; 
import DeleteProduct from './components/Products/DeleteProduct'; 
import ProductList from './components/Products/ProductList'; 

import CreateStores from "./components/Stores/CreateStores";
import UpdateStore from "./components/Stores/UpdateStores";
import DeleteStores from "./components/Stores/DeleteStores";
import StoreList from "./components/Stores/StoreList";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Supplier routes */}
        <Route path="/create-supplier" element={<CreateSupplier />} />
        <Route path="/update-supplier/:supplierId" element={<UpdateSupplier />} />
        <Route path="/delete-supplier/:id" element={<DeleteSupplier />} />
        <Route path="/suppliers" element={<SupplierList />} />
        
        {/* Category routes */}
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category/:categoryId" element={<UpdateCategory />} />
        <Route path="/delete-category/:id" element={<DeleteCategory />} /> 
        <Route path="/categories" element={<CategoryList />} /> 

        {/* Product routes */}
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/update-product/:productId" element={<UpdateProduct />} />
        <Route path="/delete-product/:productId" element={<DeleteProduct />} />
        <Route path="/products" element={<ProductList />} /> 
        

        {/* Stores routes */}
        <Route path="/create-stores" element={<CreateStores />} />
        <Route path="/update-stores/:storeId" element={<UpdateStore />} />
        <Route path="/delete-stores/:storeId" element={<DeleteStores />} />
        <Route path="/stores" element={<StoreList />} /> 
      </Routes>
    </BrowserRouter>
  );
}
