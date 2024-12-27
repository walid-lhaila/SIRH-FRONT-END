import React from 'react';

function Filter() {
    return (
        <form className="max-w-sm w-[50%] flex items-center gap-4 pt-10">

            <label htmlFor="states" className="sr-only tetx-center">Location</label>
            <select id="states"
                    className="block w-full p-4 text-center text-sm text-gray-900 border bg-white border-gray-100 rounded-lg shadow-xl shadow-sky-100 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-200 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Location</option>
                <option value="CA">California</option>
                <option value="TX">Texas</option>
                <option value="WH">Washinghton</option>
                <option value="FL">Florida</option>
                <option value="VG">Virginia</option>
                <option value="GE">Georgia</option>
                <option value="MI">Michigan</option>
            </select>

            <label htmlFor="states" className="sr-only">Contract type</label>
            <select id="states"
                    className="block w-full p-4  text-center text-sm text-gray-900 border bg-white border-gray-100 rounded-lg shadow-xl shadow-sky-100 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-200 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Contract type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
                <option value="Consulting">Consulting</option>
                <option value="Remote">Remote</option>
            </select>
        </form>);
}

export default Filter;