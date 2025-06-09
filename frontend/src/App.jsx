import {BrowserRouter, Routes, Route, Navigate} from 'react-router dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import {AuthProvider } from './context/AuthContext'
import {useAuth} from './context/useAuth'

function PrivateRoute ({children}) {
  const {user} = useAuth()
  return user ? children: <Navigate to ="/login"/>
}

export default function App(){
  return(
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Login/>}/>
        <Route path = "/signup" element = {<Signup/>}/>
        <Route path = "/" element ={<PrivateRoute><Home/></PrivateRoute>}/>
      </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}