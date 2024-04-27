import { Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Layout from "./componets/Layout"
import TodoDelete from "./Pages/TodoDelete"
import TodoItem from "./Pages/TodoItem"
import NewTodo from "./Pages/NewTodo"
import Page404 from "./Pages/Page404"

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="delete" element={<TodoDelete />} />
          <Route path="todoItem/:id" element={<TodoItem />} />
          <Route path="new" element={<NewTodo />} />
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
