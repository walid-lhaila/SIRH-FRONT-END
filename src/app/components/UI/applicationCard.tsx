import React from 'react';
import Link from "next/link";
import Image from "next/image";

interface ApplicationCardProps {
    id: string | undefined;
    location: string;
    type: string;
    title: string;
    description: string;
    company: string;
    createdBy: string;
    status: 'pending' | 'accepted' | 'rejected';
}


function ApplicationCard({  location, type, title, description, company, createdBy, id, status} : ApplicationCardProps) {
    const statusStyles = {
        pending: "bg-sky-200 text-sky-600",
        accepted: "bg-green-200 text-green-600",
        rejected: "bg-red-200 text-red-600",
    };

    return (
        <div className="flex max-w-2xl flex-col items-start justify-between px-3 border-r border-gray-200 ">
            <div className="flex justify-between text-xs w-full">
                <div className="flex items-center gap-x-4 text-xs">
                    <div className="text-gray-500">{location}</div>
                    <p  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">{type}</p>
                </div>
                <p className={`relative z-10 rounded-full px-3 py-1.5 font-medium ${statusStyles[status]}`}>{status}</p>
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
                    <Image
                        src=""
                        alt="" className="size-10 rounded-full bg-gray-50"/>
                    <div className="text-sm/6">
                        <p className="font-semibold text-gray-900">{createdBy}</p>
                        <p className="text-gray-600">{company}</p>
                    </div>
                </div>
                <Link href={`/routes/home/${id}`}
                      className="bg-sky-500 py-2 px-8 rounded text-white font-bold font-serif hover:bg-sky-600 duration-500">
                    Détails
                </Link>
            </div>
        </div>);
}

export default ApplicationCard;