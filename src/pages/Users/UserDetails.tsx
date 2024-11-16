import { useEffect } from 'react';
import { 
    PhoneIcon, 
    TrashIcon, 
    MapPinIcon, 
    FunnelIcon, 
    CpuChipIcon, 
    CalendarIcon, 
    EnvelopeIcon, 
    ArchiveBoxIcon, 
    ShoppingBagIcon,
    PencilSquareIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '@/context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const navigate = useNavigate();

    const { setPageTitle } = useTheme();

    useEffect(() => {
        setPageTitle('Profile');
    });
    
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="/app/users/user-list" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>User Details</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-5">
                    <div className="panel h-full">
                        <div className="flex items-center mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Personal Information</h5>
                        </div>
                        <div className="mb-5">
                            <div className="flex flex-col justify-center items-center">
                                <img src="/assets/images/profile-34.jpeg" alt="img" className="w-24 h-24 rounded-full object-cover  mb-5" />
                                <p className="font-semibold text-primary text-xl">Jimmy Turner</p>
                            </div>
                            <ul className="mt-5 flex flex-col max-w-[160px] m-auto space-y-4 font-semibold text-white-dark">
                                <li className="flex items-center gap-2">
                                    <CpuChipIcon className="shrink-0 w-5 h-5" />
                                    Web Developer
                                </li>
                                <li className="flex items-center gap-2">
                                    <CalendarIcon className="shrink-0 w-5 h-5" />
                                    Jan 20, 1989
                                </li>
                                <li className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5 shrink-0" />
                                    New York, USA
                                </li>
                                <li>
                                    <button className="flex items-center gap-2">
                                        <EnvelopeIcon className="w-5 h-5 shrink-0" />
                                        <span className="text-primary truncate">jimmy@gmail.com</span>
                                    </button>
                                </li>
                                <li className="flex items-center gap-2">
                                    <PhoneIcon className="w-5 h-5" />
                                    <span className="whitespace-nowrap" dir="ltr">
                                        +1 (530) 555-12121
                                    </span>
                                </li>
                            </ul>
                            <div className="mt-7 flex flex-col xl:flex-row gap-2">
                                <button className="button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 h-11 px-8 py-2 w-full">
                                    <span className="flex items-center justify-center">
                                        <TrashIcon className="w-4 h-4" />
                                        <span className="ltr:ml-1 rtl:mr-1">Delete</span>
                                    </span>
                                </button>
                                <button className="button bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white h-11 px-8 py-2 w-full">
                                    <span className="flex items-center justify-center">
                                        <PencilSquareIcon className="w-4 h-4" />
                                        <span className="ltr:ml-1 rtl:mr-1">Edit</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="panel lg:col-span-2 xl:col-span-3 h-full">
                        <div className="flex items-center justify-between mb-5">
                            <h5 className="font-semibold text-lg dark:text-white-light">Account Details</h5>
                            <button type="button" className="inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border dark:backdrop-blur hover:text-primary hover:border-primary h-[34px] pe-3 ps-2.5" onClick={() => navigate('/app/support-tickets/list/filters')}>
                                <FunnelIcon className="ltr:mr-2 rtl:ml-2 w-5 h-5" />
                                Filters
                            </button>
                        </div>
                        <div className="border border-[#ebedf2] rounded dark:bg-[#1b2e4b] dark:border-0 mb-5">
                            <div className="flex items-center justify-between p-4 py-2">
                                <div className="grid place-content-center w-9 h-9 rounded-md bg-secondary-light dark:bg-secondary text-secondary dark:text-secondary-light">
                                    <ShoppingBagIcon className="w-5 h-5" />
                                </div>
                                <div className="ltr:ml-4 rtl:mr-4 flex items-center justify-between flex-auto font-semibold">
                                    <h6 className="text-white-dark text-[13px] dark:text-white-dark">
                                        Account Status
                                        <span className="block text-base text-[#515365] dark:text-white-light">$92,600</span>
                                    </h6>
                                    <button type="button" className="inline-flex font-medium items-center justify-center active:enabled:translate-y-px focus:outline-none focus-visible:ring-[1.8px] focus-visible:ring-offset-2 transition-colors duration-200 px-4 py-2 text-sm rounded-md bg-transparent border dark:backdrop-blur hover:text-primary hover:border-primary h-[34px] pe-3 ps-2.5" onClick={() => navigate('/app/support-tickets/list/filters')}>
                                        <ArchiveBoxIcon className="ltr:mr-2 rtl:ml-2 w-5 h-5" />
                                        Change Status
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <div className="table-responsive text-[#515365] dark:text-white-light font-semibold">
                                <table className="whitespace-nowrap">
                                    <thead>
                                        <tr>
                                            <th>Projects</th>
                                            <th>Progress</th>
                                            <th>Task Done</th>
                                            <th className="text-center">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="dark:text-white-dark">
                                        <tr>
                                            <td>Figma Design</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-danger rounded-full w-[29.56%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">29.56%</td>
                                            <td className="text-center">2 mins ago</td>
                                        </tr>
                                        <tr>
                                            <td>Vue Migration</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-info rounded-full w-1/2"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">50%</td>
                                            <td className="text-center">4 hrs ago</td>
                                        </tr>
                                        <tr>
                                            <td>Flutter App</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-warning rounded-full  w-[39%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-danger">39%</td>
                                            <td className="text-center">a min ago</td>
                                        </tr>
                                        <tr>
                                            <td>API Integration</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-success rounded-full  w-[78.03%]"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">78.03%</td>
                                            <td className="text-center">2 weeks ago</td>
                                        </tr>

                                        <tr>
                                            <td>Blog Update</td>
                                            <td>
                                                <div className="h-1.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex w-full">
                                                    <div className="bg-secondary  rounded-full  w-full"></div>
                                                </div>
                                            </td>
                                            <td className="text-success">100%</td>
                                            <td className="text-center">18 hrs ago</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-center justify-between mt-5">
                                <div className="text-sm text-gray-700 dark:text-gray-400">Page 1 of 1</div>
                                <ul className="inline-flex items-center space-x-1 rtl:space-x-reverse">
                                    <li>
                                        <button
                                            type="button"
                                            className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                        >
                                            <ChevronDoubleLeftIcon className="w-4 h-4" />
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                        >
                                            1
                                        </button>
                                    </li>
                                    <li>
                                        <button type="button" className="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-primary text-white dark:text-white-light dark:bg-primary">
                                            2
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="flex justify-center font-semibold px-3.5 py-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                        >
                                            3
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            type="button"
                                            className="flex justify-center font-semibold p-2 rounded-full transition bg-white-light text-dark hover:text-white hover:bg-primary dark:text-white-light dark:bg-[#191e3a] dark:hover:bg-primary"
                                        >
                                            <ChevronDoubleRightIcon className="w-4 h-4" />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="font-semibold text-lg dark:text-white-light">Card Details</h5>
                    </div>
                    <div>
                        <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex-none">
                                    <img src="/assets/images/card-americanexpress.svg" alt="img" />
                                </div>
                                <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        American Express
                                        <span className="block text-white-dark dark:text-white-light">Expires on 12/2025</span>
                                    </h6>
                                    <span className="badge bg-success ltr:ml-auto rtl:mr-auto">Primary</span>
                                </div>
                            </div>
                        </div>
                        <div className="border-b border-[#ebedf2] dark:border-[#1b2e4b]">
                            <div className="flex items-center justify-between py-2">
                                <div className="flex-none">
                                    <img src="/assets/images/card-mastercard.svg" alt="img" />
                                </div>
                                <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        Mastercard
                                        <span className="block text-white-dark dark:text-white-light">Expires on 03/2025</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between py-2">
                                <div className="flex-none">
                                    <img src="/assets/images/card-visa.svg" alt="img" />
                                </div>
                                <div className="flex items-center justify-between flex-auto ltr:ml-4 rtl:mr-4">
                                    <h6 className="text-[#515365] font-semibold dark:text-white-dark">
                                        Visa
                                        <span className="block text-white-dark dark:text-white-light">Expires on 10/2025</span>
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetails;