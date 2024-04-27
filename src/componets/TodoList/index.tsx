import './styles.scss'
import { ChangeEvent, useCallback, useEffect, useRef } from "react"
import { RootState, useAppDispatch } from "../../redux/store"
import debounce from 'lodash.debounce'
import { useDispatch, useSelector } from "react-redux"
import { FetchTodoItem, fetchTodo } from "../../redux/slice/todoSlice"
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useLocation } from "react-router-dom"
import { CiSearch } from "react-icons/ci"
import { fetchShare, setShareValue } from "../../redux/slice/sharchSlice"
import { IoMdClose } from "react-icons/io"
import { fetchDeleteTodo, setBtnStatus } from "../../redux/slice/deleteTodoSlice"
import Todo from "../Todo"


const TodoList = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const appDispatch = useAppDispatch()
    const [animationParent] = useAutoAnimate()
    const { status, items } = useSelector((state: RootState) => state.todo)
    const { statusShare, shareValue } = useSelector((state: RootState) => state.sharch)
    const isActive = useSelector((state: RootState) => state.deleteTodo.btnStatus)





    const inputEle = useRef<HTMLInputElement>(null)
    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        dispatch(setShareValue(value))
        shareDebounce(value)
    }
    const clearSearch = () => {
        dispatch(setShareValue(''))
        appDispatch(fetchShare(''))
    }
    const shareDebounce = useCallback(
        debounce((value: string) => {
            appDispatch(fetchShare(value))
        }, 500),
        [])


    const handleDelete = (item: FetchTodoItem) => {
        if (item && item.id) {
            const updatedItems = { ...item, done: !isActive[item.id] }
            appDispatch(fetchDeleteTodo(updatedItems))
            dispatch(setBtnStatus({ itemId: item.id.toString(), isActive: !isActive[item.id] }));
        }

    }

    useEffect(() => {
        const page = location.pathname
        appDispatch(fetchTodo(page))

    }, [])

    useEffect(() => {
        items.map((item) => {
            item.done == true
            if (item.id !== undefined) {
                dispatch(setBtnStatus({ itemId: item.id.toString(), isActive: item.done }));
            }
        });
    }, [items]);
    return (
        <div className='todo-lst' >
            <div className="holder-search">
                <div className="search">
                    <CiSearch className="search-icon" />
                    <input type="text" ref={inputEle} value={shareValue} onChange={e => handleSearch(e)} />
                    {shareValue && <IoMdClose onClick={clearSearch} className="search-close-icon" />}

                </div>

            </div>
            <div className="row" ref={animationParent}>
                {status === 'loading' ?
                    [...Array(9)].map((_, index) => (
                        <div key={index} className="col skeleton">
                            <h2></h2>
                            <p></p>
                            <div className="holder-btn"></div>
                        </div>
                    ))
                    : items.map((item) => (
                        <Todo
                            key={item.id}
                            item={item}
                            handleDelete={handleDelete}
                            isActive={item.id ? isActive[item.id] ?? false : false}

                        />
                    ))}
            </div>
            {status === 'error' && statusShare === 'error' && <h1 className="error">Щось пішло не так</h1>}
            {statusShare === 'notFound' && <h1 className="error">Не знайдено</h1>}
        </div>
    )
}

export default TodoList
