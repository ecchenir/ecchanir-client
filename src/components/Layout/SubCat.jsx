import React, { useState } from "react";

export default function SubCat({ subCat }) {
  const [isOpen, setIsOpen] = useState(false);
  // console.log(subCat);
  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
    >
      <div>{subCat.name}</div>
      {isOpen && (
        <div style={{backgroundColor: '#f5f5f5'}} className="ms-3">
          {subCat.subCategory?.map((item, index) => (
            <div>{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}
