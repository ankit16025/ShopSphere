import ProductCard from "../components/ProductCard";
import "./Wishlist.css";

function Wishlist({
  wishlist,
  setWishlist,
  setCart,
  setSelectedProduct,
  onContinueShopping,
}) {
  return (
    <div className="wishlist-page">

      <h1>My Wishlist ❤️</h1>

      {wishlist.length === 0 ? (

        /* Empty Wishlist */
        <div className="empty-wishlist">

          <div className="empty-wishlist-icon">
            ❤️
          </div>

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            Save your favorite products here and
            come back anytime to shop them later.
          </p>

          <button
            className="empty-wishlist-button"
            onClick={onContinueShopping}
          >
            🛍️ Explore Products
          </button>

        </div>

      ) : (

        <>

          <p className="wishlist-count">
            {wishlist.length} item(s) in your wishlist
          </p>

          <div className="wishlist-container">

            {wishlist.map((product) => (

              <ProductCard
                key={product.id}
                product={product}
                setCart={setCart}
                setSelectedProduct={
                  setSelectedProduct
                }
                wishlist={wishlist}
                setWishlist={setWishlist}
              />

            ))}

          </div>

        </>

      )}

    </div>
  );
}

export default Wishlist;