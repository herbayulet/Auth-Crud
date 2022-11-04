import React from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import Cookies from "js-cookie";
import cookie from "js-cookie";
import Router from "next/router";
import axios from "axios";

const Header = () => {
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios({
                method: "POST",
                url: "https://testcrud.fikrisabriansyah.my.id/api/logout",
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            cookie.remove("name");
            cookie.remove("token");
            setTimeout(() => {
                alert(data.message);
            }, 2500);
            Router.push({ pathname: "/" });
        } catch (error) {
            alert(error);
        }
    };

    return (
        <>
            <Navbar className="bg-dark">
                <Container>
                    <Navbar.Brand href="#home" className="text-white fw-semibold">
                        Product List Inditama
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text className="fw-semibold text-white bg-info py-2 px-2 rounded-2">
                            Signed in as:{" "}
                            <a href="#login" className="text-white">
                                {" "}
                                {cookie.get("name")}
                            </a>
                        </Navbar.Text>
                        <Button className="ms-md-2" variant="danger" onClick={handleLogout}>
                            Log out
                        </Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
