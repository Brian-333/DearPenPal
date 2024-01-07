import '../styles/managerPage.css';
import React, { useState } from 'react';

const ManagerPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <NavBar/>
      <div className='student-table'>
        <table>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
        </table>
        <div class="students">
          <table>
            <StudentRow name="John" username="john123" password="banana"/>
            <StudentRow name="John" username="john123" password="banana"/>
            <StudentRow name="John" username="john123" password="banana"/>
          </table>
        </div>
      </div>
      <AddStudentButton onClick={openModal}/>
      <StudentModal isOpen={isOpen} close={closeModal} />
    </div>
  );
}

const StudentModal = ({isOpen, close}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" />
      <div className="modal-content">
        <form>
          <div class="form-element">
            <label>Name: </label>
            <input type="text" name="name" placeholder={'Mandatory'}/>
          </div>
          <div class="form-element">
            <label>Username: </label>
            <input type="text" name="name" placeholder={'Leave blank for a random username'}/>
          </div>
          <div class="form-element">
            <label>Password: </label>
            <input type="text" name="name" placeholder={'Leave blank for a random password'}/>
          </div>
          <input type="submit" value="Submit" onClick={close}/>
        </form>
      </div>
    </>
  );
}

const AddStudentButton = (props) => {
  return (
    <div className='addStudentContainer'>
      <button onClick={props.onClick}>Add New Student</button>
    </div>
  );
}

const StudentRow = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.username}</td>
      <td>{props.password}</td>
    </tr>
  );
}

const NavBar = () => {
  return (
    <nav>
      <div className="account-container">
        <button>Account</button>
      </div>
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search for Student..." />
          <button type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default ManagerPage