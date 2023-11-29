import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Student } from "./Dashboard";

interface EditModalProps {
  student: Student;
}

function EditModal({ student }: EditModalProps) {
  const [newStudent, setNewStudent] = useState<Student>(student);
  const [show, setShow] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
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

  async function handleSaveEdit(id: string) {
    try {
      await axios.put(`http://localhost:3000/student/${id}`, newStudent);
      toast("Aluno atualizado com sucesso!");
    } catch (err) {
      toast("Algo de errado aconteceu.");
    }
    handleClose();
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary btn-sm" onClick={handleShow}>
        Editar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleInputChange}
                value={newStudent.name}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                type="number"
                name="age"
                onChange={handleInputChange}
                value={newStudent.age}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gênero</Form.Label>
              <Form.Select
                value={newStudent ? newStudent.gender : undefined}
                onChange={handleGenderChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Disciplinas</Form.Label>
              <Form.Select
                id="subjects"
                name="subjects"
                multiple
                value={newStudent ? newStudent.subjects : undefined}
                onChange={handleSubjectsChange}
              >
                <option value="Matemática">Matemática</option>
                <option value="Ciências">Ciências</option>
                <option value="História">História</option>
                <option value="Geografia">Geografia</option>
                <option value="Artes">Artes</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={() => handleSaveEdit(student._id)}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditModal;
