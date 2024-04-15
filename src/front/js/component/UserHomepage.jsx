import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel } from 'react-bootstrap';
import { Context } from '../store/appContext';
import { Link } from 'react-router-dom';

const UserHomepage = () => {
    const currentUser = JSON.parse(localStorage.getItem('availableAccount'));

    const textStyle = {
        '@media (max-width: 768px)': {
            fontSizeH3: '1.5rem',
            fontSizeH6: '1rem',
            fontSizeP: '0.8rem'
        },
        '@media (min-width: 769px)': {
            fontSizeH3: '2rem',
            fontSizeH6: '1.5rem',
            fontSizeP: '1rem'
        }
    };

    return (
        <Container className='p-0' fluid>
            <Carousel>
                <Carousel.Item className="w-100 m-0 p-0">
                    <img
                        className="d-block w-100"
                        src="https://pic1.calcalist.co.il/PicServer3/2018/09/03/844792/hutterstock_77087711229557_lm.jpg"
                        alt="First slide"
                        style={{ objectFit: 'cover', opacity: '0.5', height: '100vh' }}
                    />
                    <Card.ImgOverlay className='d-flex flex-column align-items-center justify-content-center mx-3' style={{ textAlign: 'center', color: 'white' }}>
                        <h3 style={{ color: 'black', fontSize: textStyle.fontSizeH3 }}><strong>¡Hola, {currentUser.user.name}!</strong></h3>
                        <p style={{ color: 'black', fontSize: textStyle.fontSizeP }}>¿Listo para encontrar la clase perfecta para ti? ¡Echa un vistazo a nuestras opciones y únete hoy mismo!</p>
                        <p style={{ color: 'black', fontSize: textStyle.fontSizeP }}>Necesitas ayuda para comenzar o tienes alguna pregunta sobre cómo funciona la aplicación? Aquí encontrarás todo lo que necesitas saber. 😊</p>
                        <Button as={Link} to="/users/info">
                            Obtener más información
                        </Button>
                    </Card.ImgOverlay>
                </Carousel.Item>
            </Carousel>
        </Container>
    );
}

export default UserHomepage;
