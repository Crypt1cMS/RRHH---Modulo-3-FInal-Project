async function fetchAndDisplayEmployees() {
    try {
        const response = await axios.get('http://localhost:5000/employees');
        const employees = response.data;
        const tableBody = document.getElementById("employee-table-body");

        // Clear any existing rows
        tableBody.innerHTML = '';

        // Loop through employees and create a row for each
        employees.forEach(employee => {
            // Create a new row for each employee
            const row = document.createElement('tr');
            row.classList.add('hover:bg-gray-100', 'transition')

            // Create ID cell
            const idCell = document.createElement('td');
            idCell.textContent = employee.employee_id; // Correctly assign employee ID
            idCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2'); // Add styles to ID cell

            // Add cells for name, position, and salary
            const nameCell = document.createElement('td');
            nameCell.textContent = employee.full_name;
            nameCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const emailCell = document.createElement('td');
            emailCell.textContent = employee.email;
            emailCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const positionCell = document.createElement('td');
            positionCell.textContent = employee.role;
            positionCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const salaryCell = document.createElement('td');
            salaryCell.textContent = `$${employee.price_per_hour}`;
            salaryCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const statusCell = document.createElement('td');
            statusCell.textContent = `$${employee.status}`;
            statusCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            

            // Append cells to the row
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(emailCell)
            row.appendChild(positionCell);
            row.appendChild(salaryCell);
            row.appendChild(statusCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
    }
}

// Call the function to fetch and display employees on page load
window.onload = fetchAndDisplayEmployees;
