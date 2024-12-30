"use client"
import React, {useEffect, useState} from 'react';
import Navbar from "@/app/components/navbar";
import {useAppDispatch, useAppSelector} from "@/lib/frontend/redux/hooks";
import {getAllJobs} from "@/lib/frontend/redux/slices/jobSlice";


function Page({params} : {params: {id: string}}) {
    const [loading, setLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState(null);
    const {  items: allJobs, loading: jobsLoading } = useAppSelector((state) => state.jobs);
    const dispatch = useAppDispatch();
    const jobId = params.id;

    useEffect(() => {
        const fetchJobDetails = async () => {
            if (allJobs.length === 0 && !jobsLoading) {
                await dispatch(getAllJobs());
            }
            setLoading(false);
        };
        fetchJobDetails();
    }, [dispatch, allJobs, jobsLoading]);

    useEffect(() => {
        if (allJobs.length > 0) {
            const job = allJobs.find((job) => job._id === jobId);
            setJobDetails(job);
        }
    }, [allJobs, jobId]);

    if (loading || jobsLoading) {
        return (
            <>
                <Navbar />
                <div className="pt-24 w-[70%] mx-auto">
                    <p>Loading job details ...</p>
                </div>
            </>
        );
    }

    if (!jobDetails) {
        return (
            <>
                <Navbar />
                <div className="pt-24 w-[70%] mx-auto">
                    <p>Job not found</p>
                </div>
            </>
        );
    }


    return (
        <>
            <Navbar/>
            <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-[#90d9f9] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                     style={{
                         clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
                     }}>
                </div>
            </div>
            <div className="pt-24 w-[70%] mx-auto">
                <div className="px-4 sm:px-0">
                    <h3 className="font-semibold text-5xl font-serif text-gray-900">Job Détails</h3>
                    <p className="mt-1 max-w-2xl text-sm/6 font-mono text-gray-700">Job details and application.</p>
                </div>
                <form className="mt-6 border-t border-gray-100">

                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.title}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.description}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Company</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.company}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Created By</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.createdBy}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.location}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Type</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{jobDetails.type}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Salary</dt>
                            <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">${jobDetails.salary}</dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                    <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                        <input
                                            className="block w-full text-sm text-gray-900 cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400"
                                            aria-describedby="file_input_help" id="file_input" type="file"/>
                                        <input type="hidden" name="status" value="pending"/>
                                    </li>
                                </ul>
                            </dd>
                        </div>
                        <div className='flex justify-center py-10'>
                            <button
                                className='text-center text-white font-bold  font-serif px-10 py-2 rounded bg-sky-500 hover:bg-sky-600 duration-300'>Apply
                            </button>
                        </div>
                    </dl>
                </form>
            </div>
        </>
    );
}

export default Page;