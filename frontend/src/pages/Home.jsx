import "./Home.css";

function Home({ onHomeClick, onCategoryClick }) {
  const categories = [
    {
      name: "Electronics",
      icon: "📱",
      description: "Mobiles, gadgets & accessories",
    },
    {
      name: "Fashion",
      icon: "👕",
      description: "Trendy clothes & footwear",
    },
    {
      name: "Grocery",
      icon: "🛒",
      description: "Fresh & daily essentials",
    },
    {
      name: "Books",
      icon: "📚",
      description: "Books for learning & fun",
    },
    {
      name: "Beauty",
      icon: "💄",
      description: "Beauty & personal care",
    },
    {
      name: "Sports",
      icon: "⚽",
      description: "Sports & fitness products",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      description: "Everything for your home",
    },
  ];

  const featuredProducts = [
    {
      name: "Wireless Headphones",
      category: "Electronics",
      price: "₹1,499",
      oldPrice: "₹2,499",
      discount: "40% OFF",
      image:
        "https://loremflickr.com/500/500/headphones?lock=101",
    },
    {
      name: "Smart Watch",
      category: "Electronics",
      price: "₹2,299",
      oldPrice: "₹3,499",
      discount: "34% OFF",
      image:
        "https://loremflickr.com/500/500/smartwatch?lock=102",
    },
    {
      name: "Men's T-Shirt",
      category: "Fashion",
      price: "₹699",
      oldPrice: "₹999",
      discount: "30% OFF",
      image:
        "https://loremflickr.com/500/500/tshirt?lock=103",
    },
    {
      name: "Running Shoes",
      category: "Sports",
      price: "₹1,899",
      oldPrice: "₹2,999",
      discount: "37% OFF",
      image:
        "https://loremflickr.com/500/500/runningshoes?lock=104",
    },
  ];

  const handleCategoryClick = (category) => {
    onCategoryClick(category);

    setTimeout(() => {
      document
        .getElementById("products-section")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  };

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-tagline">
            Welcome to ShopSphere ✨
          </p>

          <h1>
            Shop Everything
            <span> You Love 🛍️</span>
          </h1>

          <p className="hero-description">
            Discover electronics, fashion, grocery,
            books, beauty, sports and much more —
            all in one place.
          </p>

          <button
            className="hero-button"
            onClick={() => handleCategoryClick("All")}
          >
            Shop Now →
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <div className="section-heading">
          <p>EXPLORE OUR COLLECTION</p>
          <h2>Shop by Category</h2>
          <span>
            Find everything you need in one place
          </span>
        </div>

        <div className="category-list">
          {categories.map((category) => (
            <div
              className="category-card"
              key={category.name}
              onClick={() =>
                handleCategoryClick(category.name)
              }
            >
              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <p>{category.description}</p>

              <span className="category-arrow">
                Explore →
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="featured-products">
        <div className="section-heading">
          <p>TOP PICKS FOR YOU</p>
          <h2>Featured Products</h2>
          <span>
            Popular products you may love
          </span>
        </div>

        <div className="featured-product-list">
          {featuredProducts.map((product) => (
            <div
              className="featured-product-card"
              key={product.name}
            >
              <div className="featured-image-wrapper">
                <img
                  src={product.image}
                  alt={product.name}
                />

                <span className="featured-discount">
                  {product.discount}
                </span>
              </div>

              <div className="featured-product-info">
                <p className="featured-category">
                  {product.category}
                </p>

                <h3>{product.name}</h3>

                <div className="featured-rating">
                  ⭐⭐⭐⭐⭐
                  <span>4.5</span>
                </div>

                <div className="featured-price">
                  <strong>
                    {product.price}
                  </strong>

                  <span>
                    {product.oldPrice}
                  </span>
                </div>

                <button
                  className="featured-button"
                  onClick={() =>
                    handleCategoryClick(
                      product.category
                    )
                  }
                >
                  View Products →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;