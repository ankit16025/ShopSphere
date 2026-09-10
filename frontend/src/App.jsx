import { useEffect, useState } from "react";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Wishlist from "./pages/Wishlist";
import Orders from "./pages/Orders";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("shopsphere-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const [showLogin, setShowLogin] = useState(false);

  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem("shopsphere-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem(
      "shopsphere-wishlist"
    );

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // =========================
  // SAVE CART
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-cart",
      JSON.stringify(cart)
    );
  }, [cart]);

  // =========================
  // SAVE WISHLIST
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // =========================
  // SAVE ORDERS
  // =========================

  useEffect(() => {
    localStorage.setItem(
      "shopsphere-orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  // =========================
  // INCREASE QUANTITY
  // =========================

  const increaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // =========================
  // DECREASE QUANTITY
  // =========================

  const decreaseQuantity = (id) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // =========================
  // REMOVE FROM CART
  // =========================

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  // =========================
  // TOTAL PRICE
  // =========================

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // =========================
  // TOTAL ITEMS
  // =========================

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // =========================
  // GO HOME
  // =========================

  const goHome = () => {
    setSelectedProduct(null);
    setSelectedCategory("All");
    setSearchTerm("");

    setShowCart(false);
    setShowWishlist(false);
    setShowOrders(false);
    setShowCheckout(false);
    setShowLogin(false);

    setOrderPlaced(false);

    // Go to top of Home page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // CATEGORY CLICK
  // =========================

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct(null);

    setShowCart(false);
    setShowWishlist(false);
    setShowOrders(false);
    setShowCheckout(false);
    setShowLogin(false);

    setOrderPlaced(false);
  };

  // =========================
  // OPEN CART
  // =========================

  const openCart = () => {
    setSelectedProduct(null);

    setShowCart(true);
    setShowWishlist(false);
    setShowOrders(false);
    setShowCheckout(false);
    setShowLogin(false);

    setOrderPlaced(false);
  };

  // =========================
  // OPEN WISHLIST
  // =========================

  const openWishlist = () => {
    setSelectedProduct(null);

    setShowWishlist(true);
    setShowCart(false);
    setShowOrders(false);
    setShowCheckout(false);
    setShowLogin(false);

    setOrderPlaced(false);
  };

  // =========================
  // OPEN ORDERS
  // =========================

  const openOrders = () => {
    setSelectedProduct(null);

    setShowOrders(true);
    setShowCart(false);
    setShowWishlist(false);
    setShowCheckout(false);
    setShowLogin(false);

    setOrderPlaced(false);
  };

  // =========================
  // OPEN CHECKOUT
  // =========================

  const openCheckout = () => {
    setSelectedProduct(null);

    setShowCheckout(true);
    setShowCart(false);
    setShowWishlist(false);
    setShowOrders(false);
    setShowLogin(false);

    setOrderPlaced(false);
  };

  // =========================
  // OPEN LOGIN
  // =========================

  const openLogin = () => {
    setShowLogin(true);
    setSelectedProduct(null);

    setShowCart(false);
    setShowWishlist(false);
    setShowOrders(false);
    setShowCheckout(false);

    setOrderPlaced(false);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    setLoggedInUser(null);

    goHome();

    alert("Logged out successfully!");
  };

  // =========================
  // BACK TO CART
  // =========================

  const backToCart = () => {
    setShowCheckout(false);
    setShowCart(true);
    setShowWishlist(false);
    setShowOrders(false);
    setShowLogin(false);
    setSelectedProduct(null);
    setOrderPlaced(false);
  };

  // =========================
  // PLACE ORDER
  // =========================

  const handlePlaceOrder = (
    paymentMethod,
    deliveryAddress
  ) => {
    const newOrder = {
      orderId: "SS" + Date.now(),
      totalItems: totalItems,
      totalPrice: totalPrice,
      paymentMethod: paymentMethod,
      orderDate:
        new Date().toLocaleDateString(),
      deliveryDate: "3-7 Days",
      items: cart,
      address: deliveryAddress,
    };

    setOrders((previousOrders) => [
      newOrder,
      ...previousOrders,
    ]);

    setOrderDetails(newOrder);

    setCart([]);

    setShowCheckout(false);
    setShowCart(false);
    setOrderPlaced(true);
  };

  // =========================
  // BUY NOW
  // =========================

  const buyNow = (product, quantity) => {
    setCart((previousCart) => {
      const existingProduct =
        previousCart.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return previousCart.map(
          (item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity:
                    item.quantity +
                    quantity,
                }
              : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: quantity,
        },
      ];
    });

    setSelectedProduct(null);

    setShowCart(false);
    setShowWishlist(false);
    setShowOrders(false);
    setShowCheckout(true);
    setOrderPlaced(false);
    setShowLogin(false);
  };

  return (
    <div>

      {/* =========================
          NAVBAR
      ========================= */}

      <Navbar
        cart={cart}
        wishlist={wishlist}
        onHomeClick={goHome}
        onCategoryClick={
          handleCategoryClick
        }
        onCartClick={openCart}
        onWishlistClick={
          openWishlist
        }
        onOrdersClick={openOrders}
        onLoginClick={openLogin}
        searchTerm={searchTerm}
        setSearchTerm={
          setSearchTerm
        }
        loggedInUser={loggedInUser}
        onLogout={handleLogout}
      />

      {/* =========================
          ORDER SUCCESS
      ========================= */}

      {orderPlaced ? (

        <div className="order-success">

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h1>
              Order Placed Successfully! 🎉
            </h1>

            <p>
              Thank you for shopping with
              ShopSphere.
            </p>

            {orderDetails && (

              <div className="success-details">

                <p>
                  <strong>
                    Order ID:
                  </strong>{" "}
                  {orderDetails.orderId}
                </p>

                <p>
                  <strong>
                    Total Items:
                  </strong>{" "}
                  {orderDetails.totalItems}
                </p>

                <p>
                  <strong>
                    Total Amount:
                  </strong>{" "}
                  ₹{orderDetails.totalPrice}
                </p>

                <p>
                  <strong>
                    Payment:
                  </strong>{" "}
                  {orderDetails.paymentMethod}
                </p>

                <p>
                  <strong>
                    Estimated Delivery:
                  </strong>{" "}
                  {orderDetails.deliveryDate}
                </p>

              </div>

            )}

            <button onClick={goHome}>
              Continue Shopping 🛍️
            </button>

          </div>

        </div>

      ) : showLogin ? (

        /* =========================
           LOGIN
        ========================= */

        <Login
          setLoggedInUser={
            setLoggedInUser
          }
          onBackHome={goHome}
        />

      ) : showCheckout ? (

        /* =========================
           CHECKOUT
        ========================= */

        <Checkout
          cart={cart}
          totalPrice={totalPrice}
          onPlaceOrder={
            handlePlaceOrder
          }
          onBackToCart={
            backToCart
          }
        />

      ) : showOrders ? (

        /* =========================
           ORDERS
        ========================= */

        <Orders
          orders={orders}
          onContinueShopping={
            goHome
          }
        />

      ) : showWishlist ? (

        /* =========================
           WISHLIST
        ========================= */

        <Wishlist
          wishlist={wishlist}
          setWishlist={setWishlist}
          setCart={setCart}
          setSelectedProduct={
            setSelectedProduct
          }
          onContinueShopping={
            goHome
          }
        />

      ) : showCart ? (

        /* =========================
           CART
        ========================= */

        <Cart
          cart={cart}
          totalPrice={totalPrice}
          increaseQuantity={
            increaseQuantity
          }
          decreaseQuantity={
            decreaseQuantity
          }
          removeFromCart={
            removeFromCart
          }
          onCheckout={openCheckout}
          onContinueShopping={
            goHome
          }
        />

      ) : selectedProduct ? (

        /* =========================
           PRODUCT DETAILS
        ========================= */

        <ProductDetails
          product={selectedProduct}
          setCart={setCart}
          setSelectedProduct={
            setSelectedProduct
          }
          wishlist={wishlist}
          setWishlist={setWishlist}
          onBuyNow={buyNow}
        />

      ) : (

        /* =========================
           HOME + PRODUCTS
        ========================= */

        <>
          <Home
            onShopNow={() =>
              handleCategoryClick("All")
            }
            onCategoryClick={
              handleCategoryClick
            }
            setSelectedProduct={
              setSelectedProduct
            }
          />

          <Products
            selectedCategory={
              selectedCategory
            }
            searchTerm={searchTerm}
            setSelectedProduct={
              setSelectedProduct
            }
            cart={cart}
            setCart={setCart}
            wishlist={wishlist}
            setWishlist={setWishlist}
          />
        </>

      )}

      {/* =========================
          FOOTER
      ========================= */}

      <Footer
        onHomeClick={goHome}
        onProductsClick={() =>
          handleCategoryClick("All")
        }
        onWishlistClick={
          openWishlist
        }
        onOrdersClick={
          openOrders
        }
        onCategoryClick={
          handleCategoryClick
        }
      />

    </div>
  );
}

export default App;
