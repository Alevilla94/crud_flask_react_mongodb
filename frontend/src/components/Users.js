import React, { useState,useEffect } from "react";


const API = process.env.REACT_APP_API;

export const Usuarios = () =>{

    const[users,setUsers] = useState([])
    const getUser = async() =>{
        const response = await fetch(`${API}/users`)
        const data = await response.json();
        setUsers(data)
    };
    
    useEffect(()=> {
        getUser();
         },[]);
    
    const deleteUser = async (id) =>{
        console.log(id)
        const userResponse= window.confirm("Desea Eliminar este usuario?");
        if (userResponse){
        const response = await fetch(`${API}/users/${id}`,{
            method:'DELETE',
            mode: "cors"
        });
        const data = await response.json();
        console.log(data);
        await getUser();
    }}
    
    const updateUser = async (id) =>{
        const response = await fetch(`${API}/users/${id}`)
        const data = await response.json();
   
        /*    Falta modulo de Editar
        setEditing(true);
        
        setName(data.name)
        setProfession(data.profession)
        setRol(data.rol)
        setTecnology(data.tecnology)*/
    } 



    return(
    <div className="col-md-6">
        <div>
        
            <table className="table table-striped">
                <thead>
                        <th>Nombre</th>
                        <th>Profesion</th>
                        <th>Puesto</th>
                        <th>Tecnologia</th>
                        <th>Accion</th>
                </thead>
                <tbody>
                {users.map(user =>(
                    <tr key={user._id.$oid}>
                        <td>{user.name}</td>
                        <td>{user.profession}</td>
                        <td>{user.rol}</td>
                        <td>{user.tecnology}</td>    
                        <div><button 
                        className="btn btn-secondary btn-sm btn-block"
                        onClick={(e)=>updateUser(user._id)}
                        >
                            Editar
                        </button>

                        <button className="btn btn-secondary btn-sm btn-block"
                        onClick={(e)=>deleteUser(user._id.$oid)}
                        >
                            Eliminar
                        </button></div>
                    </tr>
                ))}
                </tbody>
            </table>
        
        </div>
        <div className="col -md-5">

        </div>
    </div>
    );
}