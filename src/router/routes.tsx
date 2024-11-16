// src/router/routes.tsx
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, createBrowserRouter } from 'react-router-dom';
import AuthRedirect from '@/components/auth/AuthRedirect';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DefaultLayout from '@/components/layouts/DefaultLayout';
// import BlankLayout from '@/components/Layouts/BlankLayout';
import { PageLoader } from '@/components/ui/PageLoader';
// Lazy load pages
const Login = lazy(() => import('@/pages/Authentication/Login'));
const ForgotPassword = lazy(() => import('@/pages/Authentication/ForgotPassword'));
const ResetPassword = lazy(() => import('@/pages/Authentication/ResetPassword'));
const DashboardIndex = lazy(() => import('@/pages/Dashboard/Index'));
const DashboardMetrics = lazy(() => import('@/pages/Dashboard/Metrics'));
const DashboardReports = lazy(() => import('@/pages/Dashboard/Report'));
const UsersList = lazy(() => import('@/pages/Users/UserList'));
const UserDetails = lazy(() => import('@/pages/Users/UserDetails'));
const AccessControl = lazy(() => import('@/pages/AccessControl'));
const Settings = lazy(() => import('@/pages/Settings'));
const Profile = lazy(() => import('@/pages/Profile'));
const Security = lazy(() => import('@/pages/Security'));
const Categories = lazy(() => import('@/pages/Categories'));
const Products = lazy(() => import('@/pages/Products'));
const Providers = lazy(() => import('@/pages/Providers'));
const SupportTicketList = lazy(() => import('@/pages/SupportTickets/TicketList'));
const SupportTicketPreview = lazy(() => import('@/pages/SupportTickets/TicketPreview'));
const TierLimits = lazy(() => import('@/pages/TierLimits'));
const Generals = lazy(() => import('@/pages/Generals'));
// const FeeConfiguration = lazy(() => import('@/pages/home/systems/FeeConfiguration'));
// const SecuritySettings = lazy(() => import('@/pages/home/systems/SecuritySettings'));
const TransactionList = lazy(() => import('@/pages/Histories/TransactionList'));
const TransactionDetails = lazy(() => import('@/pages/Histories/TransactionDetails'));
const AuditLogs = lazy(() => import('@/pages/AuditLogs'));
const WebhookLogs = lazy(() => import('@/pages/WebhookLogs'));
// const Financials = lazy(() => import('@/pages/home/financials'));

export const router = createBrowserRouter([
    {
        // Auth routes
        path: '/auth',
        element: (
            <Suspense fallback={<PageLoader />}>
                <AuthRedirect>
                    <Outlet />
                </AuthRedirect>
            </Suspense>
        ),
        children: [
            { path: '', element: <Navigate to="login" replace /> },
            { path: 'login', element: <Login /> },
            { path: 'forgot-password', element: <ForgotPassword /> },
            { path: 'reset-password', element: <ResetPassword /> },
        ]
    },
    {
        // Protected routes
        path: '/app',
        element: (
            <Suspense fallback={<PageLoader />}>
                <ProtectedRoute>
                    <DefaultLayout>
                        <Outlet />
                    </DefaultLayout>
                </ProtectedRoute>
            </Suspense>
        ),
        children: [
            {
                path: 'dashboard',
                children: [
                    { path: '', element: <DashboardIndex /> },
                    { path: 'metrics', element: <DashboardMetrics /> },
                    { path: 'reports', element: <DashboardReports /> },
                ],
            },
            {
                path: 'users',
                children: [
                    { 
                        path: 'user-list', 
                        element: <UsersList />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null }
                        ] 
                    },
                    { path: 'user-details/:id', element: <UserDetails /> },
                    {
                        path: 'access-control',
                        element: <AccessControl />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit', element: null }
                        ]
                    }
                ]
            },
            {
                path: 'support-tickets',
                children: [
                    { 
                        path: 'list', 
                        element: <SupportTicketList />,
                        children: [
                            { path: 'filters', element: null }
                        ] 
                    },
                    { path: 'preview', element: <SupportTicketPreview /> },
                ],
            },
            // { path: 'financials', element: <Financials /> },
            {
                path: 'histories',
                children: [
                    { path: 'transaction-list', element: <TransactionList /> },
                    { path: 'transaction-details', element: <TransactionDetails /> },
                ],
            },
            {
                path: 'systems',
                children: [
                    { 
                        path: 'categories', 
                        element: <Categories />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null },
                        ] 
                    },
                    { 
                        path: 'products', 
                        element: <Products />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null },
                        ] 
                    },
                    { 
                        path: 'providers', 
                        element: <Providers />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null },
                            { path: 'configure', element: null }
                        ] 
                    },
                    // { path: 'fee-configuration', element: <FeeConfiguration /> },
                ],
            },
            {
                path: 'logs',
                children: [
                    { path: 'audits', element: <AuditLogs /> },
                    { path: 'webhooks', element: <WebhookLogs /> },
                ],
            },
            {
                path: 'settings',
                children: [
                    {
                        path: '',
                        element: <Settings />,
                        children: [
                            { path: '', element: <Navigate to="profile" replace /> },
                            { path: 'profile', element: <Profile /> },
                            { 
                                path: 'security', 
                                element: <Security />,
                                children: [
                                    { path: 'change-password', element: null },
                                    { path: 'change-pin', element: null },
                                ] 
                            }
                        ]
                    },
                    { 
                        path: 'tier-limits', 
                        element: <TierLimits />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null },
                        ]  
                    },
                    { 
                        path: 'generals', 
                        element: <Generals />,
                        children: [
                            { path: 'new', element: null },
                            { path: 'edit/:id', element: null },
                        ] 
                    }
                ]
            }
        ]
    },
    // {
    //     // Catch-all route
    //     path: '*',
    //     element: <Navigate to="/auth/login" replace />,
    // }
]);

export default router;
