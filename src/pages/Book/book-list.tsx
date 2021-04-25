import React, { useEffect, useState } from "react";
import { GetListBook } from "./BookService/getlistBook"
import { Link } from "react-router-dom";
import { Button, Card, CardBody, Collapse } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { GetListRequestDetail } from "../Request/RequestService/getlistRequest";








export function ListBook() {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [book, setBook]: [any, any] = useState([]);
    const [bookId, setBookId]: [any, any] = useState([]);
    const [requestDetail, setRequestDetail]: [any, any] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        GetListBook().then(data => {
            setBook(data.data);
        });
    }, []);

    useEffect(() => {
        GetListRequestDetail().then(data => {
            setRequestDetail(data.data);
        });
    }, []);

    async function SubmitRequest() {
        try {
            await axios.post(`https://localhost:5001/api/BookBorrowingRequest/${1}` ,bookId)
            .then(
                (res) => {
                    if (res.status === 200) {
                        alert("Your request has been sent");
                    }
                }
            );
            // const res = await axios.get("https://localhost:5001/api/User");
            // const data = res.data;
            // setUser(data);
            // console.log("abc");
           
           } catch (err) {
             setError(err);
             alert('You cannot borrow more than 3 time a month')
             
           }
      
    }

    function CheckBook(Id: number) {

        for (var i = 0; i < bookId.length; i++) {
            if (bookId[i] === Id) {
                alert('This book was already in list request ');
                return false;
            }
        }
        for (var i = 0; i < requestDetail.length; i++) {
            if (requestDetail[i].bookId === Id) {
                alert('This book has been borrowed ');
                return false;
            }
        }
        return true;
    }

    function Borrow(Id: number) {

        if (bookId.length < 5) {
            if (CheckBook(Id)) {
                setBookId((arr: any) => [...arr, Id]);
                alert('successfully added');
            }

        }
        else {
            alert('you cannot borrow more than 5 books at a time');
        }

    }

    function Remove(Id: number) {
        for (var i = 0; i < bookId.length; i++) {

            if (bookId[i] === Id) {

                bookId.splice(i, 1);
                setBookId((bookId: any[]) => bookId.filter(item =>
                    item.bookId !== Id
                ));

            }
        }
    }

    return (
        <div className="container ">

            <div>
                <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Click to see your book request</Button>
                <Collapse isOpen={isOpen}>
                    <Card>
                        <CardBody>
                          
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">ID</th>
                                                <th scope="col">Title</th>
                                                <th scope="col">Author</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        {bookId.map((b: number) => (

                                            <tbody>
                                                {book &&
                                                    book.length > 0 &&
                                                    book.map((p: any) => {
                                                        if (p.bookId === b) {
                                                            return (
                                                                <tr>

                                                                    <th scope="row">{b}</th>
                                                                    <td>{p.title}</td>
                                                                    <td>{p.author}</td>
                                                                    <td><button className="btn btn-danger" onClick={() => { Remove(p.bookId) }}>Remove</button></td>

                                                                </tr>
                                                            )
                                                        }
                                                    })}
                                            </tbody>

                                        ))}
                                    </table>
                                    <button onClick={() => {SubmitRequest()}} className="btn btn-info">Send Request Borrow</button>
                             
                        </CardBody>
                    </Card>
                </Collapse>
            </div>


            <div className="row " style={{ marginTop: 10 }} >
                {book &&
                    book.length > 0 &&
                    book.map((p: any) => (
                        <div className="col-md-4 book " key={p.bookId} >
                            <div>
                                <img className="imgBook" src={p.image} alt="Card image cap" />
                                <div >
                                    <h5 > {p.title}</h5>
                                    <h6 > {p.author}</h6>
                                    <h6> ID : {p.bookId}</h6>

                                    {/* <div>{p.description}</div> */}
                                    <Link className="btn btn-success" to={`/detailbook/${p.bookId}`}>Detail</Link>
                                    {/* <Link className="btn btn-primary" to={`/editbook/${p.bookId}`}>Edit</Link> */}
                                    <button className="btn btn-info" onClick={() => { Borrow(p.bookId) }} >Add to borrow</button>
                                </div>
                            </div>

                        </div>


                    ))}
            </div>
        </div>
    )
}