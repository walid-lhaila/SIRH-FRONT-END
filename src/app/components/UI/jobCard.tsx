import React from 'react';

function JobCard({ location, type, title, description, company, createdBy }) {
    return (
        <article className="flex max-w-2xl flex-col items-start justify-between px-3 border-r border-gray-200 ">
            <div className="flex items-center gap-x-4 text-xs">
                <time dateTime="2020-03-16" className="text-gray-500">{location}</time>
                <a href="#"
                   className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{type}</a>
            </div>
            <div className="group relative">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                    <a href="#">
                        <span className="absolute inset-0"></span>
                        {title}
                    </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{description}</p>
            </div>
            <div className="relative mt-8 flex justify-between gap-11 w-full  items-center gap-x-4">
                <div className="flex items-center gap-3">
                    <img
                        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="" className="size-10 rounded-full bg-gray-50"/>
                    <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">{createdBy}</p>
                        <p className="text-gray-600">{company}</p>
                    </div>
                </div>
                <button
                    className="bg-sky-500 py-2 px-8 rounded text-white font-bold font-serif hover:bg-sky-600 duration-500">
                    Détails
                </button>
            </div>
        </article>
    );
}

export default JobCard;