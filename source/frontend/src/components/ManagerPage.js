import '../styles/managerPage.css';

const ManagerPage = () => {
  return (
    <div>
      <NavBar/>
      <table>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Password</th>
        </tr>
        <StudentRow name="John" username="john123" password="banana"/>
      </table>
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