async function fetchAndDisplayEmployees(employeeId) {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            alert('You need to log in first to access employee data.');
            return window.location.href = '../pages/login.html';
        }

        const url = employeeId ? `http://localhost:5000/employees/${employeeId}` : 'http://localhost:5000/employees';

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        const response = await axios.get(url, config);
        const employees = response.data;
        const tableBody = document.getElementById("employee-table-body");

        tableBody.innerHTML = '';

        const employeeArray = Array.isArray(employees) ? employees : [employees];

        employeeArray.forEach(employee => {
            const row = document.createElement('tr');
            row.classList.add('cursor-pointer', 'hover:bg-gray-100', 'transition');

            const idCell = document.createElement('td');
            const formattedId = `E-${String(employee.employee_id).padStart(3, '0')}`;
            idCell.textContent = formattedId
            idCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const nameCell = document.createElement('td');
            nameCell.textContent = employee.full_name;
            nameCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const cedulaCell = document.createElement('td');
            cedulaCell.textContent = employee.cedula;
            cedulaCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const positionCell = document.createElement('td');
            positionCell.textContent = employee.role;
            positionCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const statusCell = document.createElement('td');
            statusCell.textContent = employee.is_active ? 'Active' : 'Inactive';
            statusCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            const editBtnCell = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('bg-blue-600', 'text-white', 'py-1', 'px-3', 'rounded');
            editBtn.onclick = () => openEditModal(employee); // Call openEditModal with employee data
            editBtnCell.appendChild(editBtn);
            editBtnCell.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');

            // Celda para el botón de eliminación
            const deleteBtnCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('bg-red-500', 'text-white', 'px-2', 'py-1', 'rounded');
            deleteButton.onclick = async () => {
                // Aquí puedes manejar la eliminación del empleado
                if (confirm(`Are you sure you want to delete employee ${employee.employee_id}?`)) {
                    try {
                        const deleteUrl = `http://localhost:5000/employees/${employee.employee_id}`;
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
            row.appendChild(nameCell);
            row.appendChild(cedulaCell);
            row.appendChild(positionCell);
            row.appendChild(statusCell);
            row.appendChild(editBtnCell);
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
        const employeeId = parseInt(idInput.value);
   
        if (employeeId) {
            fetchAndDisplayEmployees(employeeId);
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

document.addEventListener("DOMContentLoaded", () => {
    const createUserButton = document.getElementById('create-user');
    const userModal = document.getElementById('create-userModal');
    const cancelButton = document.getElementById('create-cancelBtn');
    const userForm = document.getElementById('create-user-form');

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first to create a user.');
            window.location.href = '../pages/login.html';
            return false;
        }
        return true;
    };

    if (createUserButton && userModal && cancelButton && userForm) {
        createUserButton.addEventListener('click', function() {
            if (checkToken()) {
                userModal.classList.remove('hidden');
            }
        });
        
        cancelButton.addEventListener('click', function() {
            userModal.classList.add('hidden');
            userForm.reset();
        });

        userForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            if (this.checkValidity() && checkToken()) {
                const userNameInput = document.getElementById('create-userNameInput');
                const fullNameInput = document.getElementById('create-fullNameInput');
                const roleIdInput = document.getElementById('create-roleIdInput');
                const cedulaInput = document.getElementById('create-cedula');
                const passwordInput = document.getElementById('create-passwordInput');

                if (userNameInput && fullNameInput && roleIdInput && cedulaInput && passwordInput) {
                    const formData = {
                        user_name: userNameInput.value,
                        full_name: fullNameInput.value,
                        role_id: roleIdInput.value,
                        cedula: cedulaInput.value,
                        password: passwordInput.value
                    };

                    try {
                        const response = await axios.post('http://localhost:5000/employees', formData);
                        userModal.classList.add('hidden');
                        userForm.reset();
                        fetchAndDisplayEmployees();
                    } catch (error) {
                        console.error("Error creating user:", error.response ? error.response.data : error.message);
                    }
                } else {
                    console.error("One or more form inputs were not found.");
                }
            } else {
                this.reportValidity(); 
            }
        });
    } else {
        console.error("One or more main elements were not found.");
    }

    cancelButton.addEventListener('click', function() {
        userForm.reset();
        userModal.classList.add('hidden');
    });
});

function openEditModal(employee) {
    const token = localStorage.getItem('token');

    if (!token) {
        alert('You need to log in first to edit employee data.');
        return window.location.href = '../pages/login.html';
    }

    document.getElementById('edit-fullNameInput').value = employee.full_name;
    document.getElementById('edit-cedula').value = employee.cedula;
    document.getElementById('edit-roleIdInput').value = employee.role_id; // Ensure this matches your backend
    document.getElementById('edit-userModal').classList.remove('hidden');

    // Handle form submission for updates
    document.getElementById('edit-user-form').onsubmit = async function (event) {
        event.preventDefault();


        // Verify the token again before sending the update
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You need to log in first to edit employee data.');
            return window.location.href = '../pages/login.html'; // Redirect the user to the login page
        }

        const formData = {
            full_name: document.getElementById('edit-fullNameInput').value,
            cedula: document.getElementById('edit-cedula').value,
            role_id: document.getElementById('edit-roleIdInput').value,
            employee_id: employee.employee_id // Send the employee ID for the update
        };

        try {
            const response = await axios.put(`http://localhost:5000/employees/${employee.employee_id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}` // Add the token to the header
                }

                
            });

            console.log("User updated:", response.data);

            // Close the modal and reset the form
            document.getElementById('edit-userModal').classList.add('hidden'); // Close the modal
            document.getElementById('edit-user-form').reset(); // Reset the form
            fetchAndDisplayEmployees(); // Refresh the employee table
        } catch (error) {
            console.error("Error updating user:", error.response ? error.response.data : error.message);
        }
    };

    // Cancel button functionality
    document.getElementById('edit-cancelBtn').onclick = function() {
        document.getElementById('edit-userModal').classList.add('hidden'); // Close the modal
        document.getElementById('edit-user-form').reset(); // Reset the form
    };
}
