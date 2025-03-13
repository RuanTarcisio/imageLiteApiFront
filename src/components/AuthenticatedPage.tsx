import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/resource';

interface AuthenticatedPageProps {
    children: React.ReactNode;
}

export default function AuthenticatedPage({ children }: AuthenticatedPageProps) {
    const auth = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (!auth.isSessionValid()) {
            router.push('/login');
        }
    }, [auth, router]);

    if (!isClient || !auth.isSessionValid()) {
        return null;
    }

    return <>{children}</>;
}