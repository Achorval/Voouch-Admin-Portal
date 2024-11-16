// src/pages/AccessControl/AddNewRoleModal.tsx
import { 
    UserPlusIcon, 
    UserGroupIcon, 
    EllipsisHorizontalIcon, 
} from '@heroicons/react/24/solid';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Dropdown from '@/components/ui/Dropdown';
import AddNewRoleModal from './AddNewRoleModal';
import AssignRoleModal from './AssignRoleModal';
import { useTheme } from '@/context/ThemeContext';
import { useState, useEffect, Fragment } from 'react';
import IconUserPlus from '../../components/Icon/IconUserPlus';

const AccessControl = () => {
    const navigate = useNavigate();
    const { rtlClass, setPageTitle } = useTheme();

    const isRtl = rtlClass === 'rtl' ? true : false;

    useEffect(() => {
        setPageTitle('Contacts');
    });

    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([
        {
            id: 1,
            path: 'profile-35.png',
            name: 'Alan Green',
            role: 'Web Developer',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+1 202 555 0197',
            posts: 25,
            followers: '5K',
            following: 500,
        },
        {
            id: 2,
            path: 'profile-35.png',
            name: 'Linda Nelson',
            role: 'Web Designer',
            email: 'linda@mail.com',
            location: 'Sydney, Australia',
            phone: '+1 202 555 0170',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 3,
            path: 'profile-35.png',
            name: 'Lila Perry',
            role: 'UX/UI Designer',
            email: 'lila@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0105',
            posts: 20,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 4,
            path: 'profile-35.png',
            name: 'Andy King',
            role: 'Project Lead',
            email: 'andy@mail.com',
            location: 'Tokyo, Japan',
            phone: '+1 202 555 0194',
            posts: 25,
            followers: '21.5K',
            following: 300,
        },
        {
            id: 5,
            path: 'profile-35.png',
            name: 'Jesse Cory',
            role: 'Web Developer',
            email: 'jesse@mail.com',
            location: 'Edinburgh, UK',
            phone: '+1 202 555 0161',
            posts: 30,
            followers: '20K',
            following: 350,
        },
        {
            id: 6,
            path: 'profile-35.png',
            name: 'Xavier',
            role: 'UX/UI Designer',
            email: 'xavier@mail.com',
            location: 'New York, USA',
            phone: '+1 202 555 0155',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 7,
            path: 'profile-35.png',
            name: 'Susan',
            role: 'Project Manager',
            email: 'susan@mail.com',
            location: 'Miami, USA',
            phone: '+1 202 555 0118',
            posts: 40,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 8,
            path: 'profile-35.png',
            name: 'Raci Lopez',
            role: 'Web Developer',
            email: 'traci@mail.com',
            location: 'Edinburgh, UK',
            phone: '+1 202 555 0135',
            posts: 25,
            followers: '21.5K',
            following: 350,
        },
        {
            id: 9,
            path: 'profile-35.png',
            name: 'Steven Mendoza',
            role: 'HR',
            email: 'sokol@verizon.net',
            location: 'Monrovia, US',
            phone: '+1 202 555 0100',
            posts: 40,
            followers: '21.8K',
            following: 300,
        },
        {
            id: 10,
            path: 'profile-35.png',
            name: 'James Cantrell',
            role: 'Web Developer',
            email: 'sravani@comcast.net',
            location: 'Michigan, US',
            phone: '+1 202 555 0134',
            posts: 100,
            followers: '28K',
            following: 520,
        },
        {
            id: 11,
            path: 'profile-35.png',
            name: 'Reginald Brown',
            role: 'Web Designer',
            email: 'drhyde@gmail.com',
            location: 'Entrimo, Spain',
            phone: '+1 202 555 0153',
            posts: 35,
            followers: '25K',
            following: 500,
        },
        {
            id: 12,
            path: 'profile-35.png',
            name: 'Stacey Smith',
            role: 'Chief technology officer',
            email: 'maikelnai@optonline.net',
            location: 'Lublin, Poland',
            phone: '+1 202 555 0115',
            posts: 21,
            followers: '5K',
            following: 200,
        },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        // setAddContactModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('User has been deleted successfully.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <Fragment>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Access Control</h2>
                <Button variant="primary" onClick={() => navigate('/app/users/access-control/new')}>
                    <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                    Add New Role
                </Button>
            </div>
            <div className="container mt-5">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    <div className="rounded-lg border border-muted dark:border-secondary-dark-light p-6">
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <div className="flex items-center">
                                <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                    <UserGroupIcon className="w-5 h-5" />
                                </div>
                                <p className="ltr:ml-3 rtl:mr-3 font-semibold text-xl dark:text-white-light">31.6K</p>
                            </div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<EllipsisHorizontalIcon className="text-black/70 dark:text-white/70 hover:!text-primary w-6 h-6" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">Edit</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-center">
                            <span>Paid Visits</span>
                        </div>
                        <Button className="w-full lg:mt-6" variant='outline-primary' startIcon={<UserPlusIcon className="w-4 h-4" />} onClick={() => navigate('/app/users/access-control/edit')}>
                            Assign Permission
                        </Button>
                    </div>
                    <div className="rounded-lg border border-muted dark:border-secondary-dark-light p-6">
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <div className="flex items-center">
                                <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                    <UserGroupIcon className="w-5 h-5" />
                                </div>
                                <p className="ltr:ml-3 rtl:mr-3 font-semibold text-xl dark:text-white-light">31.6K</p>
                            </div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<EllipsisHorizontalIcon className="text-black/70 dark:text-white/70 hover:!text-primary w-6 h-6" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">Edit</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-center">
                            <span>Paid Visits</span>
                        </div>
                        <Button className="w-full lg:mt-6" variant='outline-primary' startIcon={<UserPlusIcon className="w-4 h-4" />} onClick={() => navigate('/app/users/access-control/edit')}> 
                            Assign Permission
                        </Button>
                    </div>
                    <div className="rounded-lg border border-muted dark:border-secondary-dark-light p-6">
                        <div className="flex justify-between items-center dark:text-white-light mb-5">
                            <div className="flex items-center">
                                <div className="shrink-0 bg-primary/10 text-primary rounded-xl w-11 h-11 flex justify-center items-center dark:bg-primary dark:text-white-light">
                                    <UserGroupIcon className="w-5 h-5" />
                                </div>
                                <p className="ltr:ml-3 rtl:mr-3 font-semibold text-xl dark:text-white-light">31.6K</p>
                            </div>
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 5]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="hover:text-primary"
                                    button={<EllipsisHorizontalIcon className="text-black/70 dark:text-white/70 hover:!text-primary w-6 h-6" />}
                                >
                                    <ul>
                                        <li>
                                            <button type="button">Edit</button>
                                        </li>
                                        <li>
                                            <button type="button">Delete</button>
                                        </li>
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="text-center">
                            <span>Paid Visits</span>
                        </div>
                        <Button className="w-full lg:mt-6" variant='outline-primary' startIcon={<UserPlusIcon className="w-4 h-4" />} onClick={() => navigate('/app/users/access-control/edit')}>
                            Assign Permission
                        </Button>
                    </div>
                </div>
            </div>
            {/* Category Modal */}
            <AddNewRoleModal />
            <AssignRoleModal />
        </Fragment>
    );
};

export default AccessControl;
