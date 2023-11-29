import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavigationBar from "./NavigationBar";
import StudentRegistration from "./StudentRegistration";
import StudentsList from "./StudentsList";

export interface Student {
  _id: string;
  name: string;
  age: number;
  gender: string;
  subjects: string[];
}

const StudentDashboard = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [page, setPage] = useState("lista");
  const navigate = useNavigate();

  const fetchStudents = async () => {
    const { data } = await axios.get("http://localhost:3000/student");
    setStudents(data);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn !== "true") {
      return navigate("/");
    }
    fetchStudents();
  }, []);

  const handleAddStudent = async (newStudent: Student) => {
    try {
      const reqNewStudent = await axios.post(
        "http://localhost:3000/student/create",
        newStudent
      );

      if (reqNewStudent.status === 201) {
        toast("Aluno cadastrado com sucesso!");
      }
    } catch (e) {
      toast("Algum erro aconteceu.");
    }
  };

  const handleDeleteStudent = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/student/${id}`);

      toast("Estudante deletado com sucesso");
    } catch (e) {
      toast("Algo de errado aconteceu.");
    }
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student._id !== id)
    );
  };

  const handlePage = (page: string) => {
    setPage(page);
  };

  return (
    <div className="">
      <div className="">
        <NavigationBar handlePageComponent={handlePage} />
        <ToastContainer />

        {/* Conteúdo Principal */}
        <main className="flex-fill">
          <div className="container align-items-center">
            {page === "cadastro" && (
              <StudentRegistration onAddStudent={handleAddStudent} />
            )}
            {page === "lista" && (
              <StudentsList
                students={students}
                onDeleteStudent={handleDeleteStudent}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
