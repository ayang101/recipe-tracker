import React, {useState} from 'react';

function LoginForm(props) {
    const [uname, setUName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsgs, setErrorMsgs] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(event) {}

    function submitForm() {}


    return (
        <form>
            <label htmlFor="username">Username</label>
            <input
                type="text"
                placeholder="Username"
                name="username"
                id="username"
                value={uname} />
            <label htmlFor="password">Password</label>
            <input
                type="text"
                placeholder="********"
                name="password"
                id="password"
                value={password} />
            <input type="button" value="Submit" onCLick={submitForm} />
        </form>
    );
}

export default LoginForm;