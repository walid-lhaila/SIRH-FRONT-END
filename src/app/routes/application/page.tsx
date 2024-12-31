"use client"
import React, {useEffect} from 'react';
import Navbar from "@/app/components/navbar";
import ApplicationCard from "@/app/components/UI/applicationCard";
import {useAppDispatch, useAppSelector} from "@/lib/frontend/redux/hooks";
import {getAllApplication} from "@/lib/frontend/redux/slices/applicationSlice";

function Page() {
    const dispatch = useAppDispatch();
    const { applications } = useAppSelector((state) => state.application);
    useEffect(() => {
        dispatch(getAllApplication());
    }, [dispatch]);

    return (
        <div className="bg-white">
            <Navbar/>

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
                                <h2 className="text-pretty text-4xl font-semibold tracking-tight font-serif text-gray-900 sm:text-5xl">MY APPLICATIONS</h2>
                            </div>
                            <div
                                className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                                {applications.map((application) => (
                                    <ApplicationCard key={application._id} id={application._id} status={application.status} title={application.title} location={application.location} type={application.type} company={application.company} description={application.description} createdBy={application.createdBy}/>
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