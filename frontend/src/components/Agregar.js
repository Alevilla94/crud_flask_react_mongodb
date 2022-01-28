import React, { useState,useEffect } from "react";


const API = process.env.REACT_APP_API;

export const Agregar = () => {

    const [name, setName] = useState('')
    const [profession, setProfession] = useState('')
    const [rol, setRol] = useState('Backend')
    const [tecnology, setTecnology] = useState('Laravel')

    const handleSubmit = async (e) => {
        
        const response= await fetch (`${API}/users`, {
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                name,
                profession,
                rol,
                tecnology
            }),
            
        });
        const data= await response.json()
        console.log(data);
        
    };
         

    return (
        <div className="row-md-2">
            <div className="col-md-6">
            <form onSubmit={handleSubmit} className="card card-body">

                <div className="form group">
                    <input
                        type="text"
                        onChange={e => setName(e.target.value)}
                        value={name}
                        className="form-control"
                        placeholder="Ingrese el nombre"
                        autoFocus
                    ></input>
                </div>
                <br />
                <div className="form group">
                    <input
                        type="text"
                        onChange={e => setProfession(e.target.value)}
                        value={profession}
                        className="form-control"
                        placeholder="Ingrese profesion"

                    />
                </div>
                <br />
                <div className="form group">
                    <select
                        onChange={e => setRol(e.target.value)}
                        value={rol}
                        className="form-control"
                        
                    >
                        <option value="Backend">Backend</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Fullstack">Fullstack</option>
                    </select>

                </div>
                <br />
                <div className="form group">
                    <select
                        onChange={e => setTecnology(e.target.value)}
                        value={tecnology}
                        className="form-control"
                        placeholder="Seleccione la tecnologia"
                    >
                        <option value="Laravel">Laravel</option>
                        <option value="Nodejs">Nodejs</option>
                        <option value="React">React</option>
                    </select>

                </div>
                <br />

                <button className="brn brn-primary btn-block" >
                    Crear
                </button>
            </form>
            </div>  
        </div>
    );
}