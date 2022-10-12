import { useState } from 'react'
import Header from './components/Header'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import { generarId } from './helpers'
import { formatearFecha } from './helpers'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { useEffect } from 'react'
import { object } from 'prop-types'
import Filtros from './components/Filtros'

function App() {

  const [gastos, setGastos] = useState( localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [])

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem("presupuesto")) ?? 0)
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})
  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
      if (Object.keys(gastoEditar).length > 0) {
        setModal(true)
        setTimeout(() => {
          setAnimarModal(true)
        }, 500);
          }
    }, [gastoEditar])


    useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
    }, [presupuesto])

    useEffect(() => {
      localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
    }, [gastos])

    //Filter expeneses
    useEffect(() => {
      if (filtro) {
        //Filter expenses by category
       const gastosFiltrados= gastos.filter(gasto => gasto.categoria === filtro)
       setGastosFiltrados(gastosFiltrados);
      }
    }, [filtro]);


    useEffect(() => {
      const presupuesto = Number(localStorage.getItem('presupuesto')) ?? 0

      if(presupuesto > 0 ){
        setIsValidPresupuesto(true)
      }

    }, []);

  const guardarGasto = gasto => {

    if(gastoEditar.id){
      //Editing already created expense
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({})

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
   const eliminarGasto = id => {
      const gastosActualizados = gastos.filter(gastoState => gastoState.id !== id)
      setGastos(gastosActualizados)
   }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header 
      gastos={gastos}
      setGastos={setGastos}
      presupuesto={presupuesto}  
      setPresupuesto={setPresupuesto}
      isValidPresupuesto={isValidPresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto &&
        <>
          <main>
            <Filtros setFiltro={setFiltro} filtro={filtro} />
            <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} filtro={filtro} gastosFiltrados={gastosFiltrados} />
          </main>
          <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="icono nuevo gasto" onClick={handleNuevoGasto} />
          </div>
          {modal &&
          <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} setGastoEditar={setGastoEditar}/>}
                       
        </>
        }

    </div>
  )
}

export default App
