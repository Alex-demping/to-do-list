import './styles.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../redux/store'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchTodo } from '../../redux/slice/todoSlice'
import Form from '../../componets/Form'
import { setDesc, setTitle } from '../../redux/slice/editTodoSlice'


const TodoItem = () => {
    const dispatch = useDispatch()
    const { status, items } = useSelector((state: RootState) => state.todo)

    const newTitle = useSelector((state: RootState) => state.editTodo.title)
    const newDesc = useSelector((state: RootState) => state.editTodo.desc)

    const appDispatch = useAppDispatch()
    const { id } = useParams()
    const todo = items.find(obj => Number(obj.id) === Number(id))


    useEffect(() => {
        dispatch(setDesc(''))
        dispatch(setTitle(''))
        appDispatch(fetchTodo());
    }, [])
    return (

        <div className="holder-form">
            {status === 'error' && <h1>Щось пішло не так</h1>}
            {status === 'loading' ? <h1>Завантаження...</h1> :
                <>
                    <div className="col">
                        <h1>{newTitle ? newTitle : todo?.title}</h1>
                        <p>{newDesc ? newDesc : todo?.description}</p>
                    </div>
                    <Form id={id} todoDone={todo?.done} />
                </>
            }
        </div>


    )
}

export default TodoItem
