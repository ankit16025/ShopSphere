import { useState } from "react";
import "./Checkout.css";

function Checkout({
  cart,
  totalPrice,
  onBackToCart,
  onPlaceOrder,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = () => {
    const {
      name,
      phone,
      address,
      city,
      pincode,
    } = formData;

    // Check delivery details
    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      setError(
        "Please fill all delivery details."
      );
      return;
    }

    // Check phone
    if (!/^[0-9]{10}$/.test(phone)) {
      setError(
        "Please enter a valid 10-digit phone number."
      );
      return;
    }

    // Check pincode
    if (!/^[0-9]{6}$/.test(pincode)) {
      setError(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    // Check payment
    if (!paymentMethod) {
      setError(
        "Please select a payment method."
      );
      return;
    }

    // Complete delivery address
    const deliveryAddress =
      `${name}, ${address}, ${city} - ${pincode}`;

    // Send order information to App.jsx
    onPlaceOrder(
      paymentMethod,
      deliveryAddress
    );
  };

  return (
    <div className="checkout-page">

      <h1>Checkout 🛒</h1>

      <div className="checkout-container">

        {/* =========================
            DELIVERY FORM
        ========================= */}

        <div className="checkout-form">

          <h2>Delivery Details</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />

          {/* =========================
              PAYMENT
          ========================= */}

          <div className="payment-section">

            <h2>Payment Method</h2>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  paymentMethod ===
                  "Cash on Delivery"
                }
                onChange={(e) => {
                  setPaymentMethod(
                    e.target.value
                  );
                  setError("");
                }}
              />

              💵 Cash on Delivery

            </label>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  paymentMethod === "UPI"
                }
                onChange={(e) => {
                  setPaymentMethod(
                    e.target.value
                  );
                  setError("");
                }}
              />

              📱 UPI

            </label>

            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Card"
                checked={
                  paymentMethod === "Card"
                }
                onChange={(e) => {
                  setPaymentMethod(
                    e.target.value
                  );
                  setError("");
                }}
              />

              💳 Card

            </label>

          </div>

          {/* =========================
              ERROR
          ========================= */}

          {error && (
            <p className="checkout-error">
              {error}
            </p>
          )}

          {/* =========================
              PLACE ORDER
          ========================= */}

          <button
            type="button"
            onClick={handleSubmit}
          >
            Place Order
          </button>

          {/* =========================
              BACK TO CART
          ========================= */}

          <button
            type="button"
            className="back-to-cart"
            onClick={onBackToCart}
          >
            ← Back to Cart
          </button>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================= */}

        <div className="checkout-summary">

          <h2>Order Summary</h2>

          {cart.map((item) => (

            <div
              className="summary-item"
              key={item.id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹{item.price * item.quantity}
              </span>

            </div>

          ))}

          <hr />

          <h2>
            Total: ₹{totalPrice}
          </h2>

        </div>

      </div>

    </div>
  );
}

export default Checkout;