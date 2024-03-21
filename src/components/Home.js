import {
    Button,
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
} from 'react-bootstrap';

export const Home = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Form>
                    <FormControl type="text" placeholder="Search" className="me-2"/>
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Container>
        </div>
    );
};