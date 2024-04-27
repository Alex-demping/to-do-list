import './styles.scss'
import Btn from '../Btn'
import { useDispatch } from 'react-redux'
import { useAppDispatch } from '../../redux/store'
import { useForm } from 'react-hook-form'
import { fetchEditTodo, setDesc, setTitle } from '../../redux/slice/editTodoSlice'
import { FC } from 'react'
import { FetchTodoItem } from '../../redux/slice/todoSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { fetchNewTodo } from '../../redux/slice/newTodoSlice'
type FormType = {
    id?: string;
    todoDone?: boolean;
}

const Form: FC<FormType> = ({ id, todoDone }) => {
    const dispatch = useDispatch()
    const appDispatch = useAppDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<FetchTodoItem>({
        mode: "onBlur"
    })

    const onSubmit = (data: FetchTodoItem) => {
        reset()
        if (location.pathname === "/new") {
            appDispatch(fetchNewTodo(data)).then(() => {
                navigate("/");
            })
        } else {
            appDispatch(fetchEditTodo({ params: data, id: Number(id) })).then(() => {
                dispatch(setDesc(data.description))
                dispatch(setTitle(data.title))
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="holder-input">
                <label htmlFor="title">Заголовок</label>
                <input className={errors.title && 'error'} type="text" id='title'  {...register('title', { required: 'поле не повинно бути порожнім' })} />
                {errors.title && <p className='error'>{errors.title.message}</p>}
            </div>
            <div className="holder-input">
                <label htmlFor="description">Опис</label>
                <textarea className={errors.description && 'error'} id="description" {...register('description', { required: 'поле не повинно бути порожнім' })} ></textarea>
                {errors.description && <p className='error'>{errors.description.message}</p>}
            </div>
            <div className="holder-checkbox ">
                <input id='checkbox' defaultChecked={todoDone} type="checkbox" {...register('done')} />
                <label htmlFor="checkbox">Відмітити як видалене</label>
            </div>
            <Btn disabled={!isValid} className="btn">{location.pathname === "/new" ? "Створити" : "Редагувати"}</Btn>
        </form >
    )
}

export default Form
