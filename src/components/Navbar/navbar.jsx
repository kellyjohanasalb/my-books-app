import { NavLink } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
    const links = [
        {
            id: 1,
            link: '/',
            label: 'home',
            AuthRequired: true
        },
        {
            id: 2,
            link: '/login',
            label: 'login',
            AuthRequired: false
        },
        {
            id: 3,
            link: '/register',
            label: 'register',
            AuthRequired: false
        }
    ]
    return (
        <nav className='navContainer'>{
            links.map(item => <NavLink key={item.id} to={item.link} className={'navContainer__link'}>{item.label}</NavLink>)
        }</nav>
    )
}

export default Navbar;