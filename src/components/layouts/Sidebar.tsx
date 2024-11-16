import {
    HomeIcon,
    BoltIcon,
    MinusIcon,
    TicketIcon,
    QueueListIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    Squares2X2Icon,
    ShieldCheckIcon,
    ChevronDownIcon,
    ChevronDoubleDownIcon,
    WrenchScrewdriverIcon,
    ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/solid';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AnimateHeight from 'react-animate-height';
import { useTheme } from '@/context/ThemeContext';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const { sidebar, semidark, toggleSidebar } = useTheme();

    const location = useLocation();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && sidebar) {
            toggleSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center px-4 py-3">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo-icon.png" alt="logo" />
                            <span className="text-2xl ltr:ml-1.5 rtl:mr-1.5 font-semibold align-middle lg:inline dark:text-white-light">VOOUCH</span>
                        </NavLink>
                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => toggleSidebar()}
                        >
                            <ChevronDoubleDownIcon className="m-auto w-5 h-5 rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                                    <div className="flex items-center">
                                        <HomeIcon
                                        className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('dashboard')}</span>
                                    </div>

                                    <div className={currentMenu !== 'dashboard' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>

                                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/app/dashboard">{t('sales')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/dashboard/metrics">{t('metrics')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/dashboard/reports">{t('reports')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <MinusIcon className="w-4 h-5 flex-none hidden" />
                                <span>{t('manage_users')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'users' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('users')}>
                                    <div className="flex items-center">
                                        <UserGroupIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('users')}</span>
                                    </div>

                                    <div className={currentMenu !== 'users' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'users' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/app/users/user-list">{t('user_list')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/users/user-details">{t('user_details')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/users/access-control">{t('access_control')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'kycs' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('kycs')}>
                                    <div className="flex items-center">
                                        <ShieldCheckIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('kycs')}</span>
                                    </div>

                                    <div className={currentMenu !== 'kycs' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'kycs' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/kycs/verification-requests">
                                                {t('verification_requests')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/kycs/document-review" target="_blank">
                                                {t('document_review')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'messaging' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('messaging')}>
                                    <div className="flex items-center">
                                        <ChatBubbleLeftRightIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('messaging')}</span>
                                    </div>

                                    <div className={currentMenu !== 'messaging' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'messaging' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/messaging/sms-box">
                                                {t('sms_box')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/messaging/mail-box">
                                                {t('mail_box')}
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/messaging/push-box">
                                                {t('push_box')}
                                            </NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <MinusIcon className="w-4 h-5 flex-none hidden" />
                                <span>{t('manage_histories')}</span>
                            </h2>

                            <li className="nav-item">
                                <ul>
                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'transactions' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('transactions')}>
                                            <div className="flex items-center">
                                                <QueueListIcon className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('transactions')}</span>
                                            </div>

                                            <div className={currentMenu !== 'transactions' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <ChevronDownIcon className="w-4 h-4" />
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'transactions' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/app/histories/transaction-list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/app/histories/transaction-details">{t('preview')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>

                                    <li className="menu nav-item">
                                        <button type="button" className={`${currentMenu === 'support_tickets' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('support_tickets')}>
                                            <div className="flex items-center">
                                                <TicketIcon className="group-hover:!text-primary shrink-0" />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('support_tickets')}</span>
                                            </div>
                                            <div className={currentMenu !== 'support_tickets' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                                <ChevronDownIcon className="w-4 h-4" />
                                            </div>
                                        </button>
                                        <AnimateHeight duration={300} height={currentMenu === 'support_tickets' ? 'auto' : 0}>
                                            <ul className="sub-menu text-gray-500">
                                                <li>
                                                    <NavLink to="/app/support-tickets/list">{t('list')}</NavLink>
                                                </li>
                                                <li>
                                                    <NavLink to="/app/support-tickets/preview">{t('preview')}</NavLink>
                                                </li>
                                            </ul>
                                        </AnimateHeight>
                                    </li>
                                </ul>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <MinusIcon className="w-4 h-5 flex-none hidden" />
                                <span>{t('system_administration')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'systems' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('systems')}>
                                    <div className="flex items-center">
                                        <Squares2X2Icon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('systems')}</span>
                                    </div>

                                    <div className={currentMenu !== 'systems' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'systems' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/app/systems/categories">{t('categories')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/systems/products">{t('products')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/systems/providers">{t('providers')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'logs' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('logs')}>
                                    <div className="flex items-center">
                                        <BoltIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('logs')}</span>
                                    </div>

                                    <div className={currentMenu !== 'logs' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'logs' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/app/logs/audits">{t('audit_logs')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/logs/webhooks">{t('webhook_logs')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <MinusIcon className="w-4 h-5 flex-none hidden" />
                                <span>{t('configurations')}</span>
                            </h2>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'settings' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('settings')}>
                                    <div className="flex items-center">
                                        <Cog6ToothIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('settings')}</span>
                                    </div>

                                    <div className={currentMenu !== 'settings' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'settings' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/app/settings/profile">{t('profile')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/settings/generals">{t('generals')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/app/settings/tier-limits">{t('tier_limits')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>

                            <li className="menu nav-item">
                                <button type="button" className={`${currentMenu === 'emails' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('emails')}>
                                    <div className="flex items-center">
                                        <WrenchScrewdriverIcon className="group-hover:!text-primary shrink-0" />
                                        <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('emails')}</span>
                                    </div>

                                    <div className={currentMenu !== 'emails' ? 'rtl:rotate-90 -rotate-90' : ''}>
                                        <ChevronDownIcon className="w-4 h-4" />
                                    </div>
                                </button>
                                <AnimateHeight duration={300} height={currentMenu === 'emails' ? 'auto' : 0}>
                                    <ul className="sub-menu text-gray-500">
                                        <li>
                                            <NavLink to="/emails/email-setup">{t('email_setup')}</NavLink>
                                        </li>
                                        <li>
                                            <NavLink to="/emails/email-template">{t('email_template')}</NavLink>
                                        </li>
                                    </ul>
                                </AnimateHeight>
                            </li>
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;