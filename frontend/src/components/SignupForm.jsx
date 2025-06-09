import { useState } from "react"
import {useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginForm (){
    const [email,setEmail] = useState ('')
    const [password, setPassword] = useState('')
    const {login} = useAuth ()
    const navigate = useNavigate()

    const handleSubmit =(e) => {
        e.preventDefault()
        login({email, password})
        navigate('/')
    }

    return (
        <form onSubmit = {handleSubmit}>
            <div className = "mb-3">
                <label>Email</label>
                <input className = "form-control" type = "email" value = {email} onChange ={(e) => setEmail(e.target.value)}/>
            </div>
            <div className ="mb-3">
                <label>Contraseña</label>
                <input className = "form-control" type ="password" value = {password} onChange = {(e)=> setPassword(e.target.value)}/>
            </div>
            <button className ="btn btn-primary">Entrar</button>
        </form>
    )
}
