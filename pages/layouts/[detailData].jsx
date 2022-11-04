import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Cookies from "js-cookie";
import axios from "axios";
import Router, { useRouter } from "next/router";

const Index = () => {
    const router = useRouter();

    const [detailProduk, setDetailProduk] = useState([]);

    useEffect(() => {
        detailProduks();
    }, []);

    const detailProduks = async () => {
        let config = {
            method: "get",
            url: `https://testcrud.fikrisabriansyah.my.id/api/product/show?product_id=${router.query.item}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data.data));
                setDetailProduk(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const moveHome = () => {
        Router.push({ pathname: "/layouts/listdata" });
    };

    return (
        <Container>
            <h1 className="text-center">Detail Produk</h1>
            <Button className="mt-5 flex float-end mb-3" variant="success" onClick={moveHome}>
                Home
            </Button>
            <Table striped bordered hover variant="dark" className="text-center">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Product</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={detailProduk?.id}>
                        <td>{1}</td>
                        <td>{detailProduk?.name}</td>
                        <td>
                            {new Intl.NumberFormat("id-ID", {
                                style: "currency",
                                currency: "IDR",
                                currencyDisplay: "symbol",
                            }).format(detailProduk?.price)}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};

export default Index;
