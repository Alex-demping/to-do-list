import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/scss/main.scss'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store} >
      <App />
      <ToastContainer position='top-right' autoClose={2000} />
    </Provider>
  </BrowserRouter>

)
