import { useState } from "react";
import "./Navbar.css";

function Navbar({
  cart,
  wishlist,
  onHomeClick,
  onCategoryClick,
  onCartClick,
  onWishlistClick,
  onOrdersClick,
  onLoginClick,
  onLogout,
  loggedInUser,
  searchTerm,
  setSearchTerm,
}) {
  const [isSearchFocused, setIsSearchFocused] =
    useState(false);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const wishlistCount = wishlist.length;

  // Handle Search
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchTerm(e.target.value);
    }
  };

  // Category click + smooth scroll
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
    <nav className="navbar">

      {/* Logo */}
      <div
        className="logo"
        onClick={onHomeClick}
      >
        ShopSphere
      </div>

      {/* Search */}
      <div
        className={
          isSearchFocused
            ? "search-box search-focused"
            : "search-box"
        }
      >
        <span className="search-icon">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={handleSearch}
          onFocus={() =>
            setIsSearchFocused(true)
          }
          onBlur={() =>
            setIsSearchFocused(false)
          }
        />

        {/* Clear Search */}
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => setSearchTerm("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">

        {/* Home */}
        <li onClick={onHomeClick}>
          Home
        </li>

        {/* Categories */}
        <li
          onClick={() =>
            handleCategoryClick("Electronics")
          }
        >
          Electronics
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Fashion")
          }
        >
          Fashion
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Grocery")
          }
        >
          Grocery
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Books")
          }
        >
          Books
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Beauty")
          }
        >
          Beauty
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Sports")
          }
        >
          Sports
        </li>

        <li
          onClick={() =>
            handleCategoryClick("Home & Kitchen")
          }
        >
          Home & Kitchen
        </li>

        {/* Cart */}
        <li onClick={onCartClick}>
          Cart 🛒 ({cartCount})
        </li>

        {/* Wishlist */}
        <li onClick={onWishlistClick}>
          Wishlist ❤️ ({wishlistCount})
        </li>

        {/* Orders */}
        <li onClick={onOrdersClick}>
          Orders 📦
        </li>

        {/* Login / Logout */}
        {loggedInUser ? (
          <>
            <li>
              Hi, {loggedInUser.name} 👋
            </li>

            <li onClick={onLogout}>
              Logout
            </li>
          </>
        ) : (
          <li onClick={onLoginClick}>
            Login
          </li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;