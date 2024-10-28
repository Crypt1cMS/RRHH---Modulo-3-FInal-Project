async function fetchAndDisplayEmployees(roleId) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to log in first to access employee data.');
            return window.location.href = '../pages/login.html';
        }

        const url = roleId ? `http://localhost:5000/roles/${roleId}` : 'http://localhost:5000/roles';

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(url, config);
        const roles = response.data;
        const tableBody = document.getElementById("employee-table-body");

        tableBody.innerHTML = '';

        const rolesArray = Array.isArray(roles) ? roles : [roles];

        rolesArray.forEach(role => {
            const row = document.createElement('tr');
            row.classList.add('cursor-pointer', 'hover:bg-gray-100', 'transition');

            const idCell = document.createElement('td');
            const formattedId = `R-${String(role.role_id).padStart(3, '0')}`;
            idCell.textContent = formattedId
            idCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const positionCell = document.createElement('td');
            positionCell.textContent = role.role;
            positionCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const statusCell = document.createElement('td');
            statusCell.textContent = role.is_active ? 'Active' : 'Inactive';
            statusCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            // Celda para el botón de eliminación
            const deleteBtnCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
            deleteButton.onclick = async () => {
                // Aquí puedes manejar la eliminación del empleado
                if (confirm(`Are you sure you want to delete employee ${formattedId}?`)) {
                    try {
                        const deleteUrl = `http://localhost:5000/roles/${role.role_id}`;
                        await axios.delete(deleteUrl, config);
                        alert('Employee deleted successfully!');
                        fetchAndDisplayEmployees();
                    } catch (error) {
                        console.error('Error deleting employee:', error);
                        alert('Failed to delete employee.');
                    }
                }
            };
            deleteBtnCell.appendChild(deleteButton);
            deleteBtnCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            row.appendChild(idCell);
            row.appendChild(positionCell);
            row.appendChild(statusCell);
            row.appendChild(deleteBtnCell);

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching employees:", error);
        alert('Failed to fetch employees. Please check your token or employee does not exist.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const searchButton = document.getElementById('search-id');
    const clearButton = document.getElementById('clear-id');
    const idInput = document.getElementById('id-input');

    searchButton.addEventListener('click', () => {
        const roleId = parseInt(idInput.value);
   
        if (roleId) {
            fetchAndDisplayEmployees(roleId);
        } else {
            alert('Please enter an ID to search.');
        }
    });

    clearButton.addEventListener('click', () => {
        idInput.value = '';
        fetchAndDisplayEmployees();
    });

    fetchAndDisplayEmployees();
});