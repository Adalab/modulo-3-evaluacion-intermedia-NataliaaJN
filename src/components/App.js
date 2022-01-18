import "../styles/App.scss";
import { useState } from "react";
import studentsData from "../data/studentsData.json";

function App() {
  // States
  const [students, setStudents] = useState(studentsData);


  // Functions
  const renderStudents= () => {
    return students
  };

  return (
    <div>
      <h1>Adalabers- promo patatita</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutores</th>
            <th>Especialidad</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Maricarmen</td>
            <td>Amparo</td>
            <td>Escandia</td>
          </tr>

          <tr>
            <td>Columa 1 de la fila 2</td>
            <td>Columa 2 de la fila 2</td>
            <td>Columa 3 de la fila 2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
