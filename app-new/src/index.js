import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Home';
import Blog from './Component/blog/Blog';
import Detail from './Component/blog/Detail';
import Products from './Component/products/Products'
import Register from './Component/member/Register';
import Index from './Component/member/Index';
import Account from './Component/account/Account';
import Product_Detail from './Component/products/Product_Detail';
import My_product from './Component/account/My_Product';
import Add_product from './Component/account/Add_product';
import Edit_product from './Component/account/Edit_product';
import Cart from './Component/products/Cart';
import Wishlist from './Component/products/Wishlist'
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <Router>
        <Provider store={store}>
        <App>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path='/blog/list' element={<Blog />} />
                <Route path='/blog/detail/:id' element={<Detail />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Index />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/detail/:id' element={<Product_Detail />} />
                <Route path='/account' element={<Account />} />
                <Route path='/account/myproduct' element={<My_product />} />
                <Route path='/account/myproduct/addproduct' element={<Add_product />} />
                <Route path='/account/editproduct/:id' element={<Edit_product />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/wishlist' element={<Wishlist />} />
            </Routes>
        </App>
        </Provider>
    </Router>
</React.StrictMode> 
    
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();