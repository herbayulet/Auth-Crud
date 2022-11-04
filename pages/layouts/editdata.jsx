import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import Router from "next/router";
import Cookies from "js-cookie";
import axios from "axios";

const editdata = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [produkId, setProdukId] = useState("");

    // function untuk tambah data
    const handleSubmitData = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "https://testcrud.fikrisabriansyah.my.id/api/product/update",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
                data: {
                    product_id: produkId,
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
            <h1 className="text-center mb-3">Edit Data</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="fw-semibold">Product ID</Form.Label>
                    <Form.Control type="text" placeholder="Enter product ID" onChange={(e) => setProdukId(e.target.value)} />
                </Form.Group>
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

export default editdata;
