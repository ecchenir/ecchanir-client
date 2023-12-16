import React, { useState, useEffect } from 'react';

export default function DistrictSelector() {
    const [divisions, setDivisions] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedDivision, setSelectedDivision] = useState('');

    useEffect(() => {
        const address = require('@bangladeshi/bangladesh-address');
        console.log(address);
        const divisionsData = address.DivisonName || [];
        console.log(divisionsData);  // Log the data to check its structure

        // Check if divisionsData is an object and convert it to an array
        if (typeof divisionsData === 'object' && divisionsData !== null) {
            const divisionsArray = Object.values(divisionsData);
            setDivisions(divisionsArray);
        } else {
            setDivisions(divisionsData);
        }
    }, []);

    useEffect(() => {
        if (selectedDivision) {
            const address = require('@bangladeshi/bangladesh-address');
            const districtsData = address.getDistricts();
            console.log(districtsData);  // Log the data to check its structure
            setDistricts(districtsData);
        } else {
            setDistricts([]);
        }
    }, [selectedDivision]);

    return (
        <div>
            <select
                name="division"
                id="division"
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
            >
                <option value="">Select Division Name</option>
                {divisions.map((division, index) => (
                    <option key={index} value={division}>
                        {division}
                    </option>
                ))}
            </select>

            <select
                name="district"
                id="district"
                value={districts}
                onChange={(e) => setDistricts(e.target.value)}
            >
                <option value="">Select District</option>
                {districts.map((district, index) => (
                    <option key={index} value={district}>
                        {district}
                    </option>
                ))}
            </select>
        </div>
    );
}
