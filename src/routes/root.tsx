import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { useData } from '@/stores/DataContext';

import SideBar from '@/components/SideBar';

import * as styles from '@/routes/root.css';

export default function Root() {
    const navigate = useNavigate();

    const { tracks, images, vicar } = useData();

    useEffect(() => {
        if (tracks.length < 1 && images.length < 1 && Object.keys(vicar).length < 1) {
            navigate('/', { replace: true });
        }
    }, []);

    return (
        <main className={styles.container}>
            <SideBar />
            <Outlet />
        </main>
    );
}