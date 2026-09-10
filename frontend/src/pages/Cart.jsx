import { useState } from "react";
import "./Cart.css";

function Cart({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalPrice,
  onContinueShopping,
  onCheckout,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMessage, setCouponMessage] = useState("");

  // Apply Coupon
  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "SHOP10") {
      const discountAmount = totalPrice * 0.10;

      setDiscount(discountAmount);
      setCouponMessage("Coupon applied successfully! 🎉");
    } else {
      setDiscount(0);
      setCouponMessage("Invalid coupon code ❌");
    }
  };

  // Final Total
  const finalTotal = totalPrice - discount;

  return (
    <div className="cart-page">

      <h1>Your Shopping Cart 🛒</h1>

      {cart.length === 0 ? (

        /* Empty Cart */
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            You haven't added any products yet.
            Explore our products and find something
            you love!
          </p>

          <button
            className="empty-cart-button"
            onClick={onContinueShopping}
          >
            🛍️ Start Shopping
          </button>

        </div>

      ) : (

        <>

          {/* Cart Products */}
          <div className="cart-products">

            {cart.map((item) => (

              <div
                className="cart-product"
                key={item.id}
              >

                {/* Product Image */}
                <div className="cart-product-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>

                {/* Product Information */}
                <div className="cart-product-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p className="cart-category">
                    {item.category}
                  </p>

                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <p className="cart-item-total">
                    Item Total: ₹
                    {item.price * item.quantity}
                  </p>

                </div>

                {/* Cart Actions */}
                <div className="cart-actions">

                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-cart-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    🗑️ Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Coupon Section */}
          <div className="coupon-section">

            <h3>
              Have a Coupon? 🎟️
            </h3>

            <div className="coupon-input">

              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => {
                  setCouponCode(e.target.value);
                  setCouponMessage("");
                }}
              />

              <button onClick={applyCoupon}>
                Apply
              </button>

            </div>

            {couponMessage && (
              <p className="coupon-message">
                {couponMessage}
              </p>
            )}

            <p className="coupon-hint">
              Try: <strong>SHOP10</strong>
            </p>

          </div>

          {/* Cart Summary */}
          <div className="cart-summary">

            <div>

              <p className="cart-total-label">
                Subtotal
              </p>

              <h2>
                ₹{totalPrice}
              </h2>

              {discount > 0 && (
                <>
                  <p className="discount-label">
                    Discount: -₹{discount.toFixed(2)}
                  </p>

                  <p className="final-total-label">
                    Final Total
                  </p>

                  <h2>
                    ₹{finalTotal.toFixed(2)}
                  </h2>
                </>
              )}

            </div>

            <button
              className="checkout-button"
              onClick={onCheckout}
            >
              Proceed to Checkout →
            </button>

          </div>

        </>

      )}

    </div>
  );
}

export default Cart;