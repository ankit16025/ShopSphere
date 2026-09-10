import { useState, useMemo } from "react";
import ProductCard from "../components/ProductCard";
import "./Products.css";

const productTemplates = [
  {
    category: "Electronics",
    names: [
      "Wireless Headphones",
      "Smart Watch",
      "Bluetooth Speaker",
      "Wireless Mouse",
      "Mechanical Keyboard",
      "Power Bank",
      "USB Cable",
      "Laptop Stand",
      "Webcam",
      "Gaming Headset",
    ],
    minPrice: 499,
    maxPrice: 4999,
  },

  {
    category: "Fashion",
    names: [
      "Men's T-Shirt",
      "Jeans",
      "Backpack",
      "Hoodie",
      "Casual Shirt",
      "Sneakers",
      "Jacket",
      "Cap",
      "Track Pants",
      "Formal Shirt",
    ],
    minPrice: 399,
    maxPrice: 2999,
  },

  {
    category: "Grocery",
    names: [
      "Organic Rice",
      "Fresh Apples",
      "Wheat Flour",
      "Cooking Oil",
      "Basmati Rice",
      "Green Tea",
      "Sugar",
      "Salt",
      "Corn Flakes",
      "Dry Fruits",
    ],
    minPrice: 99,
    maxPrice: 999,
  },

  {
    category: "Books",
    names: [
      "The Great Gatsby",
      "Programming Book",
      "JavaScript Guide",
      "Python Programming",
      "Data Structures",
      "Database Systems",
      "Web Development",
      "Machine Learning",
      "Computer Networks",
      "Operating Systems",
    ],
    minPrice: 199,
    maxPrice: 1499,
  },

  {
    category: "Beauty",
    names: [
      "Face Cream",
      "Perfume",
      "Face Wash",
      "Moisturizer",
      "Lip Balm",
      "Shampoo",
      "Body Lotion",
      "Sunscreen",
      "Hair Serum",
      "Makeup Kit",
    ],
    minPrice: 199,
    maxPrice: 1999,
  },

  {
    category: "Sports",
    names: [
      "Running Shoes",
      "Football",
      "Yoga Mat",
      "Cricket Bat",
      "Badminton Racket",
      "Tennis Ball",
      "Gym Gloves",
      "Basketball",
      "Sports Bottle",
      "Skipping Rope",
    ],
    minPrice: 299,
    maxPrice: 3999,
  },

  {
    category: "Home & Kitchen",
    names: [
      "Table Lamp",
      "Coffee Mug",
      "Dinner Set",
      "Water Bottle",
      "Kitchen Knife",
      "Storage Box",
      "Bedsheet",
      "Curtains",
      "Wall Clock",
      "Cushion",
    ],
    minPrice: 149,
    maxPrice: 2499,
  },

  {
    category: "Mobiles",
    names: [
      "Smartphone",
      "Android Phone",
      "5G Smartphone",
      "Mobile Cover",
      "Screen Protector",
      "Fast Charger",
      "Wireless Charger",
      "Phone Stand",
      "Selfie Stick",
      "Mobile Tripod",
    ],
    minPrice: 199,
    maxPrice: 29999,
  },

  {
    category: "Toys",
    names: [
      "Remote Control Car",
      "Building Blocks",
      "Toy Train",
      "Puzzle Game",
      "Teddy Bear",
      "Board Game",
      "Action Figure",
      "Toy Robot",
      "Educational Toy",
      "Coloring Set",
    ],
    minPrice: 199,
    maxPrice: 2999,
  },

  {
    category: "Accessories",
    names: [
      "Leather Wallet",
      "Sunglasses",
      "Belt",
      "Watch",
      "Keychain",
      "Travel Bag",
      "Card Holder",
      "Bracelet",
      "Necklace",
      "Umbrella",
    ],
    minPrice: 199,
    maxPrice: 4999,
  },
];

const imageKeywords = {
  Electronics: "electronics",
  Fashion: "fashion,clothing",
  Grocery: "grocery,food",
  Books: "books",
  Beauty: "beauty,cosmetics",
  Sports: "sports",
  "Home & Kitchen": "kitchen",
  Mobiles: "smartphone,mobile",
  Toys: "toys",
  Accessories: "accessories",
};

function Products({
  setCart,
  setSelectedProduct,
  selectedCategory,
  searchTerm,
  wishlist,
  setWishlist,
}) {
  const [maxPrice, setMaxPrice] = useState(30000);
  const [sortOption, setSortOption] = useState("default");

  // =========================
  // GENERATE PRODUCTS
  // =========================

  const products = useMemo(() => {
    const generatedProducts = [];

    let id = 1;

    productTemplates.forEach((template) => {
      for (let i = 0; i < 56; i++) {
        const name =
          template.names[i % template.names.length];

        const image = `https://loremflickr.com/500/500/${imageKeywords[template.category]}?lock=${id}`;

        const price =
          template.minPrice +
          ((i * 137) %
            (template.maxPrice -
              template.minPrice +
              1));

        generatedProducts.push({
          id: id,

          name: `${name} ${Math.floor(i / 10) + 1}`,

          price: price,

          category: template.category,

          image: image,

          // Stock: 11 to 50
          stock: 10 + (id % 41),

          // Rating: 4.0 to 4.9
          rating: Number(
            (4 + (id % 10) / 10).toFixed(1)
          ),

          // Discount: 10% to 30%
          discount: 10 + (id % 21),
        });

        id++;
      }
    });

    return generatedProducts;
  }, []);

  // =========================
  // FILTER PRODUCTS
  // =========================

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesSearch =
        product.name
          .toLowerCase()
          .includes(search) ||
        product.category
          .toLowerCase()
          .includes(search);

      const matchesPrice =
        product.price <= maxPrice;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice
      );
    });
  }, [
    products,
    selectedCategory,
    searchTerm,
    maxPrice,
  ]);

  // =========================
  // SORT PRODUCTS
  // =========================

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      if (sortOption === "lowToHigh") {
        return a.price - b.price;
      }

      if (sortOption === "highToLow") {
        return b.price - a.price;
      }

      return 0;
    });
  }, [filteredProducts, sortOption]);

  // =========================
  // CLEAR FILTERS
  // =========================

  const handleClearFilters = () => {
    setMaxPrice(30000);
    setSortOption("default");
  };

  // =========================
  // BACK TO TOP
  // =========================

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="products-page"
      id="products-section"
    >

      <h2>
        Our Products ({sortedProducts.length})
      </h2>

      {/* Filters */}

      <div className="product-filters">

        <div className="price-filter">

          <label>
            Max Price: ₹{maxPrice}
          </label>

          <input
            type="range"
            min="100"
            max="30000"
            step="100"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(
                Number(e.target.value)
              )
            }
          />

        </div>

        <div className="sort-filter">

          <label>
            Sort By:
          </label>

          <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
          >
            <option value="default">
              Default
            </option>

            <option value="lowToHigh">
              Price: Low to High
            </option>

            <option value="highToLow">
              Price: High to Low
            </option>
          </select>

        </div>

      </div>

      {/* No Products */}

      {sortedProducts.length === 0 ? (

        <div className="no-products">

          <div className="no-products-icon">
            🔍
          </div>

          <h3>
            No Products Found
          </h3>

          <p>
            We couldn't find any products matching
            your current search or filters.
          </p>

          <button
            className="clear-filters-button"
            onClick={handleClearFilters}
          >
            ↻ Clear Filters
          </button>

        </div>

      ) : (

        <>

          {/* Products */}

          <div className="products-container">

            {sortedProducts.map((product) => (

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

          {/* Back To Top */}

          <button
            className="back-to-top"
            onClick={handleBackToTop}
          >
            ↑ Back to Top
          </button>

        </>

      )}

    </div>
  );
}

export default Products;