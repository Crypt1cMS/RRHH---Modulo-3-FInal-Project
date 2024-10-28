
const username = document.getElementById('user_name');
const password = document.getElementById('password');
const loginForm = document.getElementById('login');
const errorMessage = document.getElementById('error-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
        username: username.value,
        password: password.value
    }

    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    axios.post('http://localhost:5000/auth/login', {
        user_name: data.username,
        password: data.password
    })
        
        .then((loginResponse) => {
            console.log('Login Successful:', loginResponse.data.token);

            localStorage.setItem("token", `${loginResponse.data.token}`);
            localStorage.setItem("username", data.username);
            window.location.href = "../pages/home.html"
        }) 
        
        .catch((error) => {
            if (error.response) {
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Login failed. Please try again.';
            } else {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'An unexpected error occurred. Please try again.';
            }
        });
});

