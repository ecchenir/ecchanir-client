import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab, Nav, Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./SubcategoryHeader.css";

export default function SubcategoryHeader() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-category"
      );
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div
      style={{ backgroundColor: "#D6EAF8" }}
      className="d-flex justify-content-center   bg-success  my-3 container"
    >
      <Tab.Container id="category-tabs" defaultActiveKey={categories[0]?._id}>
        {/* Navigation Tabs */}
        <Nav variant="tabs" className={showDropdown ? "hidden" : ""}>
          {categories.map((category) => (
            <Nav.Item key={category._id}>
              <Dropdown
                show={openDropdownId === category._id}
                onMouseEnter={() => setOpenDropdownId(category._id)}
                onMouseLeave={() => setOpenDropdownId(null)}
              >
                <Dropdown.Toggle
                  variant="success"
                  id={`dropdown-${category._id}`}
                >
                  {category.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {category.subCategory.map((subCat, index) => (
                    <Dropdown.Item
                      onClick={() => navigate(`/subcategory/${subCat}`)}
                      key={index}
                    >
                      {subCat}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Nav.Item>
          ))}
        </Nav>
      </Tab.Container>
    </div>
  );
}
