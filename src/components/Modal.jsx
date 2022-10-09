import React from 'react'
import cerrarBtn from './../img/cerrar.svg'

const Modal = ({setModal, animarModal ,setAnimarModal}) => {

    const ocultarModal = () => {    
        setModal(false)
        setAnimarModal(false)
    }

  return (
    <div className='modal'>
        <div className="cerrar-modal">
            <img src={cerrarBtn} alt="cerrar modal" onClick={ocultarModal} />
        </div>
        <form className={`formulario ${animarModal ? "animar": ""}`}>
            <legend>Nuevo Gasto</legend>
        </form>
    </div>
  )
}

export default Modal