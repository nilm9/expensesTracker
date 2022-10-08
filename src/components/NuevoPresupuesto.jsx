import React, { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    const handlePressupuesto = (e) => {
        e.preventDefault();
        if(!(presupuesto) || (presupuesto) < 0){
            setMensaje('No es un presupuesto valido')
            return
        } 
        setMensaje('')

        console.log(mensaje);
    }



  return (
    <div className='contenedor-presupuesto contenedor sombra'>
        <form className='formulario'>
            <div className="campo">
                <label> Definir Presupuesto</label>
                <input className='nuevo-presupuesto' type="number" placeholder='Añade tu Presupuesto' value={presupuesto} onChange={ (e) => setPresupuesto(Number(e.target.value))} />
            </div>
            <input type="submit" value="Añadir" onClick={handlePressupuesto} />
            {mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje> }
        </form>



    </div>
  )
}

export default NuevoPresupuesto