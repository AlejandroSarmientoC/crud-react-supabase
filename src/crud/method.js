import {createContext, useContext, useState} from "react";
import {client} from "../supabase/client";

export const MethodContext = createContext();

export const useMethod = () => {
    const context = useContext(MethodContext);
    return context;
}

export const MethodContextProvider = ({children}) => {

    const [method, setMethod] = useState([]);

    const create = async (nombre, apellido) => {
        try{
            const {error, data} = await client.from('examen').insert({
                nombre,
                apellido
            })
            if (error) throw new Error(error);
            console.log(data);
            setMethod([...method, ...data]);
        }catch (error) {
            console.log(error);
        }
    }

    const read = async () => {
        const {error, data} = await client.from('examen').select()
        if (error) throw new Error(error);
        setMethod(data);
    }

    //Metodo de eliminar
    const remove = async (id) => {
        try{
            const {error} = await client.from('examen').delete().match({id})
            if (error) throw new Error(error);
            setMethod(method.filter(meth => meth.id !== id));
        }catch(error){
            console.log(error);
        }
    }
    //Metodo de actualizar nombre y apellido dando click a un boton
    const update = async (id,nombre, apellido) => {
        try{
            const {error} = await client.from('examen').update({nombre, apellido}).match({id})
            if (error) throw new Error(error);
            setMethod(method.filter(meth => meth.id !== id));
        }catch(error){
            console.log(error);
        }
    }

    return <MethodContext.Provider value={{method, create, read, remove, update}}>
        {children}
    </MethodContext.Provider>
}