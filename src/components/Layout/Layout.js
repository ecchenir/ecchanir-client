import React from "react";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Footer from "./Footer";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Ecche-Nir - shope now",
  description: "E-Comose  project",
  keywords: "Shirt, Hoodies, T-shirt, Denim Shirt",
  author: "MahinTechinfo",
};

export default Layout;
