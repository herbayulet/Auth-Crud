import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const Adddata = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // function untuk tambah data
    const handleSubmitData = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "https://testcrud.fikrisabriansyah.my.id/api/product/store",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                data: {
                    name: name,
                    price: price,
                },
            });
            Router.push({ pathname: "/layouts/listdata" });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <Container>
            <h1 className="text-center mb-3">Tambah Data</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold">Product Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="fw-semibold">Price</Form.Label>
                    <Form.Control type="text" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmitData}>
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Adddata;
