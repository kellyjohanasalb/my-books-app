import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/home/home'
import PrivatedRoutes from './privatedRoutes'
import PublicRoutes from './publicRoutes'
import Login from '../pages/login/login'
import Register from '../pages/register/register'
import Layout from '../components/layout/layout'

const Router = () => {
    return (
        <BrowserRouter basename='/my-books-app'>
            <Routes>
                <Route element={<Layout />}>
                    <Route element={<PrivatedRoutes isAuthenticate={true} />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route element={<PublicRoutes isAuthenticate={true} />}>
                        <Route path='login' element={<Login />} />
                        <Route path='register' element={<Register />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router
   
