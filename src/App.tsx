import './scss/app.scss';
import Header from './components/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';

function App() {

  const location = useLocation()

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <ToastContainer position='bottom-right' hideProgressBar />
          {location.pathname === '/' ? <Home /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default App;
