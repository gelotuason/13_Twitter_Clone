import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Layout from './pages/Layout';
import Home from './pages/Home';

function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App;
