import { render } from '@testing-library/react';
import { useState, useEffect } from 'react'
import { useMethod } from '../crud/method'

export function Home() {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [nombreN, setNombreN] = useState('');
    const [apellidoN, setApellidoN] = useState('');
    const { create, method, read, remove, update } = useMethod();

    const handleSubmit = async (e) => {
        e.preventDefault();
        create(nombre, apellido);
        setNombre('');
        setApellido('');
    }

    const handleDelete = async (id) => {
        remove(id);
    }

    const handleUpdate = async (id, nombre, apellido) => {
        setNombreN(nombre);
        setApellidoN(apellido);
    }

    const handleSubmitUpdate = async (id, nombre, apellido) => {
        update(id, nombre, apellido);
        setNombreN('');
        setApellidoN('');
    }

    useEffect(() => {
        read();
    }, [])

    function renderMethod() {
        if (method.length === 0) {
            return <h1>No hay datos</h1>
        } else {
            return <div>
                {
                    method.map(meth => {
                        return <div key={meth.id}>
                            <h1>{meth.nombre}</h1>
                            <h1>{meth.apellido}</h1>
                            <button onClick={() => handleDelete(meth.id)}>Eliminar</button>
                            <button onClick={() => handleUpdate(meth.id, meth.nombre, meth.apellido)}>Actualizar</button>
                            <button onClick={() => handleSubmitUpdate(meth.id, nombreN, apellidoN)}>Update</button>
                        </div>
                    })
                }
            </div>
        }
    }

    return (
        <div onSubmit={handleSubmit}>
            <div>Home</div>
            <form>
                <input
                    type={'text'}
                    placeholder={'Nombre'}
                    onChange={e => setNombre(e.target.value)}
                    value={nombre}
                /><br />
                <input
                    type={'text'}
                    placeholder={'Apellido'}
                    onChange={e => setApellido(e.target.value)}
                    value={apellido}
                /><br />
                <button>Send</button>
            </form>
            <br /><br />
            <div>
                <form>
                    <input
                        type={'text'}
                        placeholder={'Nombre'}
                        onChange={e => setNombreN(e.target.value)}
                        value={nombreN}
                    /><br />
                    <input
                        type={'text'}
                        placeholder={'Apellido'}
                        onChange={e => setApellidoN(e.target.value)}
                        value={apellidoN}
                    /><br />
                    <button onClick={() => handleSubmitUpdate()}>Update</button>
                </form>
            </div>
            <br /><br />
            <div>Datos</div>
            <div>{renderMethod()}</div>
        </div>
    )
}
