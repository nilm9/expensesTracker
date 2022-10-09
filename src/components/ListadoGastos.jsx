import React from 'react'
import Gasto from './Gasto'
//

const ListadoGastos = ({gastos}) => {
  return (
    <div className='listado-gastos contenedor'>
        <h2>{gastos.length ? 'Gastos' : 'No hay gastos aun'}</h2>

        {gastos.map((gastos, index) => {
        <Gasto/>
        })}

    </div>
  )
}

export default ListadoGastos