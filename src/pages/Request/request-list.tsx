import React, { useEffect, useState } from "react";
import { GetListRequest, GetListRequestDetail } from "./RequestService/getlistRequest";





export function ListRequest() {
    const [request, setRequest]: [any, any] = useState([]);
    const [requestDetail, setRequestDetail]: [any, any] = useState([]);
    
    useEffect(() => {
        GetListRequest().then(data => {
            setRequest(data.data);
        });
    }, []);

    useEffect(() => {
        GetListRequestDetail().then(data => {
            setRequestDetail(data.data);
        });
    }, []);

  

    return (
        <div className="container ">
            <div className="row " >
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Request ID</th>
                            <th scope="col">Request User ID</th>
                            
                            <th scope="col">Date Request</th>
                            <th scope="col">Return Request Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Book ID</th>

                           
                        </tr>
                    </thead>
                    <tbody>
                        {request &&
                            request.length > 0 &&
                            request.map((r: any) => (
                                <tr>
                                    <th scope="row">{r.requestId}</th>
                                    <td>{r.requestUserId}</td>
                                   
                                    <td>{r.dateRequest}</td>
                                    <td>{r.returnRequest}</td>
                                    <td>{r.status}</td>
                                    <td>
                                    {requestDetail &&
                                        requestDetail.length > 0 &&
                                        requestDetail.map((rd: any) => {
                                            if (rd.requestId === r.requestId) {
                                                {
                                                  
                                                     
                                                          return( 
                                                           <div>
                                                                {rd.bookId}
                                                                </div>
                                                          )
                                                        

                                                    
                                                }

                                            }
                                        })}

                                    </td>


                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
        </div>

        // <table className="table table-hover">
        //     <thead>
        //         <tr>
        //         <th scope="col">ID</th>
        //         <th scope="col">Title</th>
        //         <th scope="col">Author</th>
        //         <th scope="col">Image</th>
        //         <th scope="col">Category ID</th>
        //         <th scope="col">Description</th>
        //         <th scope ="col"></th>
        //         <th scope ="col"></th>

        //         </tr>
        //     </thead>
        //     <tbody>
        //     {book &&
        //             book.length > 0 &&
        //             book.map((p: any) => (
        //                 <tr>
        //                 <th key={p.bookId} scope="row">{p.bookId}</th>
        //                 <td>{p.title}</td>
        //                 <td>{p.author}</td>
        //                 <td>{p.image}</td>
        //                 <td>{p.categoryId}</td>
        //                 <td>{p.description}</td>
        //                 <td> <Link to={`/detailbook/${p.bookId}`}>Detail</Link></td>
        //                 <td> <Link to={`/editproduct/${p.bookId}`}>Edit</Link></td>
        //                 </tr>
        //         ))}
        //         {/* {listPro.err && <p>Something went wrong!</p>} */}

        //     </tbody>
        // </table>

    )
}