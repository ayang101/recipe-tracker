import React, {useState} from 'react';

function LoginForm(props) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'username') {
            setUser({
                username: value,
                password: user['password']
            });
        } else if (name === 'password') {
            setUser({
                username: user['username'],
                password: value
            });
        }
    }

    function submitForm() {
        setUser({
            username: '',
            password: ''
        });
    }


    return (
        <form>
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
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default LoginForm;