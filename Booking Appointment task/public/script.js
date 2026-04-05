async function fetchUsers() {
    const response = await fetch('http://localhost:3000/users');
    const data = await response.json();

    const userList = document.getElementById('user-list');
    userList.innerHTML = '';

    data.ress.forEach(user => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${user.name} - ${user.email}
            <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            <button class="edit-btn">Edit</button>
        `;
        userList.appendChild(li);
    });
}

async function deleteUser(id) {
    await fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE'
    });
    fetchUsers();
}

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;

    await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phoneNumber, email })
    });

    fetchUsers();
});

fetchUsers();