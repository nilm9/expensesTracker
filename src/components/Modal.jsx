import React, { useState } from 'react'
import Mensaje from './Mensaje'
import cerrarBtn from './../img/cerrar.svg'

const Modal = ({setModal, animarModal ,setAnimarModal, guardarGasto}) => {


    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('')


    const handleSubmit = e => {    
        e.preventDefault()
        if ([nombre, cantidad, categoria].includes('')) {
            setMensaje("No pueden haber campos vacios")
            setTimeout(() => {
                setMensaje('') 
            }, 3000);
            return
        }
        const gasto = {nombre, cantidad, categoria}
        guardarGasto({nombre:nombre, cantidad:cantidad, categoria:categoria})
    }

    const ocultarModal = () => {  
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)

        }, 500);
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
        </div>
        <form className={`formulario ${animarModal ? "animar": "cerrar"}`} onSubmit={handleSubmit}>
            <legend>Nuevo Gasto</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input
                    type="text"
                    id="nombre"
                    placeholder='Añade el nombre del gasto' 
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    />
                    

            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>

                <input
                    type="number"
                    id="cantidad"
                    placeholder='Añade la cantidad del gasto'
                    value={cantidad}
                    onChange={e => setCantidad(e.target.value)}
                    />

            </div>
            <div className="campo">
                <label htmlFor="categoria">Categoría</label>
                <select name="" id="categoria" onChange={e=>setCategoria(e.target.value)}>
                    <option value="">Selecione</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="subscripciones">Subscripciones</option>


                </select>

            </div>
            <input id='cantidad' type="submit" value="Añadir gasto"/>
        </form>
    </div>
  )
}

export default Modal