import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Product.css";
import { baseURL } from "../services/Service";
import { Button } from "react-bootstrap";

function Product() {
  const [products, setProducts] = useState([]);
  const productURL =
    window.location.pathname === "/"
      ? `${baseURL}/products/gloves`
      : `${baseURL}/products/${window.location.pathname}`;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get(productURL)
      .then((response) => {
        setLoading(false);
        const { data } = response;
        data.forEach((obj) => (obj.availablity = null));
        setProducts(data);
      })
      .catch(Error);
  }, [productURL]);

  const getStockValue = (text) => {
    return text.match(/<INSTOCKVALUE>(.*?)<\/INSTOCKVALUE>/g).map((val) => {
      return val.replace(/<\/?INSTOCKVALUE>/g, "");
    });
  };

  const getAvailability = (product) => {
    //console.log()

    const productId = product.id;
    axios
      .get(`${baseURL}/availability/${product.manufacturer}`)
      .then((response) => {
        const { data } = response;

        const availableProduct = data.response.find(
          (prod) => prod.id === productId.toUpperCase()
        );

        const stockValue = availableProduct
          ? getStockValue(availableProduct["DATAPAYLOAD"])
          : "OUTOFSTOCK";
        console.log(stockValue, stockValue[0]);

        products.filter((product) => {
          if (product.id === productId) {
            product.availablity = stockValue[0];
          }
          return <div></div>;
        });

        setProducts([...products]);
      })
      .catch(Error);
    return null;
  };

  return (
    <>
      {loading ? (
        <div>
          {" "}
          <div className="loader"></div>
        </div>
      ) : (
        <div className="products">
          {products &&
            products.map((product) => {
              return (
                <div className="all-parent">
                  <div className="product card" key={product.id}>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-details">
                      <p>Price: {"€" + product.price}</p>
                      <p>Manufacturer: {product.manufacturer}</p>
                      <div>
                        <ul className="product-color" key={product.item}>
                          {product.color.map((item) => {
                            return (
                              <div
                                key={item}
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  background: item,
                                  float: "left",
                                  "border-radius": "50%",
                                  "margin-right": "8px",
                                  color: "#ffff",
                                }}
                              ></div>
                            );
                          })}
                        </ul>
                      </div>
                      {product.availablity ? (
                        product.availablity
                      ) : (
                        <Button
                          variant="primary"
                          onClick={() => getAvailability(product)}
                        >
                          Check Availability
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
}

export default Product;
