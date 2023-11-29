import { useState } from "react";
import { Student } from "./Dashboard";
import Input from "./Input";

interface StudentRegistrationProps {
  onAddStudent: (newStudent: any) => void;
}

const StudentRegistration = ({ onAddStudent }: StudentRegistrationProps) => {
  const [newStudent, setNewStudent] = useState<
    Pick<Student, "name" | "age" | "gender" | "subjects">
  >({
    name: "",
    age: 0,
    gender: "Masculino",
    subjects: [],
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: name === "age" ? parseInt(value, 10) : value,
    }));
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      gender: e.target.value,
    }));
  };

  const handleSubjectsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSubjects = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      subjects: selectedSubjects,
    }));
  };

  const handleAddStudent = () => {
    if (
      newStudent.name.trim() === "" ||
      newStudent.age <= 0 ||
      newStudent.subjects.length === 0
    ) {
      alert("Por favor, preencha todos os campos do aluno.");
      return;
    }

    onAddStudent(newStudent);

    setNewStudent({
      name: "",
      age: 0,
      gender: "Masculino",
      subjects: [],
    });
  };

  return (
    <div className="form-container">
      <h3>Adicionar Novo Aluno</h3>
      <form>
        <Input
          label="Nome"
          name="name"
          type="text"
          value={newStudent.name}
          onChange={handleInputChange}
        />
        <Input
          label="Idade"
          name="age"
          type="number"
          value={newStudent.age}
          onChange={handleInputChange}
        />

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gênero:
          </label>
          <select
            className="form-control"
            id="gender"
            name="gender"
            value={newStudent.gender}
            onChange={handleGenderChange}
          >
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="subjects" className="form-label">
            Disciplinas:
          </label>
          <select
            multiple
            className="form-control"
            id="subjects"
            name="subjects"
            value={newStudent.subjects}
            onChange={handleSubjectsChange}
          >
            <option value="Matemática">Matemática</option>
            <option value="Ciências">Ciências</option>
            <option value="História">História</option>
            <option value="Geografia">Geografia</option>
            <option value="Artes">Artes</option>
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddStudent}
        >
          Adicionar Aluno
        </button>
      </form>
    </div>
  );
};

export default StudentRegistration;
