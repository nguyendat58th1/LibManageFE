import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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
import { ListRequest } from './pages/Request/request-list';
import { ListRequestAdmin } from './pages/Request/request-list-admin';
import { ButtonDropdown, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

function App() {
  const [dropdownOpenAdmin, setDropdownOpenAdmin] = useState(false);

  const toggleAdmin = () => setDropdownOpenAdmin(prevState => !prevState);

  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  const toggleUser = () => setDropdownOpenUser(prevState => !prevState);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item active">
              <ButtonDropdown isOpen={dropdownOpenAdmin} toggle={toggleAdmin}>
                <DropdownToggle color="primary" caret>
                  For Admin
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem ><Link to="/bookadmin">List Book For Admin</Link></DropdownItem>
                  <DropdownItem><Link  to="/requestAdmin">List Request For Admin</Link></DropdownItem>
                  <DropdownItem><Link  to="/category">List Category</Link></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </li>
                    <li className="nav-item active">
              <ButtonDropdown isOpen={dropdownOpenUser} toggle={toggleUser}>
                <DropdownToggle color="primary" caret>
                  For User
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem ><Link  to="/book">List Book</Link></DropdownItem>
                  <DropdownItem><Link  to="/request">List Request</Link></DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
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
        <Route path="/request">
          <ListRequest />
        </Route>
        <Route path="/requestAdmin">
          <ListRequestAdmin />
        </Route>
      </Switch>



    </Router>

  )
}

export default App;
