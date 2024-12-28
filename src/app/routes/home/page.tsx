'use client'
import React, {useEffect, useState} from 'react';
import JobCard from "@/app/components/UI/jobCard";
import Navbar from "@/app/components/navbar";
import {useAppDispatch, useAppSelector} from "@/lib/frontend/redux/hooks";
import {getAllJobs} from "@/lib/frontend/redux/slices/jobSlice";
import Search from "@/app/components/UI/search";
import Filter from "@/app/components/UI/filter";

function Page() {
    const dispatch = useAppDispatch();
    const { items: jobs, loading, error } = useAppSelector((state) => state.jobs);
    const [searchedJobs, setSearchedJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);


    useEffect(() => {
        let filteredJobs = jobs;
        if(searchTerm) {
            filteredJobs = filteredJobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        if(selectedLocation) {
            filteredJobs = filteredJobs.filter((job) => job.location.toLowerCase() === (selectedLocation.toLowerCase()));
        }
        if(selectedType) {
            filteredJobs = filteredJobs.filter((job) => job.type.toLowerCase() === (selectedType.toLowerCase()));
        }

        if(filteredJobs.length === 0) {
            setSearchedJobs(jobs);
        }else {
            setSearchedJobs(filteredJobs);
        }
    }, [searchTerm, jobs, selectedType, selectedLocation])

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };
    const handleLocationChange = (location: string) => {
        setSelectedLocation(location);
    }
    const handleTypeChange = (type: string) => {
        setSelectedType(type);
    }

    if(loading) {
        return <p>Loading Data....</p>
    }
    if(error) {
        return <p>Error: {error}</p>
    }
    return (
        <div className="bg-white">
            <Navbar />

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    aria-hidden="true"
                >
                    <div
                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-[#90d9f9] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        style={{
                            clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                        }}
                    ></div>
                </div>
                <div className="mx-auto max-w-8xl py-10 sm:py-28 lg:py-28">
                    <div className="py-24 sm:py-8">
                        <div className="mx-auto max-w-7xl px-6 lg:px-8">
                            <div className="mx-auto max-w-2xl lg:mx-0">
                                <h2 className="text-pretty text-4xl font-semibold tracking-tight font-serif text-gray-900 sm:text-5xl">JOB OFFERS</h2>
                                <p className="mt-2 text-lg/8 text-gray-600">Learn how to grow your business with our
                                    expert advice.</p>
                            </div>
                            <div className="flex justify-center gap-10 items-center">
                                <Search onSearch={handleSearch}/>
                                <Filter onLocationChange={handleLocationChange} onTypeChange={handleTypeChange} />
                            </div>
                            <div
                                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {searchedJobs.map((job) => (
                                    <JobCard key={job._id} title={job.title} location={job.location} type={job.type}
                                             company={job.company}
                                             description={job.description}
                                             createdBy={job.createdBy}/>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div
                    className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    aria-hidden="true">
                    <div
                        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-500 to-[#90d9f9] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        style={{clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"}}></div>
                </div>

            </div>
        </div>
    );
}

export default Page;
