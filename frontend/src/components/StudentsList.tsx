import { Student } from "./Dashboard";
import EditModal from "./EditModal";

interface StudentListProps {
  students: Student[];
  onDeleteStudent: (id: string) => void;
}

const StudentsList = ({ students, onDeleteStudent }: StudentListProps) => {
  function handleStudent(student_id: string) {
    const studentSearch = students.find(
      (student) => student_id === student._id
    );

    return studentSearch!;
  }

  return (
    <div className="student-list">
      <h3 className="mt-4">Lista de Alunos</h3>
      <ul className="list-group mt-4">
        {students.length < 1 && <p>Adicione alunos na lista..</p>}
        {students.map((student) => (
          <li key={student._id} className="list-group-item">
            {student.name} - {student.age} anos - Gênero: {student.gender} -
            Disciplinas: {student.subjects.join(", ")}
            <div className="float-end">
              <EditModal student={handleStudent(student._id)} />
              <button
                type="button"
                className="btn btn-danger btn-sm "
                onClick={() => onDeleteStudent(student._id)}
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsList;
