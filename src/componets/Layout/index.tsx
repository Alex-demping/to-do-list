import { Outlet } from 'react-router-dom'
import Header from '../Header'

const Layout = () => {
    return (
        <>
            <Header />
            <div className="holder-content">
                <Outlet />
            </div>
        </>
    )
}

export default Layout
