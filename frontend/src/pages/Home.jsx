import {useAuth} from '../context/AuthContext'

export default function Home (){
    const {user, logout} = useAuth ()
    return(
        <div className= "container mt-5">
            <h1>Hola, {user?.name}!</h1>
            <p>Rol: {user?.role}</p>
            <button className = "btn btn-danger" onClick = {logout}>Cerrar sesión</button>
        </div>
    )
}