import { FaReact } from "react-icons/fa"
import './styles.scss'
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"


const Header = () => {
    const [isScrolled, setScrolled] = useState<boolean>(false)
    const [isBtnNav, setBtnNav] = useState<boolean>(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true)
            } else {
                setScrolled(false)
            }

        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])
    const handleNav = () => {
        setBtnNav(!isBtnNav)
    }

    return (
        <>
            <header className={`header ${isScrolled ? 'fixed' : ''}`}>
                <div className="holder-content">
                    <Link className="logo" to={"/"}><FaReact /></Link>
                    <button onClick={handleNav} className={`btn-menu ${isBtnNav ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                    <nav className={`nav ${isBtnNav ? 'active' : ''}`}>
                        <ul>
                            <li><NavLink to={"/"}>Всі</NavLink></li>
                            <li><NavLink to={"delete"}>Видалені</NavLink></li>
                            <li><NavLink to={"new"}>Додати новий</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </header>
            <div onClick={handleNav} className={`nav-backdrop ${isBtnNav ? 'active' : ''}`}></div>
        </>
    )
}

export default Header
