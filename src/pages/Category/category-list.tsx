import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



let USER_ID = JSON.parse(sessionStorage.getItem('userId')!);
let USER_ROLE = JSON.parse(sessionStorage.getItem('role')!);

export function ListCategory() {
    const [category, setCategory]: [any, any] = useState([]);
    useEffect(() => {
        axios.get("https://localhost:5001/api/Category", {withCredentials: true}).then(data => {
            setCategory(data.data);
        });
    }, []);

    let OnDelete = (id: number) => {
        var x = window.confirm("Are you sure you want to delete?");
        if (x) {
            axios.delete("https://localhost:5001/api/Category/" + id, {withCredentials: true})
            .then(
                (res) => {
                    if (!(res.status === 200)) {
                        alert("Delete category failed!")
                    }
                    else {
                        alert("Delete category successfully!");
                    }
                }
            );
            setCategory((categoryId: any[]) => categoryId.filter(item =>
                item.categoryId !== id
            ));
            return true;
        }
        else
            return false;
       
    }

    return (
        <div className="container ">
            {USER_ID !== null && USER_ROLE == 0 &&
             
            <div className="row " >

                <Link className="btn btn-success" to="/addcategory">Add Category</Link>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Category ID</th>
                            <th scope="col">Category name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {category &&
                            category.length > 0 &&
                            category.map((c: any) => (
                                <tr>
                                    <th scope="row">{c.categoryId}</th>
                                    <td>{c.categoryName}</td>
                                    <td><Link className="btn btn-primary" to={`/editcategory/${c.categoryId}`}>Edit</Link></td>
                                    <td> <button className="btn btn-danger" onClick={() => { OnDelete(c.categoryId) }}>Delete</button></td>


                                </tr>
                            ))}
                    </tbody>
                </table>

            </div>
                }
        </div>

       

    )
}