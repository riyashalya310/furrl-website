import { BrowserRouter,Switch,Route } from "react-router-dom/cjs/react-router-dom.min";
import "./App.css";
import LandingPage from "./components/LandingPage";
import ProductItem from "./components/ProductItem";
import { useState } from "react";
function App() {
  const [productsList,setProductsList]=useState([])

  const onChangeProductsList=(items)=>{
    setProductsList(items)
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route exact path='/products/:id' component={ProductItem}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
