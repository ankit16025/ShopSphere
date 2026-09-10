
import { useState } from "react";
import "./ProductCard.css";

function ProductCard({
  product,
  setCart,
  setSelectedProduct,
  wishlist,
  setWishlist,
}) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Check if product is already in cart
  const [isInCart, setIsInCart] = useState(() => {
    const savedCart = localStorage.getItem(
      "shopsphere-cart"
    );

    if (!savedCart) return false;

    const cartItems = JSON.parse(savedCart);

    return cartItems.some(
      (item) => item.id === product.id
    );
  });

  // Add to Cart
  const addToCart = () => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Show Added to Cart
    setIsInCart(true);
  };

  // Wishlist
  const isWishlisted = wishlist.some(
    (item) => item.id === product.id
  );

  const toggleWishlist = () => {
    if (isWishlisted) {
      setWishlist((previousWishlist) =>
        previousWishlist.filter(
          (item) => item.id !== product.id
        )
      );
    } else {
      setWishlist((previousWishlist) => [
        ...previousWishlist,
        product,
      ]);
    }
  };

  // Quick View
  const quickView = () => {
    setSelectedProduct(product);
  };

  // Rating
  const rating = (
    4 + (product.id % 10) / 10
  ).toFixed(1);

  // Discount
  const discountPercent =
    10 + (product.id % 31);

  // Original Price
  const originalPrice = Math.round(
    product.price /
      (1 - discountPercent / 100)
  );

  // Image Loaded
  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Image Error
  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  return (
    <div className="product-card">

      {/* Wishlist */}
      <button
        className="wishlist-button"
        onClick={toggleWishlist}
        aria-label={
          isWishlisted
            ? "Remove from wishlist"
            : "Add to wishlist"
        }
      >
        {isWishlisted ? "❤️" : "♡"}
      </button>

      {/* Product Image */}
      <div className="product-image">

        {imageLoading && !imageError && (
          <div className="image-loading">
            <span>Loading...</span>
          </div>
        )}

        {imageError ? (
          <div className="image-error">
            <span>🖼️</span>
            <p>Image unavailable</p>
          </div>
        ) : (
          <img
            src={product.image}
            alt={product.name}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={
              imageLoading
                ? "product-img-hidden"
                : "product-img-visible"
            }
          />
        )}

      </div>

      {/* Category */}
      <p className="product-category">
        {product.category}
      </p>

      {/* Product Name */}
      <button
        className="product-name"
        onClick={() =>
          setSelectedProduct(product)
        }
      >
        {product.name}
      </button>

      {/* Rating */}
      <div className="product-rating">
        ⭐⭐⭐⭐⭐
        <span>{rating}</span>
      </div>

      {/* Price */}
      <div className="price-section">

        <span className="original-price">
          ₹{originalPrice}
        </span>

        <span className="product-price">
          ₹{product.price}
        </span>

        <span className="discount">
          {discountPercent}% OFF
        </span>

      </div>

      {/* Stock */}
      <p className="product-stock">
        ✓ In Stock
      </p>

      {/* Quick View */}
      <button
        className="quick-view-button"
        onClick={quickView}
      >
        👁️ Quick View
      </button>

      {/* Add Cart */}
      <button
        className={
          isInCart
            ? "add-cart-button added-to-cart"
            : "add-cart-button"
        }
        onClick={addToCart}
      >
        {isInCart
          ? "✓ Added to Cart"
          : "🛒 Add to Cart"}
      </button>

      {/* Remove Wishlist */}
      {isWishlisted && (
        <button
          className="remove-wishlist-button"
          onClick={toggleWishlist}
        >
          Remove from Wishlist
        </button>
      )}

    </div>
  );
}

export default ProductCard;
