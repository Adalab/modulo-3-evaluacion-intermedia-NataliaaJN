import "../styles/App.scss";
import { useState, useEffect } from "react";
import getStudents from "../services/api";
import ls from "../services/local-storage";

function App() {
  // States
  const [students, setStudents] = useState(ls.get("students", []));
  const [newStudent, setNewStudent] = useState({
    name: "",
    counselor: "",
    speciality: "",
    id: students.length,
  });
  const [nameFilter, setNameFilter] = useState("");
  const [counselorFilter, setCounselorFilter] = useState("all");

  // Effects
  // Cojo los datos del api
  useEffect(() => {
    if (students?.length === 0) {
      getStudents().then((data) => {
        setStudents(data.results);
      });
    }
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
    setCounselorFilter(ev.currentTarget.value);
  };

  // Recoger los datos de los inputs
  const handleChangeInputs = (ev) => {
    const inputChanged = ev.currentTarget.id;
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

  // Pintar adalabers
  const renderStudents = students
    .filter((student) => {
      return student.name
        .toLocaleLowerCase()
        .includes(nameFilter.toLocaleLowerCase());
    })
    .filter((student) => {
      if (counselorFilter === "all") {
        return true;
      } else {
        return student.counselor === counselorFilter;
      }
    })
    .map((student) => {
      return (
        <tr key={student.id} className="table__body" >
          <td className="table__body--tableItem">{student.name}</td>
          <td className="table__body--tableItem">{student.counselor}</td>
          <td className="table__body--tableItem">{student.speciality}</td>
          <td className="table__body--tableSocialNetworkItem">
            {student.social_networks?.length > 0 ? (
              student.social_networks.map((eachSocialNetwork, index) => {
                return (
                  <a
                    key={index+1}
                    className="table__body--tableSocialNetworkItem--socialNetwork"
                    href={eachSocialNetwork.url}
                  >
                    {eachSocialNetwork.name}
                  </a>
                );
              })
            ) : (
              <p className="table__body--tableSocialNetworkItem--noSocialNetwork">
                No tiene redes sociales
              </p>
            )}
          </td>
        </tr>
      );
    });

  return (
    <div>
      <h1 className="title">Adalabers promo patatita</h1>
      <h2 className="filterTitle">Filtrar adalabers:</h2>
      <form className="filterForm" onSubmit={handleForm}>
        <label className="filterForm__labelNameFilter" htmlFor="nameFilter">
          {" "}
          Nombre:
          <input
            id="nameFilter"
            className="filterForm__labelNameFilter--input"
            type="text"
            value={nameFilter}
            onChange={handleNameFilter}
          ></input>
        </label>
        <label
          className="filterForm__labelCounselorFilter"
          htmlFor="counselorFilter"
        >
          {" "}
          Escoge una tutora:
          <select
            className="filterForm__labelCounselorFilter--select"
            value={counselorFilter}
            onChange={handleCounselorFilter}
          >
            <option value="all">Mostrar todas</option>
            <option value="Yanelis">Yanelis</option>
            <option value="Dayana">Dayana</option>
            <option value="Iván">Iván</option>
          </select>
        </label>
      </form>

      <table className="table">
        <thead>
          <tr className="table__head">
            <th className="table__head--headItem">Nombre</th>
            <th className="table__head--headItem">Tutores</th>
            <th className="table__head--headItem">Especialidad</th>
            <th className="table__head--headItem">Redes sociales</th>
          </tr>
        </thead>

        <tbody>{renderStudents}</tbody>
      </table>

      <h2 className="addAdalaberTitle">Añadir una Adalaber</h2>
      <form className="addAdalaberForm" onSubmit={handleForm}>
        <label className="addAdalaberForm__label" htmlFor="name">
          Nombre:
          <input
            id="name"
            className="addAdalaberForm__label--input"
            type="text"
            value={newStudent.name}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <label className="addAdalaberForm__label" htmlFor="counselor">
          Tutora:
          <input
            id="counselor"
            className="addAdalaberForm__label--input"
            type="text"
            value={newStudent.counselor}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <label className="addAdalaberForm__label" htmlFor="speciality">
          Especialidad:
          <input
            id="speciality"
            className="addAdalaberForm__label--input"
            type="text"
            value={newStudent.speciality}
            onChange={handleChangeInputs}
          ></input>
        </label>
        <input
          className="addAdalaberForm__addBtn"
          type="submit"
          value="Añadir una nueva Adalaber"
          onClick={handleAddAdalaber}
        ></input>
      </form>
    </div>
  );
}

export default App;
