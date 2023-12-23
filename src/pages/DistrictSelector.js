import React, { useState, useEffect } from "react";
import { allDivision, districtsOf } from "@bangladeshi/bangladesh-address";

export default function DistrictSelector({
  division,
  setDivisions,
  districts,
  setDistricts,
  selectedDivision,
  selectedDistrict,
  setSelectedDistrict,
  setSelectedDivision,
  divisions,
}) {
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

  const handleDivisionChange = (event) => {
    setSelectedDivision(event.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <div>
      <select
        className="w-100 "
        name="division"
        id="division"
        value={selectedDivision}
        onChange={handleDivisionChange}
      >
        <option value="">Select Division</option>
        {divisions &&
          divisions.map((division, index) => (
            <option key={index} value={division}>
              {division}
            </option>
          ))}
      </select>
      <br />

      <select
        className="mt-2 w-100"
        name="districts"
        id="districts"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="">Select District</option>
        {districts &&
          districts.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
      </select>
      <br />
    </div>
  );
}
