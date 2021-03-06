import { faCoffee, faThumbsDown, faThumbsUp, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { GetListBook } from "../Book/BookService/getlistBook";
import {  GetListRequestDetail, GetListRequestForAdmin } from "./RequestService/getlistRequest";




let USER_ID = JSON.parse(sessionStorage.getItem('userId')!);
let USER_ROLE = JSON.parse(sessionStorage.getItem('role')!);

export function ListRequestAdmin() {
    const [request, setRequest]: [any, any] = useState([]);
    const [requestDetail, setRequestDetail]: [any, any] = useState([]);
    const [error, setError] = useState(null);
    const [book, setBook]: [any, any] = useState([]);
    const [update, setUpdate]=useState(false);
    useEffect(() => {
        GetListRequestForAdmin().then(data => {
            setRequest(data.data);
        });
    }, [update]);

    useEffect(() => {
        GetListRequestDetail().then(data => {
            setRequestDetail(data.data);
        });
    }, []);

    useEffect(() => {
        GetListBook().then(data => {
            setBook(data.data);
        });
    }, []);
    let USER_ID = JSON.parse(sessionStorage.getItem('userId')!);

    async function Approve(id : number) {
        try {
            await axios.put(`https://localhost:5001/api/BookBorrowingRequest/${USER_ID}/approve/${id}` ,  USER_ID , {withCredentials: true})
            .then(
                (res) => {
                    if (!(res.status === 200)) {
                        alert("Something went wrong")
                    }
                    else {
                        alert("Successful");
                    }
                }
            );
                setUpdate(pre=>!pre);
           } catch (err) {
             setError(err);
           }

    }
    async function Reject(id : number) {
        try {
            await axios.put(`https://localhost:5001/api/BookBorrowingRequest/${USER_ID}/reject/${id}` , USER_ID , {withCredentials: true})
            .then(
                (res) => {
                    if (!(res.status === 200)) {
                        alert("Something went wrong")
                    }
                    else {
                        alert("Successful");
                    }
                }
            );
            setUpdate(pre=>!pre);
           } catch (err) {
             setError(err);
           }

    }

    let OnDelete = (id: number) => {
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("https://localhost:5001/api/BookBorrowingRequest/" + id,  {withCredentials: true})
                .then(
                    (res) => {
                        if (!(res.status === 200)) {
                            alert("Delete request failed!")
                        }
                        else {
                            alert("Delete request successfully!");
                        }
                    }
                );
                setRequest((request: any[]) => request.filter(item =>
                item.requestId !== id
            ));
            return true;
        }
        else
            return false;
    
    }
  

    return (
        
        <div className="container-fluid">
            {USER_ID !== null && USER_ROLE == 0 &&
            <div className="row " >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Request ID</th>
                            <th scope="col">Request User ID</th>
                            <th scope="col">Approve User ID</th>
                            <th scope="col">Reject User ID</th>
                            <th scope="col">Date Request</th>
                            <th scope="col">Return Request Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Books</th>
                            <th></th>
                            <th></th>

                           
                        </tr>
                    </thead>
                    <tbody>
                        {request &&
                            request.length > 0 &&
                            request.map((r: any) => (
                                <tr>
                                    <th scope="row">{r.requestId}</th>
                                    <td>{r.requestUserId}</td>
                                    <td>{r.approvalUserId}</td>
                                    <td>{r.rejectUserId}</td>
                                    <td>{r.dateRequest}</td>
                                    <td>{r.returnRequest}</td>
                                    {r.status === 0 && <td style = {{color: "blue"}}>Waiting</td>}
                                    {r.status === 1 && <td style = {{color: "green"}}>Approve</td>}
                                    {r.status === 2 && <td style = {{color: "red"}}>Reject</td>}
                                    
                                    <td>
                                    {requestDetail &&
                                        requestDetail.length > 0 &&
                                        requestDetail.map((rd: any) => {
                                            if (rd.requestId === r.requestId) {
                                                {
                                                    return (
                                                        <div>
                                                            {book &&
                                                                book.length > 0 &&
                                                                book.map((b: any) => {
                                                                    if (b.bookId === rd.bookId) {
                                                                        return b.title
                                                                    }

                                                                })}

                                                        </div>
                                                    )
                                                }

                                            }
                                        })}

                                    </td>
                                   
                                    <td>
                                        {r.status == 0 && <div> <button onClick={() => {Approve(r.requestId)}} className="btn btn-success btnRequest"> <FontAwesomeIcon icon ={faThumbsUp} /> </button></div> }
                                        {r.status == 0 && <div>  <button onClick={() => {Reject(r.requestId)}} className="btn btn-warning btnRequest"><FontAwesomeIcon icon ={faThumbsDown} /></button></div>}
                                        <div>
                                            <button className="btn btn-danger btnRequest" onClick={() => { OnDelete(r.requestId) }}><FontAwesomeIcon icon ={faTrashAlt} /></button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        }
        </div>

    )
}