import React, {useState} from 'react';
import {toast} from "react-toastify";
import {useAppDispatch} from "@/lib/frontend/redux/hooks";
import {apply} from "@/lib/frontend/redux/slices/applicationSlice";
import {useRouter} from "next/navigation";


interface ApplicationData {
    _id?: string;
    title: string;
    description: string;
    company: string;
    createdBy: string;
    location: string;
    type: string;
    status: "pending" | "accepted" | "rejected";
    cv: File;
}

interface ApplicationFormProps {
    location: string;
    type: string;
    title: string;
    description: string;
    company: string;
    createdBy: string;
}

function ApplicationForm({title, description, company, createdBy, location, type}: ApplicationFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const [cv, setCv] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(!token){
            toast.error('You Are Not Logged Yet');
            router.push('/routes/auth/login');
            return;
        }
        if(!cv) {
            toast.error('Please Upload Your Cv');
            return;
        }

        const applicationData: ApplicationData = {
            cv: cv!,
            title: title,
            description: description,
            company: company,
            createdBy: createdBy,
            location: location,
            type: type,
            status: 'pending',
        };

        const result = await dispatch(apply(applicationData));
        if (apply.fulfilled.match(result)) {
            toast.success('Applying Successfully');
            router.push('/routes/application');
        } else {
            toast.error('Failed to apply');
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Title</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{title}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Description</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{description}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Company</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{company}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Created By</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{createdBy}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{location}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Type</dt>
                        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{type}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm/6 font-medium text-gray-900">Attachments</dt>
                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">

                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                    <input onChange={(e) => setCv(e.target.files?.[0] || null)} className="block w-full text-sm text-gray-900 cursor-pointer dark:text-gray-400 focus:outline-none  dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
                                    <input type="hidden" name="status" value="pending"/>
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div className='flex justify-center py-10'>
                        <button type="submit"
                            className='text-center text-white font-bold  font-serif px-10 py-2 rounded bg-sky-500 hover:bg-sky-600 duration-300'>Apply
                        </button>
                    </div>
                </dl>
            </form>
        </div>
    );
}

export default ApplicationForm;