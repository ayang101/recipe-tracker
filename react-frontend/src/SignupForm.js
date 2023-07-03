import React, {useState} from 'react';

function SignupForm(props) {
    const [email, setEmail] = useState('');
    const [uname, setUName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMsgs, setErrorMsgs] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(event) {}

    function submitForm() {}


    return (
        <form>
            <label htmlFor="email">Email</label>
            <input
                type="text"
                placeholder="example@gmail.com"
                name="email"
                id="email"
                value={email} />
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
            <label htmlFor="password2">Confirm Password</label>
            <input
                type="text"
                placeholder="********"
                name="password2"
                id="password2"
                value={password2} />
            <input type="button" value="Submit" onClick={submitForm} />
        </form>
    );
}

export default SignupForm;