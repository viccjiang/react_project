import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard"; 
import AdminProducts from "./pages/admin/AdminProducts";
import AdminCoupons from "./pages/admin/AdminCoupons";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<Dashboard/>}>
          <Route path="products" element={<AdminProducts/>}></Route>
          <Route path="coupons" element={<AdminCoupons/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
