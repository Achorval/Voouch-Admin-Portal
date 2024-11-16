// src/pages/Authentication/Login.tsx
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import Dropdown from '../../components/ui/Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import IconMail from '../../components/Icon/IconMail';
import { zodResolver } from '@hookform/resolvers/zod';
import IconLockDots from '../../components/Icon/IconLockDots';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { Input } from '@/components/ui/Input';
import { LockClosedIcon, EnvelopeIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/Button';

const loginSchema = z.object({
    identifier: z.string().email('Invalid username or email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const { locale, rtlClass, toggleRTL, setPageTitle } = useTheme();
    const isRtl = rtlClass === 'rtl' ? true : false;
    
    useEffect(() => {
        setPageTitle('Login');
    });

    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            toggleRTL('rtl');
        } else {
            toggleRTL('ltr');
        }
    };
    const [flag, setFlag] = useState(locale);

    const { signIn, isLoading, error } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await signIn(data);
        } catch (error) {
            // Error is handled by useAuth hook
            console.error('Login error:', error);
        }
    };

    return (
        <div className="text-black dark:text-white-dark min-h-screen">
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[550px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto mb-20">
                            <img className="w-40 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo.png" alt="logo" />
                        </div>
                        <div className="mx-auto w-full">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">Welcome back!</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">Enter your email and password to login</p>
                            </div>
                            <form className="space-y-5 dark:text-white mb-10 md:mb-[40px]" onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="Email"
                                    type="text"
                                    placeholder="Enter Email"
                                    {...register('identifier')}
                                    error={errors.identifier?.message}
                                    startIcon={<EnvelopeIcon className="w-5 h-5" />}
                                />
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="Enter Password"
                                    {...register('password')}
                                    error={errors.password?.message}
                                    startIcon={<LockClosedIcon className="w-5 h-5" />}
                                />
                                <Button type="submit" className="w-full" loading={isLoading}>
                                    SIGN IN
                                </Button>
                            </form>
                            <div className="text-center dark:text-white">
                                <Link to="/auth/forgot-password" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;