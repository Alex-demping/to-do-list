import './styles.scss'
import { Link } from 'react-router-dom'

const Page404 = () => {
    return (
        <div className="holder-page-404">
            <h1 className='error'>Такої сторінки не існує</h1>
            <Link className='btn' to={'/'}>На головну</Link>
        </div>
    )
}

export default Page404
