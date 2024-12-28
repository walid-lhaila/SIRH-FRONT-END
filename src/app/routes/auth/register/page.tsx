"use client"
import React, {useState} from 'react';
import Input from '@/app/components/UI/input';
import Link from "next/link";
import {useAppDispatch, useAppSelector} from "@/lib/frontend/redux/hooks";
import {register} from "@/lib/frontend/redux/slices/authSlice";
function Page() {
    const dispatch = useAppDispatch();
    const {isLoading, error} = useAppSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await dispatch(register(formData));
    };
    return (
        <div>
            <section className="bg-gradient-to-t from-[#90d9f9] via-sky-50 to-sky-200 ">
                <div className="flex justify-center min-h-screen">
                    <div className=" bg-cover w-[1100px]" style={{
                        backgroundImage: `url('/images/bg1.jpeg')`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        height: '967px'
                    }}></div>

                    <div className="flex items-center w-full max-w-3xl px-8 mx-auto lg:px-12 lg:w-3/5">

                        <div className="w-full">
                            <div className="flex justify-center items-center mb-10">
                                <h1 className="px-10 py-2 font-bold text-3xl  lg:text-6xl italic bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 inline-block text-transparent bg-clip-text">S
                                    I R H</h1>
                            </div>
                            <h1 className="text-3xl font-semibold font-mono tracking-wider text-black capitalize">
                                Get your free account now.
                            </h1>

                            <p className="mt-4 text-black font-mono mb-10">
                                Let’s get you all set up so you can verify your personal account and begin setting up
                                your profile.
                            </p>


                            <div id="forms-container"
                                 className="flex overflow-hidden transition-transform transform ease-in-out duration-500">
                                <div id="clientForm" className="w-full">
                                    <form onSubmit={handleSubmit}
                                        className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 ">
                                        <Input handleChange={handleChange} label="First Name" name="firstName" value={formData.firstName} placeholder="Walid" type="text" className="text-black" />

                                        <Input handleChange={handleChange} label="Last Name" name="lastName" value={formData.lastName} placeholder="Lhaila" type="text" className="text-black" />

                                        <Input handleChange={handleChange} label="Email Address" name="email" value={formData.email} placeholder="example@gmail.com" type="email" className="text-black" />

                                        <Input handleChange={handleChange} label="Username" name="username" value={formData.username} placeholder="example@1" type="text" className="text-black" />

                                        <Input handleChange={handleChange} label="Password" name="password" value={formData.password} placeholder="***********" type="password" className="text-black" />


                                        <button type="submit"
                                                className="flex items-center justify-between w-full px-6 h-12 mt-7 text-sm tracking-wide text-black capitalize transition-colors duration-300 transform bg-gradient-to-r from-blue-600 via-blue-400 to-white rounded-lg hover:bg-gradient-to-l from-blue-100 via-blue-400 to-blue-600 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                            <span className="text-white font-medium font-serif">Sign Up </span>

                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 className="w-5 h-5 rtl:-scale-x-100 text-blue-900" viewBox="0 0 20 20"
                                                 fill="currentColor">
                                                <path fillRule="evenodd"
                                                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                      clipRule="evenodd"/>
                                            </svg>
                                        </button>
                                        {error && <p className="text-red-500 col-span-2">{error}</p>}

                                    </form>
                                    <div className="flex justify-center items-center mt-10 gap-3">
                                        <div className="w-48 h-[2px] bg-black"></div>
                                        <div>
                                            <Link href="/routes/auth/login"
                                                className="text-black cursor-pointer text-sm hover:underline font-serif">Or
                                                Sign
                                                in
                                            </Link>
                                        </div>
                                        <div className="w-48 h-[2px] bg-black"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Page;