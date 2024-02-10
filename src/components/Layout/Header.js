import React from "react";
import { NavLink, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import Ecche from "../../assists/Image/ecchenir.jpg";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import SubHeader from "./SubHeader";
import SubcategoryHeader from "../../pages/SubcategoryHeader";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <SubHeader />
      <nav className="navbar navbar-expand-lg  ">
        <div className="container-fluid ">
          {/* Mobile Start */}
          <Link to="/" className="navbar-brand fs-2 font-[Inter]  ">
            <img className="bang-Image" src={Ecche} alt="" height={"50px"} />{" "}
            <span className="brandeName display-6 fw-bold"> EccheNir</span>{" "}
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* Mobile  End */}
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <SearchInput /> */}

              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle  "
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  All Categories
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item " to={"/categories"}>
                      All Categories
                    </Link>
                  </li>
                  {categories?.map((c) => (
                    <li>
                      <Link
                        className="dropdown-item"
                        to={`/category/${c._id}`}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="nav-item">
                <NavLink to="/blog" className="nav-link">
                  Blogs
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/about" className="nav-link d-md-flex  d-none">
                  About
                </NavLink>
              </li>

              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          LogOut
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="py-2 ">
            <NavLink to="/cart" className="nav-link">
              <Badge className="m-2 p-2" count={cart?.length} showZero>
                🛒
              </Badge>
            </NavLink>
          </div>
        </div>
      </nav>

      <div></div>
    </>
  );
};

export default Header;
