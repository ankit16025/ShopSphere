
import "./Footer.css";

function Footer({
  onHomeClick,
  onProductsClick,
  onWishlistClick,
  onOrdersClick,
  onCategoryClick,
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-column footer-brand">

          <h2>ShopSphere 🛍️</h2>

          <p>
            Your one-stop destination for shopping
            everything you love.
          </p>

          <div className="footer-socials">

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              📘
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              📸
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              🐦
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              ▶️
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <button onClick={onHomeClick}>
            Home
          </button>

          <button onClick={onProductsClick}>
            Products
          </button>

          <button onClick={onWishlistClick}>
            Wishlist
          </button>

          <button onClick={onOrdersClick}>
            My Orders
          </button>

        </div>


        {/* Categories */}
        <div className="footer-column">

          <h3>Categories</h3>

          <button onClick={() => onCategoryClick("Electronics")}>
            Electronics
          </button>

          <button onClick={() => onCategoryClick("Fashion")}>
            Fashion
          </button>

          <button onClick={() => onCategoryClick("Grocery")}>
            Grocery
          </button>

          <button onClick={() => onCategoryClick("Books")}>
            Books
          </button>

          <button onClick={() => onCategoryClick("Beauty")}>
            Beauty
          </button>

          <button onClick={() => onCategoryClick("Sports")}>
            Sports
          </button>

          <button onClick={() => onCategoryClick("Home & Kitchen")}>
            Home & Kitchen
          </button>

          <button onClick={() => onCategoryClick("Mobiles")}>
            Mobiles
          </button>

          <button onClick={() => onCategoryClick("Toys")}>
            Toys
          </button>

          <button onClick={() => onCategoryClick("Accessories")}>
            Accessories
          </button>

        </div>


        {/* Customer Support */}
        <div className="footer-column">

          <h3>Customer Support</h3>

          <p>📧 support@shopsphere.com</p>

          <p>📞 +91 98765 43210</p>

          <p>🕐 Mon - Sat: 9 AM - 6 PM</p>

          <p>📍 India</p>

        </div>

      </div>


      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © {currentYear} ShopSphere. All rights reserved.
        </p>

        <p>
          Made with ❤️ using React
        </p>

      </div>

    </footer>
  );
}

export default Footer;

