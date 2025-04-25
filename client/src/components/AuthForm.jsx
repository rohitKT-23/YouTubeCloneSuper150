const AuthForm = ({ isLogin, onSubmit, values, setValues }) => {
    return (
      <form
        onSubmit={onSubmit}
        className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isLogin ? 'Login' : 'Register'}
        </h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            className="w-full border p-2 rounded"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    );
  };
  
  export default AuthForm;
  