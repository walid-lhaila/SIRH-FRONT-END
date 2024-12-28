import React from 'react';
import UseGetAllCities from "@/app/hooks/useGetAllCities";

function Filter({ onLocationChange, onTypeChange }) {
        const { cities } = UseGetAllCities();
    return (
        <form className="max-w-sm w-[50%] flex items-center gap-4 pt-10">

            <label htmlFor="states" className="sr-only tetx-center">Location</label>
            <select id="states" onChange={(e) => onLocationChange(e.target.value)}
                    className="block w-full p-4 text-center text-sm text-gray-900 border bg-white border-gray-100 rounded-lg shadow-xl shadow-sky-100 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-200 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Location</option>
                {cities.map((city) => (
                    <option key={city.name} value={city.name}>{city.name}</option>
                ))}
            </select>

            <label htmlFor="states" className="sr-only">Contract type</label>
            <select id="states" onChange={(e) => onTypeChange(e.target.value)}
                    className="block w-full p-4  text-center text-sm text-gray-900 border bg-white border-gray-100 rounded-lg shadow-xl shadow-sky-100 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-200 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Contract type</option>
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Internship">Internship</option>
                <option value="CDI">CDI</option>
                <option value="CDD">CDD</option>
                <option value="Freelance">Freelance</option>
                <option value="Consulting">Consulting</option>
                <option value="Remote">Remote</option>
            </select>
        </form>);
}

export default Filter;