
import { useState } from "react";
import "./ProductDetails.css";

function ProductDetails({
  product,
  setCart,
  setSelectedProduct,
  wishlist,
  setWishlist,
  onBuyNow,
}) {
  const [quantity, setQuantity] = useState(1);

  // Check if product is already in cart
  const [isInCart, setIsInCart] = useState(() => {
    const savedCart = localStorage.getItem("shopsphere-cart");

    if (!savedCart) return false;

    const cartItems = JSON.parse(savedCart);

    return cartItems.some(
      (item) => item.id === product.id
    );
  });

  if (!product) {
    return null;
  }

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const discount = product.discount || 10;

  const originalPrice =
    product.originalPrice ||
    Math.round(
      product.price / (1 - discount / 100)
    );

  const reviewCount = 100 + (product.id % 401);

  const stock = product.stock || 25;

  // =========================
  // ADD TO CART
  // =========================

  const addToCart = () => {
    if (stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    let cartUpdated = true;

    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        const newQuantity =
          existingProduct.quantity + quantity;

        if (newQuantity > stock) {
          alert(
            `Only ${stock} items are available.`
          );

          cartUpdated = false;

          return previousCart;
        }

        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: newQuantity,
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

    if (cartUpdated) {
      setIsInCart(true);
      alert(`${product.name} added to cart! 🛒`);
    }
  };

  // =========================
  // BUY NOW
  // =========================

  const buyNow = () => {
    if (stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    onBuyNow(product, quantity);
  };

  // =========================
  // WISHLIST
  // =========================

  const toggleWishlist = () => {
    setWishlist((previousWishlist) => {
      const alreadyExists = previousWishlist.some(
        (item) => item.id === product.id
      );

      if (alreadyExists) {
        return previousWishlist.filter(
          (item) => item.id !== product.id
        );
      }

      return [...previousWishlist, product];
    });
  };

  // =========================
  // QUANTITY
  // =========================

  const increaseQuantity = () => {
    setQuantity((previousQuantity) =>
      previousQuantity < stock
        ? previousQuantity + 1
        : previousQuantity
    );
  };

  const decreaseQuantity = () => {
    setQuantity((previousQuantity) =>
      previousQuantity > 1
        ? previousQuantity - 1
        : 1
    );
  };

  // =========================
  // RELATED PRODUCTS
  // =========================

  const relatedProducts = [
    {
      id: product.id + 1000,
      name: `${product.category} Special Product`,
      category: product.category,
      price: Math.max(499, product.price - 200),
      rating: 4.4,
      stock: 25,
      discount: 15,
      image: `https://loremflickr.com/500/500/${encodeURIComponent(
        product.category
      )}?lock=${product.id + 1000}`,
    },

    {
      id: product.id + 2000,
      name: `Premium ${product.category} Product`,
      category: product.category,
      price: product.price + 300,
      rating: 4.6,
      stock: 30,
      discount: 20,
      image: `https://loremflickr.com/500/500/${encodeURIComponent(
        product.category
      )}?lock=${product.id + 2000}`,
    },

    {
      id: product.id + 3000,
      name: `${product.category} Best Seller`,
      category: product.category,
      price: Math.max(599, product.price - 100),
      rating: 4.5,
      stock: 20,
      discount: 10,
      image: `https://loremflickr.com/500/500/${encodeURIComponent(
        product.category
      )}?lock=${product.id + 3000}`,
    },

    {
      id: product.id + 4000,
      name: `${product.category} Choice`,
      category: product.category,
      price: product.price + 150,
      rating: 4.3,
      stock: 35,
      discount: 18,
      image: `https://loremflickr.com/500/500/${encodeURIComponent(
        product.category
      )}?lock=${product.id + 4000}`,
    },
  ];

  // =========================
  // ADD RELATED PRODUCT TO CART
  // =========================

  const addRelatedToCart = (item) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingProduct) {
        if (
          existingProduct.quantity + 1 >
          item.stock
        ) {
          alert(
            `Only ${item.stock} items are available.`
          );

          return previousCart;
        }

        return previousCart.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity:
                  cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...previousCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });

    alert(`${item.name} added to cart! 🛒`);
  };

  return (
    <div className="product-details-page">

      {/* Back Button */}

      <button
        className="back-button"
        onClick={() => setSelectedProduct(null)}
      >
        ← Back to Products
      </button>

      {/* Product Details */}

      <div className="product-details-container">

        {/* Product Image */}

        <div className="product-details-image-section">

          <img
            src={product.image}
            alt={product.name}
            className="product-details-image"
          />

        </div>

        {/* Product Information */}

        <div className="product-details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          {/* Rating */}

          <div className="details-rating">

            <span className="rating-badge">
              ⭐ {product.rating}
            </span>

            <span className="review-count">
              {reviewCount} Reviews
            </span>

          </div>

          {/* Price */}

          <div className="details-price-section">

            <span className="details-current-price">
              ₹{product.price}
            </span>

            <span className="details-original-price">
              ₹{originalPrice}
            </span>

            <span className="details-discount">
              {discount}% OFF
            </span>

          </div>

          {/* Stock */}

          <p
            className={
              stock > 0
                ? "details-stock"
                : "details-stock out-of-stock"
            }
          >
            {stock > 0
              ? `In Stock (${stock} available)`
              : "Out of Stock"}
          </p>

          {/* Description */}

          <div className="details-description">

            <h3>Product Description</h3>

            <p>
              This is a high-quality{" "}
              {product.name} from the{" "}
              {product.category} category. It is
              designed to provide great quality,
              performance and value for money.
            </p>

          </div>

          {/* Product Benefits */}

          <div className="product-benefits">

            <h3>Product Benefits</h3>

            <div className="benefits-grid">

              <div className="benefit-item">

                <div className="benefit-icon">
                  🚚
                </div>

                <div>
                  <strong>Free Delivery</strong>

                  <p>
                    Free delivery on your order
                  </p>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  🔄
                </div>

                <div>
                  <strong>
                    7 Days Replacement
                  </strong>

                  <p>
                    Easy replacement available
                  </p>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  🛡️
                </div>

                <div>
                  <strong>
                    Secure Payment
                  </strong>

                  <p>
                    100% secure payment
                  </p>
                </div>

              </div>

              <div className="benefit-item">

                <div className="benefit-icon">
                  🎁
                </div>

                <div>
                  <strong>
                    Special Offer
                  </strong>

                  <p>
                    Limited time discount available
                  </p>
                </div>

              </div>

            </div>

          </div>

          {/* Delivery Information */}

          <div className="delivery-location">

            <h3>
              📍 Delivery Information
            </h3>

            <p>
              Estimated delivery:
              <strong> 3–7 Days</strong>
            </p>

            <p>
              Delivery available across India.
            </p>

          </div>

          {/* Quantity */}

          <div className="details-quantity-section">

            <h3>Quantity</h3>

            <div className="quantity-control">

              <button
                onClick={decreaseQuantity}
                disabled={stock <= 0}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={increaseQuantity}
                disabled={
                  stock <= 0 ||
                  quantity >= stock
                }
              >
                +
              </button>

            </div>

          </div>

          {/* Action Buttons */}

          <div className="details-buttons">

            <button
              className={`add-to-cart-details ${
                isInCart ? "added-to-cart" : ""
              }`}
              onClick={addToCart}
              disabled={stock <= 0}
            >
              {isInCart
                ? "✓ Added to Cart"
                : "🛒 Add to Cart"}
            </button>

            <button
              className="buy-now-details"
              onClick={buyNow}
              disabled={stock <= 0}
            >
              ⚡ Buy Now
            </button>

          </div>

          {/* Wishlist */}

          <button
            className={`details-wishlist-button ${
              isWishlisted ? "active" : ""
            }`}
            onClick={toggleWishlist}
          >
            {isWishlisted
              ? "❤️ Remove from Wishlist"
              : "♡ Add to Wishlist"}
          </button>

        </div>

      </div>

      {/* Customer Reviews */}

      <div className="reviews-section">

        <div className="reviews-header">

          <h2>Customer Reviews</h2>

          <div className="overall-rating">

            <div className="overall-rating-number">
              ⭐ {product.rating}
            </div>

            <p>
              Based on {reviewCount} reviews
            </p>

          </div>

        </div>

        {/* Rating Summary */}

        <div className="rating-summary">

          <div className="rating-row">
            <span>5 ⭐</span>

            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: "78%" }}
              ></div>
            </div>

            <span>78%</span>
          </div>

          <div className="rating-row">
            <span>4 ⭐</span>

            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: "15%" }}
              ></div>
            </div>

            <span>15%</span>
          </div>

          <div className="rating-row">
            <span>3 ⭐</span>

            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: "5%" }}
              ></div>
            </div>

            <span>5%</span>
          </div>

          <div className="rating-row">
            <span>2 ⭐</span>

            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: "1%" }}
              ></div>
            </div>

            <span>1%</span>
          </div>

          <div className="rating-row">
            <span>1 ⭐</span>

            <div className="rating-bar">
              <div
                className="rating-fill"
                style={{ width: "1%" }}
              ></div>
            </div>

            <span>1%</span>
          </div>

        </div>

        {/* Review 1 */}

        <div className="review-card">

          <div className="review-user">

            <div className="review-avatar">
              R
            </div>

            <div>
              <strong>Rahul</strong>

              <div className="review-stars">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

          </div>

          <p>
            Really good product. Quality is nice and
            delivery was also fast.
          </p>

        </div>

        {/* Review 2 */}

        <div className="review-card">

          <div className="review-user">

            <div className="review-avatar">
              P
            </div>

            <div>
              <strong>Priya</strong>

              <div className="review-stars">
                ⭐⭐⭐⭐⭐
              </div>
            </div>

          </div>

          <p>
            Product looks exactly like the images.
            Very happy with the purchase.
          </p>

        </div>

        {/* Review 3 */}

        <div className="review-card">

          <div className="review-user">

            <div className="review-avatar">
              A
            </div>

            <div>
              <strong>Aman</strong>

              <div className="review-stars">
                ⭐⭐⭐⭐☆
              </div>
            </div>

          </div>

          <p>
            Good value for money. Overall experience
            was great.
          </p>

        </div>

      </div>

      {/* Related Products */}

      <section className="related-products">

        <div className="related-products-heading">

          <p>YOU MAY ALSO LIKE</p>

          <h2>Related Products</h2>

          <span>
            More products from the{" "}
            {product.category} category
          </span>

        </div>

        <div className="related-products-grid">

          {relatedProducts.map((item) => (

            <div
              className="related-product-card"
              key={item.id}
            >

              <div className="related-image-wrapper">

                <img
                  src={item.image}
                  alt={item.name}
                />

              </div>

              <div className="related-product-info">

                <p className="related-category">
                  {item.category}
                </p>

                <h3>
                  {item.name}
                </h3>

                <div className="related-rating">

                  ⭐⭐⭐⭐⭐

                  <span>
                    {item.rating}
                  </span>

                </div>

                <div className="related-price">
                  ₹{item.price}
                </div>

                <div className="related-buttons">

                  <button
                    className="related-button"
                    onClick={() => {

                      setSelectedProduct(item);

                      setQuantity(1);

                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });

                    }}
                  >
                    View Details →
                  </button>

                  <button
                    className="related-cart-button"
                    onClick={() =>
                      addRelatedToCart(item)
                    }
                  >
                    🛒 Add to Cart
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>
  );
}

export default ProductDetails;
