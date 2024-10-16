import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import CreateSupplier from './components/CreateSupplier'; 
import UpdateSupplier from './components/UpdateSupplier'; 
import DeleteSupplier from './components/DeleteSupplier'; 
import SupplierList from './components/SupplierList'; 
import CreateCategory from './components/CreateCategory';
import UpdateCategory from './components/UpdateCategory';
import DeleteCategory from './components/DeleteCategory';
import CategoryList from './components/CategoryList';

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
      </Routes>
    </BrowserRouter>
  );
}
