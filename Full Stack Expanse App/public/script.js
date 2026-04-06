const API = 'http://localhost:3000/expenses';
let editingId = null;

async function fetchExpenses() {
    try {
        const response = await fetch(API);
        const json = await response.json();

        const list = document.getElementById('expense-list');
        const totalEl = document.getElementById('total');
        list.innerHTML = '';

        if (!json.data || json.data.length === 0) {
            list.innerHTML = '<div class="empty-state">// no expenses yet</div>';
            totalEl.textContent = 'Total: ₹0';
            return;
        }

        let total = 0;
        json.data.forEach(expense => {
            total += expense.amount;
            const date = new Date(expense.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
            const item = document.createElement('div');
            item.className = 'expense-item';
            item.innerHTML = `
                <div class="expense-left">
                    <span class="expense-title-text">${expense.title}</span>
                    <div class="expense-meta">
                        <span class="expense-category">${expense.category}</span>
                        <span class="expense-date">${date}</span>
                    </div>
                </div>
                <div class="expense-right">
                    <span class="expense-amount">₹${expense.amount}</span>
                    <div class="btn-actions">
                        <button class="btn-edit" onclick="openEdit(${expense.id}, '${expense.title}', ${expense.amount}, '${expense.category}', '${expense.date.split('T')[0]}')">EDIT</button>
                        <button class="btn-delete" onclick="deleteExpense(${expense.id})">DEL</button>
                    </div>
                </div>
            `;
            list.appendChild(item);
        });

        totalEl.textContent = `Total: ₹${total.toLocaleString('en-IN')}`;
    } catch (err) {
        console.log('fetch error', err);
    }
}

async function deleteExpense(id) {
    await fetch(`${API}/${id}`, { method: 'DELETE' });
    fetchExpenses();
}

function openEdit(id, title, amount, category, date) {
    editingId = id;
    document.getElementById('edit-title').value = title;
    document.getElementById('edit-amount').value = amount;
    document.getElementById('edit-category').value = category;
    document.getElementById('edit-date').value = date;
    document.getElementById('edit-modal').classList.add('active');
}

document.getElementById('cancel-edit').addEventListener('click', () => {
    document.getElementById('edit-modal').classList.remove('active');
    editingId = null;
});

document.getElementById('save-edit').addEventListener('click', async () => {
    const title = document.getElementById('edit-title').value;
    const amount = document.getElementById('edit-amount').value;
    const category = document.getElementById('edit-category').value;
    const date = document.getElementById('edit-date').value;

    await fetch(`${API}/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount, category, date })
    });

    document.getElementById('edit-modal').classList.remove('active');
    editingId = null;
    fetchExpenses();
});

document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const amount = document.getElementById('amount').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, amount, category, date })
    });

    e.target.reset();
    fetchExpenses();
});

fetchExpenses();