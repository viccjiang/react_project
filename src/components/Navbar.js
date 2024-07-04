import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar({ cartData }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      if (scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`sticky-top py-2 ${
          isScrolled ? "navbar-scrolled" : "bg-white"
        }`}
      >
        <div className="container">
          <nav className="navbar px-0 navbar-expand-lg navbar-light bg-transparent">
            <NavLink
              className="logo navbar-brand position-absolute fs-1"
              style={{
                left: "50%",
                transform: "translate(-50%, -50%)",
                top: "50%",
                background:
                  "linear-gradient(to right top, #712cf9 ,#ff99cc, #000 )",
                backgroundSize: "400% 400%",
                color: "transparent",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                animation: "textGradientAnimation 5s ease infinite",
              }}
              to="/"
            >
              FIT her.
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse custom-header-md-open"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item ">
                  <NavLink
                    className={({ isActive }) =>
                      [
                        "nav-link px-0",
                        isActive ? "router-link-active" : null,
                      ].join(" ")
                    }
                    to="/about"
                  >
                    關於我們
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className={({ isActive }) =>
                      [
                        "nav-link px-0",
                        isActive ? "router-link-active" : null,
                      ].join(" ")
                    }
                    to="/products"
                  >
                    所有課程
                  </NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink
                    className={({ isActive }) =>
                      [
                        "nav-link px-0",
                        isActive ? "router-link-active" : null,
                      ].join(" ")
                    }
                    to="/cart"
                  >
                    購物車
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex">
              {/* 購物車圖示 */}
              <NavLink to="/cart" className="nav-link position-relative">
                <i className="bi bi-bag-fill"></i>
                {cartData?.carts?.length !== 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartData?.carts?.length}
                  </span>
                )}
              </NavLink>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
export default Navbar;
