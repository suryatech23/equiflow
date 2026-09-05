const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/equiflow'
});

let financeData = {
    netWorth: 24500,
    monthlyExpenses: [
        { category: 'Groceries', amount: 320 },
        { category: 'Rent & Utilities', amount: 950 },
        { category: 'Subscriptions', amount: 45 },
        { category: 'Dining Out', amount: 180 }
    ],
    splitGroups: [
        { groupName: 'Groceries Sharing', user: 'Roommate 1', amount: 30, type: 'owe' },
        { category: 'Shared Utility Bill', user: 'Roommate 1', amount: 100, type: 'owe' },
        { category: 'Internet Reimbursement', user: 'Roommate 1', amount: 50, type: 'owed' }
    ]
};

app.get('/api/finance-data', (req, res) => {
    res.json(financeData);
});

app.post('/api/transactions', (req, res) => {
    const { category, amount, type, user } = req.body;
    const numericAmount = Number(amount);

    if (type === 'expense') {
        financeData.monthlyExpenses.push({ category, amount: numericAmount });
        financeData.netWorth -= numericAmount;
    } else if (type === 'owe' || type === 'owed') {
        financeData.splitGroups.push({ groupName: category, user: user || 'Peer / Roommate', amount: numericAmount, type });
    }

    res.json({ success: true, data: financeData });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`EquiFlow server running on port ${PORT}`));