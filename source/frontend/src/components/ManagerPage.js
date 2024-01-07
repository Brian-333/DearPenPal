import { LogMeOut, FetchSubAccts, AddSubAcct } from '../api';
import '../styles/managerPage.css';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from './UserContext';

const ManagerPage = () => {
  const [students, setStudents] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);
  const [error, setError] = useState(null);
  const {access_token: [token,, ]} = useContext(UserContext);

  useEffect(() => {
    FetchSubAccts({token, setSubAccts: setStudents, setDisplayedSubAccts: setDisplayedStudents});
  }, [token])

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleNameClick = () => {
    setIsModalVisible(true);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
  }

  const addStudent = (student) => {
    return AddSubAcct({token: token, username: student.username, password: student.password, name: student.name, setError})
    .then((err) => {
      if (err !== null) {
        setError(err)
        return err
      }

      setError(null)
      const newStudents = [student, ...students];
      setStudents(newStudents);
      setDisplayedStudents(newStudents);
      return null
    });
  }

  const handleSearchChange = (event) => {
    if (event.target.value === "") {
      setDisplayedStudents(students);
    } else {
      const filteredStudents = students.filter((student) => student.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setDisplayedStudents(filteredStudents);
    }
  }

  return (
    <div>
      <NavBar handleSearchChange={handleSearchChange} error={error}/>
      <div className='student-table'>
        <table>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
              <th>Matched</th>
            </tr>
            <InputRow onSubmit={addStudent}/>
        </table>
        <div class="students">
          <table>
            {displayedStudents.map((student) => <StudentRow {...student} onClick={handleNameClick} matched='Refresh page'/>)}
          </table>
        </div>
      </div>
      <StudentModal show={isModalVisible} onClose={handleCloseModal}/>
    </div>
  );
}

const InputRow = ({onSubmit}) => {
  const [nameValue, setNameValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && nameValue.trim() !== "") {
      let finalUsername = usernameValue;
      let finalPassword = passwordValue;
    
      if (nameValue.trim() === "") {
        alert("Name field cannot be empty")
        return;
      }
      if (usernameValue.trim() === "") {
        finalUsername = generateRandomUsername();
      }
      if (passwordValue.trim() === "") {
        finalPassword = generatePassword(10);
      }

      onSubmit({ name: nameValue, username: finalUsername, password: finalPassword })
      .then((err) => {
        if(err === null)
        {
          setNameValue("");
          setUsernameValue("");
          setPasswordValue("");
        }
    });
    }
  }

  return (
    <tr>
      <td>
        <input 
          className='MyInput'
          placeholder='Type account name...'
          type="text" 
          value={nameValue} 
          onChange={e => setNameValue(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input 
          className='MyInput'
          placeholder='Leave blank for random username'
          type="text" 
          value={usernameValue} 
          onChange={e => setUsernameValue(e.target.value)} 
          onKeyDown={handleKeyDown}
        />
      </td>
      <td>
        <input 
        className='MyInput'
        placeholder='Leave blank for random password'
        type="text" 
        value={passwordValue} 
        onChange={e => setPasswordValue(e.target.value)} 
        onKeyDown={handleKeyDown}
        />
      </td>
      <td></td>
    </tr>
  );
}

const StudentModal = ({show, onClose}) => {
  if (!show) {
    return null;
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}/>
      <div className="modal-content">
        <label>Change Name</label>
        <div className='.form-element'>
          <input placeholder='Type new name...'></input>
        </div>
        <div className='.form-element'>
          <button>Submit</button>
        </div>

        <label>Change Password</label>
        <div className='.form-element'>
          <input placeholder='Old password...'></input>
        </div>
        <div className='.form-element'>
          <input placeholder='New password...'></input>
        </div>
        <div className='.form-element'>
          <input placeholder='Confirm new password...'></input>
        </div>
        <div className='.form-element'>
          <button>Submit</button>
        </div>

        <div className='.form-element'>
          <button>Delete Account</button>
        </div>
      </div>
    </>
  );
}

function generateRandomUsername() {
  const adjectives = ['Quick', 'Lazy', 'Happy', 'Sad', 'Sleepy', 'Noisy', 'Hungry'];
  const nouns = ['Bear', 'Fox', 'Panda', 'Rabbit', 'Turtle', 'Raccoon', 'Lion'];
  
  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  
  return randomAdjective + randomNoun + randomNumber;
}

function generatePassword(length) {
  var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var password = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
}

const StudentRow = ({name, username, password, onClick, matched}) => {
  return (
    <tr>
      <td className="cursor-pointer" onClick={onClick}>{name}</td>
      <td>{username}</td>
      <td>{password}</td>
      <td>{matched}</td>
    </tr>
  );
}

const NavBar = ({handleSearchChange, error}) => {
  const {access_token: [token, removeToken, ]} = useContext(UserContext)
  function onLogOut()
  {
    LogMeOut({token, removeToken})
  }

  return (
    <nav className="navbar">
      <div className="account-container">
        <button className="accountbtn">Account</button>
        <div className="dropdown">
          <button className="logoutbtn" onClick={onLogOut}>Log Out</button>
        </div>
      </div>
      <div className="errormng">
        <p>{error}</p>
      </div>
      <div className="search-container">
        <form>
          <input class = 'bgcolour' type="text" placeholder="Search for account..." onChange={handleSearchChange} />
        </form>
      </div>
    </nav>
  );
}

export default ManagerPage