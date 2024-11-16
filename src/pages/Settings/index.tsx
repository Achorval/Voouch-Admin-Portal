import { Link, NavLink, Outlet } from 'react-router-dom';
import { UserIcon, HomeIcon, PhoneIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Settings = () => {
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Settings
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Profile</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Settings</h5>
                </div>
                <div>
                    <ul className="sm:flex font-semibold border-b border-[#ebedf2] dark:border-[#191e3a] mb-5 whitespace-nowrap overflow-y-auto">
                        <li className="inline-block">
                            <NavLink
                                to="/app/settings/profile"
                                className={({ isActive }) => `flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${isActive ? "!border-primary text-primary" : ""}`}
                            >
                                <HomeIcon className="w-5 h-5" />
                                Profile
                            </NavLink>
                        </li>
                        <li className="inline-block">
                            <NavLink
                                to="/app/settings/security"
                                className={({ isActive }) => `flex gap-2 p-4 border-b border-transparent hover:border-primary hover:text-primary ${isActive ? "!border-primary text-primary" : ""}`}
                            >
                                <LockClosedIcon className="w-5 h-5" />
                                Security
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default Settings;
