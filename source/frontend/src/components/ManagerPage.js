import { LogMeOut } from '../api';
import '../styles/managerPage.css';
import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';

const ManagerPage = () => {
  const [students, setStudents] = useState([]);
  const [displayedStudents, setDisplayedStudents] = useState([]);

  const addStudent = (student) => {
    const newStudents = [...students, student];
    newStudents.reverse();
    setStudents(newStudents);
    setDisplayedStudents(newStudents);
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
      <NavBar handleSearchChange={handleSearchChange}/>
      <div className='student-table'>
        <table>
            <tr>
              <th>Name</th>
              <th>Username</th>
              <th>Password</th>
            </tr>
            <InputRow onSubmit={addStudent}/>
        </table>
        <div class="students">
          <table>
            {displayedStudents.map((student) => <StudentRow {...student} />)}
          </table>
        </div>
      </div>
      {/* <AddStudentModal isOpen={isOpen} close={closeModal} onSubmit={addStudent} /> */}
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

      onSubmit({ name: nameValue, username: finalUsername, password: finalPassword });
      setNameValue("");
      setUsernameValue("");
      setPasswordValue("");
    }
  }

  return (
    <tr>
      <td>
        <input 
          className='MyInput'
          placeholder='Type student name...'
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
    </tr>
  );
}

// const AddStudentModal = ({isOpen, close, onSubmit}) => {
//   const [name, setName] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     let finalUsername = username;
//     let finalPassword = password;
  
//     if (name.trim() === "") {
//       alert("Name field cannot be empty")
//       return;
//     }
//     if (username.trim() === "") {
//       finalUsername = generateRandomUsername();
//     }
//     if (password.trim() === "") {
//       finalPassword = generatePassword(10);
//     }
  
//     onSubmit({name: name, username: finalUsername, password: finalPassword});
//     setName("");
//     setUsername("");
//     setPassword("");
//   }

//   if (!isOpen) {
//     return null;
//   }

//   return (
//     <>
//       <div className="modal-backdrop" onClick={close}/>
//       <div className="modal-content">
//         <form onSubmit={handleSubmit}>
//           <div class="form-element">
//             <label onClick>Name: </label>
//             <input type="text" name="name" placeholder={'Mandatory'} onChange={e => setName(e.target.value)} />
//           </div>
//           <div class="form-element">
//             <label>Username: </label>
//             <input type="text" name="username" placeholder={'Leave blank for a random username'} onChange={e => setUsername(e.target.value)} />
//           </div>
//           <div class="form-element">
//             <label>Password: </label>
//             <input type="text" name="password" placeholder={'Leave blank for a random password'} onChange={e => setPassword(e.target.value)} />
//           </div>
//           <input type="submit" value="Submit"/>
//         </form>
//       </div>
//     </>
//   );
// }

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

const StudentRow = ({name, username, password, onClick}) => {
  return (
    <tr>
      <td className="cursor-pointer" onClick={onClick}>{name}</td>
      <td>{username}</td>
      <td>{password}</td>
    </tr>
  );
}

const NavBar = ({handleSearchChange}) => {
  const {access_token: [token, removeToken, ]} = useContext(UserContext)
  function onLogOut()
  {
    LogMeOut({token, removeToken})
  }

  return (
    <nav>
      <div className="account-container">
        <button className="accountbtn">Account</button>
        <div className="dropdown">
          <button className="logoutbtn" onClick={onLogOut}>Log Out</button>
        </div>
      </div>
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search for Student..." onChange={handleSearchChange} />
        </form>
      </div>
    </nav>
  );
}

export default ManagerPage