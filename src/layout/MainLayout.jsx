import { Outlet } from "react-router-dom"
import Header from "./header"
import Footer from "./footer";
import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function MainLayout(){

    

    return(
        <>
            <Header/>
            <div className="content-container">
                <Container>
                    <Outlet/>
                </Container> 
            </div>
            <Footer/>
        </>
    )
}