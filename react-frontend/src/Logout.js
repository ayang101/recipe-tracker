const Logout = () => {
    {localStorage.setItem("isValid", false)}
    {localStorage.clear()}
    return <h1>Logged Out</h1>;
};
  
export default Logout;