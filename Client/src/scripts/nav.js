document.addEventListener('DOMContentLoaded', () => {

    const home = document.getElementById('home-nav');

    if (home) {
        home.addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.href = "../pages/home.html";
        })
    } else {
        console.log('Element not found');
    }

    const employees = document.getElementById('employees-nav');

    if (employees) {
        employees.addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.href = "../pages/employees.html";
        })
    } else {
        console.log('Element not found');
    }

    const roles = document.getElementById('roles-nav');

    if (roles) {
        roles.addEventListener('click', async (event) => {
            event.preventDefault();
            window.location.href = "../pages/roles.html";
        })
    } else {
        console.log('Element not found');
    }

    const signOut = document.getElementById('signOut');

    if (signOut) {
        signOut.addEventListener('click', async (event) => {
            event.preventDefault();
            localStorage.clear();
            window.location.href = "../pages/login.html";
        });
    } else {
        console.log('Element not found');
    }
});