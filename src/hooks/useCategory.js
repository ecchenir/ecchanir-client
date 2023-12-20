import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        "https://new-ecchanir-server.vercel.app/api/v1/category/get-category"
      );
      // Extract subcategories from each category
      const categoriesWithSubcategories = data?.category.map((category) => ({
        ...category,
        subcategories: category?.subCategory || [],
      }));
      setCategories(categoriesWithSubcategories);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(categories);

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
