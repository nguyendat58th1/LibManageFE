import React, { useEffect, useState } from "react";
import { GetListBook } from "./BookService/getlistBook"
import { Link } from "react-router-dom";
import axios from "axios";






export function ListBook() {
    // let arrBookId : Array<number> = [];
    const [book, setBook]: [any, any] = useState([]);
    const [bookId, setBookId]: [any, any] = useState([]);
    useEffect(() => {
        GetListBook().then(data => {
            setBook(data.data);
        });
    }, []);

    function Borrow(bookId: number) {

        setBookId(arr => [...arr, bookId]);

    }

    return (
        <div className="container ">
            <h1>
                {bookId.length}
            </h1>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Title</th>
                            <th scope="col">Author</th>
                        </tr>
                    </thead>
            {bookId.map((b: number) => (
              
                    <tbody>
                        {book &&
                            book.length > 0 &&
                            book.map((p: any) => {
                                if (p.bookId === b)
                                {
                                    return (
                                <tr>
                                
                                    <th scope="row">{b}</th>
                                    <td>{p.title}</td>
                                    <td>{p.author}</td>

                                </tr>
                                    )
                                }
                                })}
                    </tbody>
                
            ))}
            </table>

            <div className="row " >
                {book &&
                    book.length > 0 &&
                    book.map((p: any) => (

                        <div className="col-md-4 book ">
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