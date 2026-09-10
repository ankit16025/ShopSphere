import "./Orders.css";

function Orders({ orders, onContinueShopping }) {
  return (
    <div className="orders-page">

      <h1>My Orders 📦</h1>

      {orders.length === 0 ? (

        /* Empty Orders */
        <div className="empty-orders">

          <div className="empty-orders-icon">
            📦
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
            Start shopping and your orders will
            appear here.
          </p>

          <button
            className="empty-orders-button"
            onClick={onContinueShopping}
          >
            🛍️ Start Shopping
          </button>

        </div>

      ) : (

        <div className="orders-container">

          {orders.map((order) => (

            <div
              className="order-card"
              key={order.orderId}
            >

              {/* Order Header */}

              <div className="order-header">

                <h2>
                  Order #{order.orderId}
                </h2>

                <span className="order-confirmed">
                  ✓ Confirmed
                </span>

              </div>

              {/* Order Basic Information */}

              <div className="order-info">

                <p>
                  📦 <strong>Total Items:</strong>{" "}
                  {order.totalItems}
                </p>

                <p>
                  💰 <strong>Total Amount:</strong>{" "}
                  ₹{order.totalPrice}
                </p>

                <p>
                  💳 <strong>Payment:</strong>{" "}
                  {order.paymentMethod}
                </p>

                <p>
                  📅 <strong>Order Date:</strong>{" "}
                  {order.orderDate}
                </p>

                <p>
                  🚚 <strong>Estimated Delivery:</strong>{" "}
                  {order.deliveryDate}
                </p>

              </div>

              {/* Ordered Products */}

              {order.items &&
                order.items.length > 0 && (

                  <div className="ordered-products">

                    <h3>
                      Ordered Products
                    </h3>

                    {order.items.map((item) => (

                      <div
                        className="ordered-product"
                        key={item.id}
                      >

                        <div className="ordered-product-image">

                          <img
                            src={item.image}
                            alt={item.name}
                          />

                        </div>

                        <div className="ordered-product-info">

                          <h4>
                            {item.name}
                          </h4>

                          <p>
                            Category: {item.category}
                          </p>

                          <p>
                            Quantity: {item.quantity}
                          </p>

                          <p>
                            Price: ₹{item.price}
                          </p>

                        </div>

                        <div className="ordered-product-total">
                          ₹{item.price * item.quantity}
                        </div>

                      </div>

                    ))}

                  </div>

                )}

              {/* Delivery Address */}

              {order.address && (

                <div className="delivery-address">

                  <h3>
                    📍 Delivery Address
                  </h3>

                  <p>
                    {order.address}
                  </p>

                </div>

              )}

              {/* Order Status */}

              <div className="order-status-section">

                <p>
                  🚚 <strong>Status:</strong>{" "}
                  Order Confirmed
                </p>

                <div className="order-progress">

                  <span className="active">
                    ✓ Order Placed
                  </span>

                  <span>
                    📦 Processing
                  </span>

                  <span>
                    🚚 Out for Delivery
                  </span>

                  <span>
                    🏠 Delivered
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Orders;