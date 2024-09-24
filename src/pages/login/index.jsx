function Login () {
    return (
        <div>
            <h1>Login</h1>
            <label htmlFor="">E-email</label>
            <input type="text" name="email" id="email" placeholder="Email"/>
            <label htmlFor="">Password</label>
            <input type="password" name="password" id="password" />
            <button>Login</button>
        </div>
    )
}

export default Login