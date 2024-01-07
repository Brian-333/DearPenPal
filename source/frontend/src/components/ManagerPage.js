import '../styles/managerPage.css';
import React, { useState } from 'react';

const ManagerPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [students, setStudents] = useState([]);

  const addStudent = (student) => {
    setStudents([...students, student]);
    closeModal();
  }

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
            {students.map(student => <StudentRow {...student} />)}
          </table>
        </div>
      </div>
      <AddStudentButton onClick={openModal}/>
      <AddStudentModal isOpen={isOpen} close={closeModal} onSubmit={addStudent} />
    </div>
  );
}

const AddStudentModal = ({isOpen, close, onSubmit}) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.trim() === "" || username.trim() === "" || password.trim() === "") {
      return;
    }

    onSubmit({name, username, password});
    setName("");
    setUsername("");
    setPassword("");
  }

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={close}/>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <div class="form-element">
            <label>Name: </label>
            <input type="text" name="name" placeholder={'Mandatory'} onChange={e => setName(e.target.value)} />
          </div>
          <div class="form-element">
            <label>Username: </label>
            <input type="text" name="username" placeholder={'Leave blank for a random username'} onChange={e => setUsername(e.target.value)} />
          </div>
          <div class="form-element">
            <label>Password: </label>
            <input type="text" name="password" placeholder={'Leave blank for a random password'} onChange={e => setPassword(e.target.value)} />
          </div>
          <input type="submit" value="Submit"/>
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