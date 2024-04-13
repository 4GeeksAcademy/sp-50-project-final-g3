import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import Carousel from 'react-bootstrap/Carousel';
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Loading from './Loading.jsx';
import FilterAlert from './FilterAlert.jsx';
import ClassModal from './ClassModal.jsx';


const HomeUserClasses = () => {
    const { store, actions } = useContext(Context);
    const { createCheckoutSession } = actions
    const { currentUser, allClasses, userClasses } = store
    const { postUserClass, deleteUserClass } = actions
    const [showAlert, setShowAlert] = useState(false);
    const [interested, setInterested] = useState(false);

    useEffect(() => {
        checkClasses();
    }, []);

    const checkClasses = () => {
        if (userClasses.length !== 0) {
            userClasses.map((userClass) => {
                for (let i = 0; i < allClasses.length; i++) {
                    if (allClasses[i].id === userClass.class) {
                        allClasses[i]["isInterested"] = false;
                        console.log('No interest', allClasses[i]);
                    } else {
                        allClasses[i]["isInterested"] = true;
                        console.log('Interest', allClasses[i]);
                    }
                }
            })
        } else {

            for (let i = 0; i < allClasses.length; i++) {
                allClasses[i]["isInterested"] = true;
                console.log(allClasses[i]);
                setInterested(true);
                console.log('hey!')
            }
        }
    };

    const chunkSize = 3;
    const chunkedClasses = [];
    for (let i = 0; i < allClasses.length; i += chunkSize) {
        chunkedClasses.push(allClasses.slice(i, i + chunkSize));
    }

    if (!currentUser || !currentUser.user) {
        return <Loading />;
    }

    if (!allClasses) {
        return <Loading />;
    }

    const handleCheckout = async (productId, customerId) => {
        await createCheckoutSession(productId, customerId)
    }

    const handleInterested = async (value, classId, price) => {
        try {
            if (!value) {
                await deleteUserClass(currentUser.user.id, classId);
                setInterested(value);
            } else {
                await postUserClass(price, classId);
                setInterested(!value);
            }
            allClasses.map(oneClass => {
                if (oneClass.id === classId) {
                    oneClass["isInterested"] = !value
                    return
                }
                return;
            });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
            {chunkedClasses.length > 1 ? (
                <Carousel prevIcon={<BsChevronCompactLeft />} nextIcon={<BsChevronCompactRight />}>
                    {chunkedClasses.map((chunk, index) => (
                        <Carousel.Item key={index}>
                            <div className="row">
                                {chunk.map(oneClass => (
                                    <div className='col-4' key={oneClass.id}>
                                        <Card className='my-3'>
                                            <Card.Header>Detalles de la Clase</Card.Header>
                                            <Card.Body>
                                                <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                                <Card.Text>
                                                    {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                                </Card.Text>
                                                <div className='d-flex justify-content-center'>
                                                    <ClassModal userClass={oneClass} />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div className="row">
                    {allClasses.map(oneClass => (
                        <div className='col-4 h-100' key={oneClass.id}>
                            <Card className='my-3'>
                                <Card.Header>Detalles de la Clase</Card.Header>
                                <Card.Body>
                                    <Card.Title>{oneClass.class_name ? oneClass.class_name : 'Clase de entrenamiento'}</Card.Title>
                                    <Card.Text>
                                        {oneClass.class_details ? oneClass.class_details : 'Clase de entrenamiento'}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    {oneClass.capacity < 1 ? (
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <Button variant='danger' disabled>Clase completa!</Button>
                                        </div>
                                    ) : (
                                        <div className='d-flex justify-content-center gap-2'>
                                            <ClassModal userClass={oneClass} />
                                            <Button variant={oneClass.isInterested ? "primary" : "danger"} onClick={() => {
                                                handleInterested(oneClass.isInterested, oneClass.id, oneClass.price);
                                                oneClass.isInterested = !oneClass.isInterested;
                                            }}>
                                                {oneClass.isInterested ? "Estoy interesado" : "No estoy interesado"}
                                            </Button>
                                            {oneClass.isInterested === false ? (
                                                <Button onClick={() => { handleCheckout(oneClass.stripe_product_id, currentUser.user.stripe_customer_id) }}>Checkout!</Button>
                                            ) : null}
                                        </div>
                                    )}
                                </Card.Footer>
                            </Card>
                        </div>
                    ))}
                </div >
            )}
            {
                allClasses.length === 0 && (
                    <FilterAlert location='userClasses' showAlert={setShowAlert} />
                )
            }
        </>
    )
}
export default HomeUserClasses;