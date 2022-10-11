import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


const ControlPresupuesto = ({gastos, presupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible , setDisponible]= useState(0);
    const [gastado, setGastado]= useState(0);

    //Tracks each expense
    useEffect(() => {
        //Starts at 0
        const totalGastado = gastos.reduce((total,gasto) => Number(gasto.cantidad) + total, 0)
        const totalDisponible = presupuesto - totalGastado;

        //Calcualte the %
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) *100).toFixed(2)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje);
        }, 2000);
        

        setGastado(totalGastado)
        setDisponible(totalDisponible);
    }, [gastos])



    const formatearCantidad = (cantidad) =>{
          return  cantidad.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            })
    }


 
  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div className="">
            <CircularProgressbar
            value={porcentaje}
            styles={buildStyles({
                pathColor: '#3B82F6',
                trailColor: '#F5F5F5',
                textColor: '#3B82F6',
            })}
            text={`${porcentaje}% Gastado`}
            />

        </div>
        <div className="contenido-presupuesto">
            <p>
                <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible:</span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span>{formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto