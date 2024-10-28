document.addEventListener("DOMContentLoaded", () => {
    const username = localStorage.getItem("username");
    const greetingElement = document.getElementById('greting');

    if (username && greetingElement) {
        greetingElement.textContent = `Hello, ${username}!`
    } else {
        alert('You need to log in first to access employee data.')
        return window.location.href = '../pages/login.html'
    }

    function displayClock() {
        const timeElement = document.getElementById('time')
        const now = new Date();
    
        const hours = String(now.getHours()).padStart(2, 0)
        const minutes = String(now.getMinutes()).padStart(2, 0)
    
        timeElement.textContent = `${hours}:${minutes}`
    
        setInterval(displayClock, 60000)
    }
    
    displayClock()

})

