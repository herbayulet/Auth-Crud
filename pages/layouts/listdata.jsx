import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import Header from "../../components/header";
import Cookies from "js-cookie";
import Router from "next/router";

const Listdata = () => {
    const [datas, setDatas] = useState([]);

    useEffect(() => {
        getDataProduct();
    }, []);

    // function untuk mendapatkan data
    const getDataProduct = async () => {
        try {
            const response = await axios.get("https://testcrud.fikrisabriansyah.my.id/api/product", {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                },
            });
            setDatas(response.data.data);
            console.log("ini response.data.data", JSON.stringify(response.data.data));
        } catch (error) {
            console.log(error);
        }
    };

    // function untuk menghapus data
    const deleteProduct = async (id) => {
        let config = {
            method: "delete",
            url: `https://testcrud.fikrisabriansyah.my.id/api/product/${id}`,
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        axios(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // Navigasi untuk ke halaman tambah produk
    const moveToAdd = () => {
        Router.push({ pathname: "/layouts/adddata" });
    };

    // Navigasi untuk ke halaman detail produk
    const detailProduct = (item) => {
        Router.push({
            pathname: `/layouts/${item}`,
            query: {
                item: item,
            },
        });
    };

    // Navigasi untuk ke halaman edit produk
    const editProduct = (item) => {
        Router.push({
            pathname: `/layouts/editdata`,
            query: {
                item: item,
            },
        });
    };

    return (
        <div>
            <Header />
            <Container>
                <Button className="mt-5 flex float-end mb-3" variant="success" onClick={moveToAdd}>
                    Add Data
                </Button>
                <Table striped bordered hover variant="dark" className="text-center">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th colSpan={3}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.map((data, i) => {
                            return (
                                <tr key={data?.id}>
                                    <td>{i + 1}</td>
                                    <td>{data?.name}</td>
                                    <td>
                                        {new Intl.NumberFormat("id-ID", {
                                            style: "currency",
                                            currency: "IDR",
                                            currencyDisplay: "symbol",
                                        }).format(data?.price)}
                                    </td>
                                    <td className="text-info cursor-pointer" onClick={() => detailProduct(data.id)}>
                                        Detail
                                    </td>
                                    <td className="text-warning" onClick={() => editProduct(data.id)}>
                                        Edit
                                    </td>
                                    <td className="text-danger" onClick={() => deleteProduct(data.id)}>
                                        Delete
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Listdata;
