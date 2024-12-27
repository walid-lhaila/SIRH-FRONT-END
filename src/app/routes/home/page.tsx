'use client'
import React, {useEffect, useState} from 'react';
import JobCard from "@/app/components/UI/jobCard";
import Navbar from "@/app/components/navbar";
import {useAppDispatch, useAppSelector} from "@/lib/frontend/redux/hooks";
import {getAllJobs} from "@/lib/frontend/redux/slices/jobSlice";
import Search from "@/app/components/UI/search";

function Page() {
    const dispatch = useAppDispatch();
    const { items: jobs, loading, error } = useAppSelector((state) => state.jobs);
    const [searchedJobs, setSearchedJobs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        dispatch(getAllJobs());
    }, [dispatch]);


    useEffect(() => {
        if(searchTerm) {
            setSearchedJobs(
                jobs.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        } else {
            setSearchedJobs(jobs);
        }
    }, [searchTerm, jobs])

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

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
                                </form>

                            </div>
                            <div
                                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {searchedJobs.map((job) => (
                                    <JobCard key={job._id} title={job.title} location="Casablanca" type="Full Time"
                                             company="Cegidim"
                                             description="Responsible for developing and maintaining web applications."
                                             createdBy="Walid Lhaila"/>
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
