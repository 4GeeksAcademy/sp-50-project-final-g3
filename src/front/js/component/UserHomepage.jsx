import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom'


const UserHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));

    return (
        <Container className='p-3' fluid>
            <Row>
                <Col>
                    <Carousel>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="https://pic1.calcalist.co.il/PicServer3/2018/09/03/844792/hutterstock_77087711229557_lm.jpg"
                                alt="First slide"
                                style={{ objectFit: 'cover', opacity: '0.5' }}
                            />
                            <Card.ImgOverlay className='d-flex flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                                <h3 style={{ color: 'black' }}><strong>¡Hola, {currentUser.user.name}!</strong></h3>
                                <h6 style={{ color: 'black' }}>¡Qué emocionante tenerte de vuelta! Explora las clases disponibles y comienza tu viaje hacia un estilo de vida más saludable.</h6>
                                <p style={{ color: 'black' }}>¿Listo para encontrar la clase perfecta para ti? ¡Echa un vistazo a nuestras opciones y únete hoy mismo!</p>
                                <p style={{ color: 'black' }}>Necesitas ayuda para comenzar o tienes alguna pregunta sobre cómo funciona la aplicación? Aquí encontrarás todo lo que necesitas saber. 😊</p>
                                <Button as={Link} to="/users/info" >
                                    Obtener más información
                                </Button>
                            </Card.ImgOverlay>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    );
}

export default UserHomepage;