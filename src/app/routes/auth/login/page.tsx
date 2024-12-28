import React from 'react';
import Link from 'next/link';
import Input from '@/app/components/UI/input';

function Page() {
    return (
        <div
            className=" bg-gradient-to-t from-[#90d9f9] via-sky-50 to-sky-200  flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-md shadow-[#79C5EF]/70 mt-32 lg:max-w-6xl">
            <div className="hidden bg-cover lg:block lg:w-1/2"
                 style={{backgroundImage: `url('/images/bg1.jpeg')`,}}></div>

            <div className="w-full px-6 py-16 md:px-8 lg:w-1/2 h-[710px]">
                <div className="flex justify-center mx-auto">
                    <h1 className="px-10 py-2 font-bold text-6xl italic bg-gradient-to-r from-blue-500 via-blue-600 to-blue-400 inline-block text-transparent bg-clip-text">SIRH</h1>
                </div>

                <p className="text-xl text-center font-medium font-serif text-black dark:text-black pt-20">
                    Welcome !
                </p>

                <a href=""
                   className="flex items-center justify-center mt-4 text-white bg-sky-400 transition-colors duration-300 transhtmlForm border rounded-lg  dark:hover:bg-sky-200 hover:text-black">
                    <div className="px-4 py-2">
                        <svg className="w-6 h-6" viewBox="0 0 40 40">
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#FFC107"/>
                            <path
                                d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                                fill="#FF3D00"/>
                            <path
                                d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                                fill="#4CAF50"/>
                            <path
                                d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                                fill="#1976D2"/>
                        </svg>
                    </div>

                    <span className="w-5/6 px-4 py-3 font-bold text-white text-center">Sign in with Google</span>
                </a>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-black lg:w-1/4"></span>

                    <a href="#" className="text-xs text-center uppercase text-black hover:underline">or
                        login
                        with email</a>

                    <span className="w-1/5 border-b dark:border-black lg:w-1/4"></span>
                </div>

                <form className="mt-4">

                    <Input label="Username" name="firstName" placeholder="" type="text" className="text-black" />

                    <div className="mt-4">
                    <Input label="Password" name="firstName" placeholder="" type="text" className="text-black" />

                    </div>

                    <div className="mt-6">
                        <button type="submit"
                                className="w-full px-6 py-3 text-sm font-medium  text-white capitalize transition-colors duration-300 transhtmlForm bg-gradient-to-l from-blue-600 via-blue-500 to-white hover:bg-gradient-to-r from-white via-sky-500 to-sky-600 border-2 rounded-lg focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign In
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-black md:w-1/4"></span>

                    <Link href="/routes/auth/register" className="text-xs  uppercase text-black hover:underline">or sign up</Link>

                    <span className="w-1/5 border-b dark:border-black md:w-1/4"></span>
                </div>
            </div>
        </div>
    );
}

export default Page;