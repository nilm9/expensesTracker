import { useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'
import { formatearFecha } from './helpers'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { useEffect } from 'react'
import { object } from 'prop-types'

function App() {

  const [gastos, setGastos] = useState([])

  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  
  const [gastoEditar, setGastoEditar] = useState({})

  useEffect(() => {
      if (Object.keys(gastoEditar).length > 0) {
        setModal(true)
        setTimeout(() => {
          setAnimarModal(true)
        }, 500);
          }
    }, [gastoEditar])


  const guardarGasto = gasto => {

    if(gastoEditar.id){
      //Editing already created expense
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)

    } else{
      //New expense
      gasto.id = generarId();
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }


    //Close modal
    setAnimarModal(false)
    setTimeout(() => {
        setModal(false)

    }, 500);
  }

  const handleNuevoGasto = () => {  
    setModal(true)
    //Empty the edit object
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);

   } 

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
      gastos={gastos}
      presupuesto={presupuesto}  
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto &&
        <>
          <main>
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar}/>
          </main>
          <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
          {modal &&
          <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar}/>}
                       
        </>
        }

    </div>
  )
}

export default App
