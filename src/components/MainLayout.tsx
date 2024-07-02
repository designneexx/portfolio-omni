import { Grid } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export function MainLayout() {
    return (
        <Grid
            gridTemplateColumns='100%'
            gridTemplateRows='max-content 1fr'
            height='100%'
            overflow='hidden'
        >
            <Navbar />
            <Outlet />
        </Grid>
    );
}
