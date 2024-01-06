const ManagerPage = () => {
  const styles = {
    backgroundColor: 'black',
    padding: 20
  };

  return (
    <nav style={styles}>
      <div className="account-container">
        <button>Account</button>
      </div>
      <div className="search-container">
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
  </nav>
  );
}

export default ManagerPage