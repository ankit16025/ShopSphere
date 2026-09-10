import { useState } from "react";
import "./Login.css";

function Login({ onBackHome, setLoggedInUser }) {
  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // =========================
    // REGISTER
    // =========================

    if (isRegister) {
      if (!name || !email || !password) {
        alert("Please fill all fields.");
        return;
      }

      const user = {
        name: name,
        email: email,
        password: password,
      };

      localStorage.setItem(
        "shopsphere-user",
        JSON.stringify(user)
      );

      setLoggedInUser(user);

      alert("Registration successful! 🎉");

      setName("");
      setEmail("");
      setPassword("");

      // Go to Home
      if (onBackHome) {
        onBackHome();
      }

      return;
    }

    // =========================
    // LOGIN
    // =========================

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    const savedUser = localStorage.getItem(
      "shopsphere-user"
    );

    if (!savedUser) {
      alert(
        "No account found. Please register first."
      );
      return;
    }

    const user = JSON.parse(savedUser);

    if (
      email.trim().toLowerCase() ===
        user.email.trim().toLowerCase() &&
      password === user.password
    ) {
      setLoggedInUser(user);

      alert(
        `Welcome back, ${user.name}! 🎉`
      );

      // Go to Home
      if (onBackHome) {
        onBackHome();
      }

      return;
    }

    alert("Invalid email or password.");
  };

  // =========================
  // SWITCH LOGIN / REGISTER
  // =========================

  const switchMode = () => {
    setIsRegister(!isRegister);

    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className="login-page">

      <div className="login-box">

        <h1>
          {isRegister
            ? "Create Account"
            : "Welcome Back"}
        </h1>

        <p>
          {isRegister
            ? "Register to ShopSphere"
            : "Login to your ShopSphere account"}
        </p>

        <form onSubmit={handleSubmit}>

          {/* Name */}
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {/* Password */}
          <div className="password-wrapper">

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁️"}
            </button>

          </div>

          {/* Submit */}
          <button type="submit">
            {isRegister
              ? "Register"
              : "Login"}
          </button>

        </form>

        {/* Switch */}
        <p className="switch-text">

          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            type="button"
            className="switch-button"
            onClick={switchMode}
          >
            {isRegister
              ? "Login"
              : "Register"}
          </button>

        </p>

        {/* Back */}
        <button
          type="button"
          className="back-home"
          onClick={onBackHome}
        >
          ← Back to Home
        </button>

      </div>

    </div>
  );
}

export default Login;