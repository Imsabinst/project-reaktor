import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { Switch, Route } from "react-router-dom";
import Product from "./components/products/Product";

const categories = [
  {
    name: "Gloves",
    path: "/gloves",
  },
  {
    name: "Facemasks",
    path: "/facemasks",
  },
  {
    name: "Beanies",
    path: "/beanies",
  },
];
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="sidebar-main container">
        <div className="row">
          <div className="sidebar-cat col-2">
            <Sidebar categories={categories} />
          </div>

          <div className="main-container col-10">
            <Switch>
              <Route path="*" component={Product} />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
