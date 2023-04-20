import Home from './Page/Home';
import BusinessCard from './Page/BusinessCard';
import About from './Page/About';
import Contact from './Page/Contact';
import NotFound from './Page/NotFound';
import Navigation from './Navigation'

import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

export default function Router() {

    const Layout = () => {
        return(
        <>
            <Navigation />
            <Outlet />
        </>
        )
    }




    const BrowserRoutes = () => {


        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/BusinessCard" element={<BusinessCard />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound></NotFound>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        )
    }

    return (
        <BrowserRoutes />
    )
}