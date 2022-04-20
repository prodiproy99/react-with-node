import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const user = { name, email };

    // post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
          const newUsers = [...users, data]
          setUsers(newUsers);
      })
  }

  return (
    <div className="App">
      <h2>Total user: {users.length} </h2>
      <form onSubmit={handleAddUser}>
        <input type='text' name='name' placeholder='Your name' required />
        <input type='email' name='email' placeholder='Your email' required />
        <button>Add User</button>
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id}Name: {user.name} Email: {user.email}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
