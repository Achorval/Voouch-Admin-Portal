import router from './router/routes';
import { RouterProvider } from 'react-router-dom';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

// Context
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
    const queryClient = new QueryClient();

    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <RouterProvider router={router} />
                </ThemeProvider>
            </QueryClientProvider>
        </AuthProvider>
    );
}

export default App;