import { Button, Container, Card, Form } from "react-bootstrap";
import { useState } from "react";
import Router from "next/router";
import axios from "axios";
import cookie from "js-cookie";

export default function Home() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [salah, setSalah] = useState(false);

    // function untuk login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "https://testcrud.fikrisabriansyah.my.id/api/login",
                data: {
                    email: email,
                    password: password,
                },
            });
            cookie.set("name", data.data.name);
            cookie.set("token", data.data.token);
            data.data.token === "" ? salah : Router.push({ pathname: "/layouts/listdata" });
        } catch (error) {
            setSalah(true);
        }
    };

    return salah ? (
        <div className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
            <h1 className="text-center">Who are you??</h1>
        </div>
    ) : (
        <Container className="d-flex justify-content-center position-absolute top-50 start-50 translate-middle">
            <Card style={{ width: "35rem" }} className="border border-none">
                <div className="d-flex justify-content-center">
                    <Card.Img
                        style={{ width: "350px" }}
                        variant="top"
                        className="bg-sucess py-4 px-4 img-fluid d-flex justify-content-center"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIrxPSJI-uVlJtW6uLDwKFu13Ys9rqfpjo_w&usqp=CAU "
                    />
                </div>
                <h1 className="text-center text-primary">Login</h1>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" onClick={handleLogin}>
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
