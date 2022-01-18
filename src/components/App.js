import "../styles/App.scss";
import { useState, useEffect } from "react";
import studentsData from "../data/studentsData.json";
import getStudents from "../services/api";
import ls from "../services/local-storage";

function App() {
  // States
  const [students, setStudents] = useState(ls.get("students", []));
  const [newStudent, setNewStudent] = useState({
    name: "",
    counselor: "",
    speciality: "",
  });
  const [nameFilter, setNameFilter] = useState("");
  const [counselorFilter, setCounselorFilter]= useState("");

  // Effects
  // Cojo los datos del api
  useEffect(() => {
    getStudents().then((data) => {
      console.log(data);
      setStudents(data.results);
    });
  }, []);

  // Lo guardo en localStorage
  useEffect(() => {
    ls.set("students", students);
  }, [students]);

  // Functions
  const handleForm = (ev) => {
    ev.preventDefault();
  };

  // Inputs para filtrar
  // Filtrar por nombre
  const handleNameFilter = (ev) => {
    setNameFilter(ev.currentTarget.value);
  };
  // Filtrar por tutora
  const handleCounselorFilter = (ev) => {
    setCounselorFilter(ev.currentTarget.value)
  };

  // Recoger los datos de los inputs
  const handleChangeInputs = (ev) => {
    const inputChanged = ev.currentTarget.name;
    setNewStudent({
      ...newStudent,
      [inputChanged]: ev.currentTarget.value,
    });
  };

  // Vaciar los inputs
  const getEmptyStudent = () => {
    return {
      name: "",
      counselor: "",
      speciality: "",
    };
  };

  // Añadir una adalaber con el botón
  const handleAddAdalaber = (ev) => {
    ev.preventDefault();
    const newAdalaber = {
      name: newStudent.name,
      counselor: newStudent.counselor,
      speciality: newStudent.speciality,
    };
    setStudents([...students, newAdalaber]);
    setNewStudent(getEmptyStudent());
  };

  const selectFilter = (student)=>{
    if(counselorFilter==="Yanelis"){
      return student.counselor.includes(student.counselor==="Yanelis")
      // return setCounselorFilter("Yanelis");
    }
  };
  // Pintar adalabers
  const renderStudents = students
    .filter((student) => {
      return student.name.includes(nameFilter.toLowerCase()) || selectFilter(student);
    })
    .map((student) => {
      return (
        <tr key={student.id}>
          <td>{student.name}</td>
          <td>{student.counselor}</td>
          <td>{student.speciality}</td>
        </tr>
      );
    });

  return (
    <div>
      <h1>Adalabers- promo patatita</h1>
      <h2>Filtrar adalabers:</h2>
      <form onSubmit={handleForm}>
        <label htmlFor="nameFilter"> Nombre:
          <input
            id="nameFilter"
            type="text"
            value={nameFilter}
            onChange={handleNameFilter}
          ></input>
        </label>
        <label htmlFor="counselorFilter"> Escoge una tutora:
          <select onChange={handleCounselorFilter}
          >
            <option disabled select>Escoge una opción</option>
            <option value="Yanelis">Yanelis</option>
            <option value="Dayana">Dayana</option>
            <option value="Iván">Iván </option>
          </select>
        </label>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutores</th>
            <th>Especialidad</th>
          </tr>
        </thead>

        <tbody>{renderStudents}</tbody>
      </table>

      <h2>Añadir una Adalaber</h2>
      <form onSubmit={handleForm}>
        <label htmlFor="name">
          Nombre:
          <input
            id="name"
            type="text"
            value={newStudent.name}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <label htmlFor="counselor">
          Tutora:
          <input
            id="counselor"
            type="text"
            value={newStudent.counselor}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <label htmlFor="speciality">
          Especialidad:
          <input
            id="speciality"
            type="text"
            value={newStudent.speciality}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <input type="submit" value="Añadir" onClick={handleAddAdalaber}></input>
      </form>
    </div>
  );
}

export default App;
