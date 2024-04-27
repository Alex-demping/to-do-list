import { Link } from 'react-router-dom'
import Btn from '../Btn'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { FetchTodoItem } from '../../redux/slice/todoSlice'
import { FC } from 'react'

interface TodoProps {
    item: FetchTodoItem;
    handleDelete: (item: FetchTodoItem) => void;
    isActive: boolean;
}

const Todo: FC<TodoProps> = ({ item, handleDelete, isActive }) => {
    const trimText = (text: string): string => {
        return text.length > 150 ? text.substring(0, 150) + '...' : text;
    };

    return (
        <div className="col">
            <h2>{item.title}</h2>
            <p>{trimText(item.description)}</p>
            <div className="holder-btn">
                <Link className="btn-icon" to={`/todoItem/${item.id}`} ><MdModeEditOutline /></Link>
                <Btn onClick={() => handleDelete(item)} className={`btn-icon ${isActive ? 'active' : ''}`}><MdDelete /></Btn>
            </div>
        </div>
    )
}

export default Todo