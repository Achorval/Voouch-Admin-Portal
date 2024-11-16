// src/context/ThemeContext.tsx
import i18next from 'i18next';
import themeConfig from '../theme.config';
import LocalStorageUtil from '../utilities/storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

type ThemeType = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: string;
    menu: string;
    layout: string;
    rtlClass: string;
    animation: string;
    navbar: string;
    locale: string;
    semidark: boolean;
    isDarkMode: boolean;
    sidebar: boolean;
    toggleTheme: (theme: ThemeType) => void;
    toggleMenu: (menu: string) => void;
    toggleLayout: (layout: string) => void;
    toggleRTL: (rtl: string) => void;
    toggleAnimation: (animation: string) => void;
    toggleNavbar: (navbar: string) => void;
    toggleSemidark: (semidark: boolean) => void;
    toggleLocale: (locale: string) => void;
    toggleSidebar: () => void;
    setPageTitle: (title: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initial states with temporary default values (e.g., null or themeConfig values)
    const [theme, setTheme] = useState<string | null>(null);
    const [menu, setMenu] = useState<string | null>(null);
    const [layout, setLayout] = useState<string | null>(null);
    const [rtlClass, setRtlClass] = useState<string | null>(null);
    const [animation, setAnimation] = useState<string | null>(null);
    const [navbar, setNavbar] = useState<string | null>(null);
    const [locale, setLocale] = useState<string | null>(null);
    const [semidark, setSemidark] = useState<boolean | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const [sidebar, setSidebar] = useState<boolean>(false);

    // Type guard functions to check for specific types
    const isString = (value: any): value is string => typeof value === 'string';
    const isBoolean = (value: any): value is boolean => typeof value === 'boolean';

    useEffect(() => {
        (async () => {
            const savedTheme = await LocalStorageUtil.get('theme');
            const savedMenu = await LocalStorageUtil.get('menu');
            const savedLayout = await LocalStorageUtil.get('layout');
            const savedRtlClass = await LocalStorageUtil.get('rtlClass');
            const savedAnimation = await LocalStorageUtil.get('animation');
            const savedNavbar = await LocalStorageUtil.get('navbar');
            const savedLocale = await LocalStorageUtil.get('i18nextLng');
            const savedSemidark = await LocalStorageUtil.get('semidark');
            const savedSidebar = await LocalStorageUtil.get('sidebar');

            // Use type guards or assertions to ensure compatibility with state types
            setTheme(isString(savedTheme) ? savedTheme : themeConfig.theme);
            setMenu(isString(savedMenu) ? savedMenu : themeConfig.menu);
            setLayout(isString(savedLayout) ? savedLayout : themeConfig.layout);
            setRtlClass(isString(savedRtlClass) ? savedRtlClass : themeConfig.rtlClass);
            setAnimation(isString(savedAnimation) ? savedAnimation : themeConfig.animation);
            setNavbar(isString(savedNavbar) ? savedNavbar : themeConfig.navbar);
            setLocale(isString(savedLocale) ? savedLocale : themeConfig.locale);
            setSemidark(isBoolean(savedSemidark) ? savedSemidark : themeConfig.semidark);
            setSidebar(isBoolean(savedSidebar) ? savedSidebar : false);
        })();
    }, []);

    useEffect(() => {
        if (theme === 'system') {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const handleChange = (e: MediaQueryListEvent) => setIsDarkMode(e.matches);
            mediaQuery.addEventListener('change', handleChange);
            setIsDarkMode(mediaQuery.matches);

            return () => mediaQuery.removeEventListener('change', handleChange);
        } else {
            setIsDarkMode(theme === 'dark');
        }
    }, [theme]);

    useEffect(() => {
        document.body.classList.toggle('dark', isDarkMode);
    }, [isDarkMode]);

    const toggleTheme = (newTheme: ThemeType) => {
        LocalStorageUtil.set('theme', newTheme);
        setTheme(newTheme);
    };

    const toggleMenu = (newMenu: string) => {
        LocalStorageUtil.set('menu', newMenu);
        setSidebar(false);
        setMenu(newMenu);
    };

    const toggleLayout = (newLayout: string) => {
        LocalStorageUtil.set('layout', newLayout);
        setLayout(newLayout);
    };

    const toggleRTL = (newRtl: string) => {
        LocalStorageUtil.set('rtlClass', newRtl);
        setRtlClass(newRtl);
        document.documentElement.setAttribute('dir', newRtl || 'ltr');
    };

    const toggleAnimation = (newAnimation: string) => {
        LocalStorageUtil.set('animation', newAnimation.trim());
        setAnimation(newAnimation.trim());
    };

    const toggleNavbar = (newNavbar: string) => {
        LocalStorageUtil.set('navbar', newNavbar);
        setNavbar(newNavbar);
    };

    const toggleSemidark = (newSemidark: boolean) => {
        LocalStorageUtil.set('semidark', newSemidark);
        setSemidark(newSemidark);
    };

    const toggleLocale = (newLocale: string) => {
        LocalStorageUtil.set('i18nextLng', newLocale);
        i18next.changeLanguage(newLocale);
        setLocale(newLocale);
    };

    const toggleSidebar = () => {
        const newState = !sidebar;
        LocalStorageUtil.set('sidebar', newState);
        setSidebar(newState);
    };

    const setPageTitle = (title: string) => {
        document.title = `${title} | VRISTO - Multipurpose Tailwind Dashboard Template`;
    };

    const value = {
        theme: theme || themeConfig.theme,
        menu: menu || themeConfig.menu,
        layout: layout || themeConfig.layout,
        rtlClass: rtlClass || themeConfig.rtlClass,
        animation: animation || themeConfig.animation,
        navbar: navbar || themeConfig.navbar,
        locale: locale || themeConfig.locale,
        semidark: semidark ?? themeConfig.semidark,
        isDarkMode,
        sidebar,
        toggleTheme,
        toggleMenu,
        toggleLayout,
        toggleRTL,
        toggleAnimation,
        toggleNavbar,
        toggleSemidark,
        toggleLocale,
        toggleSidebar,
        setPageTitle,
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
