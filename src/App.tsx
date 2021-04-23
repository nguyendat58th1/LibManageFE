import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import { AddBook } from './pages/Book/add-book';
import Login from './pages/login';
import { ListBook } from './pages/Book/book-list';
import Register from './pages/register';
import { EditBook } from './pages/Book/edit-book';
import DetailBook from './pages/Book/detail-book';
import { ListCategory } from './pages/Category/category-list';
import AddCategory from './pages/Category/add-category';
import EditCategory from './pages/Category/edit-category';
import { ListBookAdmin } from './pages/Book/book-list-admin';

function App() {
 
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/book">List Book</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/bookadmin">List Book For Admin</Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/category">List Category</Link>
            </li>
           

          </ul>
          
        </div>
      </nav>



      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/addbook">
          <AddBook />
        </Route>
        <Route path="/book">
          <ListBook />
        </Route>
        <Route path="/bookadmin">
          <ListBookAdmin />
        </Route>
        <Route exact path="/detailbook/:bookId">
          <DetailBook />
        </Route>
        <Route exact path="/editbook/:bookId">
          <EditBook />
        </Route>
        <Route path="/category">
          <ListCategory />
        </Route>
        <Route path="/addcategory">
          <AddCategory />
        </Route>
        <Route path="/editcategory/:categoryId">
          <EditCategory />
        </Route>
      </Switch>



    </Router>

  )
}

export default App;
