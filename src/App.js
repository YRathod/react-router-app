import React, { Component, Suspense } from "react";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
//import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";
import {Route, Switch, Redirect} from 'react-router-dom'
import lazyComponentLoader from './LazyLoader';
//const AsyncProductDetails = lazyComponentLoader(() => import('./components/productDetails'));
const AsyncProductDetails = React.lazy(() => import('./components/ProductDetails'));
class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
          <Route path="/products/:id" render={(props) => <Suspense fallback={<div>Loading...</div>}><AsyncProductDetails {...props}/></Suspense>}/> 
          <Route path="/products/" render={(props)=><Products sortBy="newest" {...props}></Products>}/> 
          <Route path="/posts/:year?/:month?" component={Posts}/> 
          <Route path="/admin" component={Dashboard}/> 
          <Redirect from="/messages" to="posts"/>
          <Route path="/not-found" component={NotFound}/> 
          <Route path="/" exact component={Home}/> 
          <Redirect to="not-found"/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
