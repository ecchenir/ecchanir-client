import React, { useState, useEffect } from "react";
import {
  allDivision,
  districtsOf,
  upazilasOf,
} from "@bangladeshi/bangladesh-address";

export default function DistrictSelector() {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  console.log(selectedDivision);
  console.log(selectedDistrict);
  console.log(selectedUpazila);

  useEffect(() => {
    const allDivisionsList = allDivision();
    setDivisions(allDivisionsList);
  }, []);

  useEffect(() => {
    if (selectedDivision) {
      const districtList = districtsOf(selectedDivision);
      setDistricts(districtList);
    }
  }, [selectedDivision]);

  useEffect(() => {
    if (selectedDistrict) {
      const upazilaList = upazilasOf(selectedDistrict);
      setUpazilas(upazilaList);
    }
  }, [selectedDistrict]);

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedUpazila("");
  };

  const handleUpazilaChange = (event) => {
    setSelectedUpazila(event.target.value);
  };

  return (
    <div>
      <select
        name="division"
        id="division"
        value={selectedDivision}
        onChange={handleDivisionChange}
      >
        <option value="">Select Division</option>
        {divisions.map((division, index) => (
          <option key={index} value={division}>
            {division}
          </option>
        ))}
      </select>
      <br />

      <select
        className="mt-2"
        name="districts"
        id="districts"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="">Select District</option>
        {districts.map((d, index) => (
          <option key={index} value={d}>
            {d}
          </option>
        ))}
      </select>
      <br />
      {/* <select
        className="mt-2"
        name="upazila"
        id="upazila"
        value={selectedUpazila}
        onChange={handleUpazilaChange}
      >
        <option value="">Select Upazila Name</option>
        {upazilas.map((upazila, index) => (
          <option key={index} value={upazila.upazila}>
            {upazila.upazila}
          </option>
        ))}
      </select> */}
    </div>
  );
}
