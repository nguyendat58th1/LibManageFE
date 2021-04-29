import React, { useEffect, useState } from "react";
import { GetListBookAdmin } from "./BookService/getlistBook"
import { Link } from "react-router-dom";
import axios from "axios";
import { GetListCategory } from "../Category/CategoryService/getlistCategory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle, faPlusCircle, faPlusSquare, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";




let USER_ID = JSON.parse(sessionStorage.getItem('userId')!);
let USER_ROLE = JSON.parse(sessionStorage.getItem('role')!);


export function ListBookAdmin() {
    const [book, setBook]: [any, any] = useState([]);
    const [category, setCategory] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        GetListBookAdmin().then(data => {
            setBook(data.data);
        });
    }, []);

    useEffect(() => {
        (async () => {
            GetListCategory()
                .then((res) => res.data)
                .then((data) => {
                    setCategory(data);
                })
                .catch((err) => setError(err));
        })();
    }, []);

    let OnDelete = (id: number) => {
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("https://localhost:5001/api/Book/" + id ,  {withCredentials: true})
                .then(
                    (res) => {
                        if (!(res.status === 200)) {
                            alert("Delete book failed!")
                        }
                        else {
                            alert("Delete book successfully!");
                        }
                    }
                );
                setBook((bookId: any[]) => bookId.filter(item =>
                item.bookId !== id
            ));
            return true;
        }
        else
            return false;
    
    }

    return (
     
        <div className="container-fluid">
             {USER_ID !== null && USER_ROLE == 0 &&
             <div style={{marginTop:20}}>
            <Link className="btn btn-info btnAddBook" to="/addbook"><FontAwesomeIcon icon ={faPlusCircle} /></Link>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Image</th>
                        <th scope="col">Category</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>

                    </tr>
                </thead>
                <tbody>
                    {book &&
                        book.length > 0 &&
                        book.map((p: any) => (
                            <tr>
                                <th key={p.bookId} scope="row">{p.bookId}</th>
                                <td>{p.title}</td>
                                <td>{p.author}</td>
                                <td><img className="tableImg" src={p.image} alt="" /></td>
                                {category &&
                                    category.length >= 0 &&
                                    category.map((c: any) => {
                                        if (c.categoryId === p.categoryId) {
                                            return <td>{c.categoryName}</td>
                                        }

                                    })}
                                <td>{p.description}</td>
                                <td></td>
                                <td>
                                    <Link className="btn btn-success btnTB" to={`/detailbook/${p.bookId}`}><FontAwesomeIcon icon ={faInfoCircle} /></Link>
                                    <Link className="btn btn-primary btnTB" to={`/editbook/${p.bookId}`}><FontAwesomeIcon icon ={faEdit} /></Link>
                                    <button className="btn btn-danger btnTB" onClick={() => { OnDelete(p.bookId) }}><FontAwesomeIcon icon ={faTrashAlt} /></button>
                                </td>

                            </tr>
                        ))}
                    {/* {listPro.err && <p>Something went wrong!</p>} */}

                </tbody>
            </table>
            </div>
}
        </div>
    )
}