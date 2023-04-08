const login = async (username, password) => {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
  const handleLogin = () => {
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    login(username, password);
  };
  
  document.querySelector('#login-form').addEventListener('submit', (event) => {
    event.preventDefault();
    handleLogin();
  });
  