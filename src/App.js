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
    name: "Face Masks",
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
      <div className="sidebar-main">
        <div className="sidebar-cat">
          <Sidebar categories={categories} />
        </div>

        <div className="main-container">
          <Switch>
            <Route path="*" component={Product} />
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
