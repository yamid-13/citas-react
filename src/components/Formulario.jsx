import { useState, useEffect } from "react";
import Error from "./Error";

/*useEffect
import {useEffect} from "react"

useEffect( () => {
  console.log('El compoenente esta listo');
}), []*/

/* const [cliente, setCliente] = useState([]);
   const [total, setTotal = useState(0)];
   const [cliente, setCliente] = useState([]);
   const [modal, setModal] = useState(false);
 */

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0 ){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  }, [paciente])

   

  const generarId = () => {
    const random = Math.random().toString(17).substring(2);
    const fecha = Date.now().toString(17)

    return random + fecha
  }

  const hundleSubmit = (e) => {
    e.preventDefault();

    // validacion del formulario

    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('Hay al menos un campo vacio')

      setError(true)
      return;
    }
    setError(false)

     // Odjecto paciente
     const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas,
      
      
    }

    if(paciente.id){
       //Editando Registro
       objetoPaciente.id = paciente.id
       

       const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

       setPacientes(pacientesActualizados)
       setPaciente({})



       
    }else{
      //Nuevo Registro
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente]);
      
    }


    //console.log(objetoPaciente)
    //setPacientes([...pacientes, objetoPaciente]);

    //Reinicciar el formulario

    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')


  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimientos Pacientes</h2>

      <p className="text-xl mt-5 mb-10 text-center">
        Añade Pacientes y {' '}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
       onSubmit={hundleSubmit}
       className="bg-white shadow-md rounded-lg py-10 px-5">

      {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className="mt-5">
            <label htmlFor="mascota" className="bloc text-gray-700 uppercase font-bold">
            Nombre Mascota
            </label>

            <input
                id="mascota"
                type="text" 
                placeholder="Nombre de la mascota"
                className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
        </div>
        <div className="mt-5">
            <label htmlFor="propietario" className="bloc text-gray-700 uppercase font-bold">
            Nombre Propietario
            </label>

            <input
                id="propietario"
                type="text" 
                placeholder="Nombre del propietario"
                className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                value={propietario}
                onChange={(e) => setPropietario(e.target.value)}
            />
        </div>
        <div className="mt-5">
            <label htmlFor="email" className="bloc text-gray-700 uppercase font-bold">
            Email
            </label>

            <input
                id="email"
                type="text" 
                placeholder="Email de contacto"
                className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <div className="mt-5">
            <label htmlFor="alta" className="bloc text-gray-700 uppercase font-bold">
            Alta
            </label>

            <input
                id="alta"
                type="date" 
                className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
            />
            <div className="mt-5">
                <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Sintomas</label>
                <textarea
                    id="sintomas"
                    className="border-2 w-full mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Describe los sintomas"
                    value={sintomas}
                    onChange={(e) => setSintomas(e.target.value)}
                /> 
            </div>


            <input
             type="submit" 
             className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors mt-5 rounded-md"
             value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
            />
        </div>





      </form>




    </div>
  )
}

export default Formulario

