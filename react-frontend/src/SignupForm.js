import React, {useState} from 'react';
import './App.css';


function SignupForm(props) {
    const [user, setUser] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'name') {
            setUser({
                name: value,
                email: user['email'],
                username: user['username'],
                password: user['password'],
                confirmPassword: user['confirmPassword']
            });
        } else if (name === 'email') {
            setUser({
                name: user['name'],
                email: value,
                username: user['username'],
                password: user['password'],
                confirmPassword: user['confirmPassword']
            });
        } else if (name === 'username') {
            setUser({
                name: user['name'],
                email: user['email'],
                username: value,
                password: user['password'],
                confirmPassword: user['confirmPassword']
            });
        } else if (name === 'password') {
            setUser({
                name: user['name'],
                email: user['email'],
                username: user['username'],
                password: value,
                confirmPassword: user['confirmPassword']
            });
        } else if (name === 'confirmPassword') {
            setUser({
                name: user['name'],
                email: user['email'],
                username: user['username'],
                password: user['password'],
                confirmPassword: value
            });
        }
    }

    function submitForm() {
        props.handleSubmit(user);
        if (user.password === user.confirmPassword) {
            setUser({
                name: '',
                email: '',
                username: '',
                password: '',
                confirmPassword: ''
            });
        }
    }


    return (
        <form className='signup-form'>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                value={user.name}
                onChange={handleChange} />
            <label htmlFor="email">Email</label>
            <input
                type="text"
                placeholder="example@gmail.com"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange} />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                value={user.username}
                onChange={handleChange} />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                placeholder="********"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange} />
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                type="text"
                placeholder="********"
                name="confirmPassword"
                id="confirmPassword"
                value={user.confirmPassword}
                onChange={handleChange} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default SignupForm;