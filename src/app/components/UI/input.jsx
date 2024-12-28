import React from 'react';

function Input({name, placeholder, value, type, label, className, handleChange}) {
    return (
        <div>
            <label className="block mb-2 text-sm text-gray-700 font-serif ">{label}</label>
            <input onChange={handleChange} name={name} value={value} required type={type} placeholder={placeholder} className={`block w-full px-5 py-3 mt-2 text-gray-300 placeholder-gray-400 bg-red-50 border border-gray-200 rounded-lg dark:text-gray-800 dark:border-sky-600 focus:border-sky-600 focus:ring-sky-600 focus:outline-none focus:ring focus:ring-opacity-40 ${className}`}/>
        </div>);
}

export default Input;


