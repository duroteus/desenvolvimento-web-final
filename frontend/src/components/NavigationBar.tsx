import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface NavigationBarProps {
  handlePageComponent: (page: string) => void;
}

const NavigationBar = ({ handlePageComponent }: NavigationBarProps) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    return navigate("/");
  }
  return (
    <Navbar expand="sm" bg="light">
      <Container>
        <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => handlePageComponent("cadastro")}>
              Cadastro de Alunos
            </Nav.Link>
            <Nav.Link onClick={() => handlePageComponent("lista")}>
              Lista de Alunos
            </Nav.Link>
          </Nav>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
