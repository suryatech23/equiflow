import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('DASHBOARD');
  
  // Core application state
  const [data, setData] = useState({
    netWorth: 24500,
    monthlyExpenses: [
      { category: 'Groceries', amount: 320, date: '2026-09-01' },
      { category: 'Rent & Utilities', amount: 950, date: '2026-09-02' },
      { category: 'Subscriptions', amount: 45, date: '2026-09-03' },
      { category: 'Dining Out', amount: 180, date: '2026-09-04' }
    ],
    splitGroups: [
      { groupName: 'Groceries Sharing', user: 'Roommate 1', amount: 30, type: 'owe' },
      { groupName: 'Shared Utility Bill', user: 'Roommate 1', amount: 100, type: 'owe' },
      { groupName: 'Internet Reimbursement', user: 'Roommate 1', amount: 50, type: 'owed' }
    ],
    accounts: [
      { name: 'Checking Account', bank: 'Chase', balance: 4250 },
      { name: 'High-Yield Savings', bank: 'Marcus', balance: 18500 },
      { name: 'Investment Portfolio', bank: 'Fidelity', balance: 1750 }
    ]
  });

  const [showModal, setShowModal] = useState(false);
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [txType, setTxType] = useState('expense'); 
  const [user, setUser] = useState('Roommate 1');

  // Handle transaction saving instantly
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!category || !amount) return;

    const numericAmount = Number(amount);
    let updatedData = { ...data };

    if (txType === 'expense') {
      updatedData.monthlyExpenses = [...updatedData.monthlyExpenses, { category, amount: numericAmount, date: new Date().toISOString().split('T')[0] }];
      updatedData.netWorth -= numericAmount;
    } else {
      updatedData.splitGroups = [...updatedData.splitGroups, { groupName: category, user: user || 'Peer', amount: numericAmount, type: txType }];
    }

    setData(updatedData);
    setShowModal(false);
    setCategory('');
    setAmount('');
  };

  // Dynamic liability calculations
  const totalOwe = data.splitGroups.filter(s => s.type === 'owe').reduce((acc, curr) => acc + curr.amount, 0);
  const totalOwed = data.splitGroups.filter(s => s.type === 'owed').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div style={{ backgroundColor: '#e2f0ef', minHeight: '100vh', padding: '30px', fontFamily: 'Inter, sans-serif', color: '#1e293b' }}>
      
      {/* Top Navbar with Working Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '15px 30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '25px' }}>
        <h2 style={{ margin: 0, color: '#0f766e', fontWeight: '850', letterSpacing: '0.5px' }}>EQUITY-FLOW</h2>
        <div style={{ display: 'flex', gap: '25px', fontWeight: '600', fontSize: '14px', color: '#475569' }}>
          {['DASHBOARD', 'ACCOUNTS', 'EXPENSES', 'PEER-LEDGER', 'REPORTS'].map((tab) => (
            <span 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{ color: activeTab === tab ? '#0f766e' : '#475569', cursor: 'pointer', borderBottom: activeTab === tab ? '2px solid #0f766e' : 'none', paddingBottom: '2px' }}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      {/* TAB 1: DASHBOARD */}
      {activeTab === 'DASHBOARD' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.2fr 1.5fr 1fr', gap: '20px' }}>
          
          {/* Personal Finance Overview */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '13px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>PERSONAL FINANCE OVERVIEW</h3>
            <div style={{ textAlign: 'center', margin: '20px 0' }}>
              <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '12px solid #0d9488', borderTopColor: '#ccfbf1', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px' }}>
                ${data.netWorth.toLocaleString()}
              </div>
              <p style={{ fontSize: '13px', color: '#64748b', marginTop: '12px' }}>Total Net Worth Allocation</p>
            </div>
          </div>

          {/* My Expenses Breakdown */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '13px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>MY EXPENSES (Current month)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '15px', maxHeight: '200px', overflowY: 'auto' }}>
              {data.monthlyExpenses.map((exp, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingBottom: '6px', borderBottom: '1px solid #f8fafc' }}>
                  <span style={{ color: '#475569', fontWeight: '500' }}>{exp.category}</span>
                  <span style={{ fontWeight: '700', color: '#0f766e' }}>${exp.amount}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Peer & Group Ledger */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '13px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>PEER EXPENSE LEDGER</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px', maxHeight: '200px', overflowY: 'auto' }}>
              {data.splitGroups.map((split, idx) => (
                <div key={idx} style={{ background: '#f8fafc', padding: '10px 14px', borderRadius: '8px', borderLeft: `4px solid ${split.type === 'owe' ? '#e11d48' : '#10b981'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700' }}>
                    <span>{split.groupName}</span>
                    <span style={{ color: split.type === 'owe' ? '#e11d48' : '#10b981' }}>${split.amount}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                    {split.type === 'owe' ? `You owe ${split.user}` : `${split.user} owes you`}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Remaining Liabilities & Action */}
          <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '13px', color: '#334155', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>REMAINING</h3>
              <div style={{ marginTop: '15px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Money I Owe</p>
                <h2 style={{ color: '#e11d48', margin: '4px 0 15px 0' }}>${totalOwe}</h2>
                <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>Money Owed to Me</p>
                <h2 style={{ color: '#10b981', margin: '4px 0 0 0' }}>${totalOwed}</h2>
              </div>
            </div>
            <button 
              onClick={() => setShowModal(true)}
              style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              + Add Transaction
            </button>
          </div>

        </div>
      )}

      {/* TAB 2: ACCOUNTS */}
      {activeTab === 'ACCOUNTS' && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#0f766e', marginTop: 0 }}>Connected Financial Accounts</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Manage and monitor your primary bank accounts, credit cards, and investment portfolios.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
            {data.accounts.map((acc, i) => (
              <div key={i} style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#334155' }}>{acc.name}</h4>
                <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#64748b' }}>Institution: {acc.bank}</p>
                <h3 style={{ margin: 0, color: '#0f766e' }}>${acc.balance.toLocaleString()}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: EXPENSES */}
      {activeTab === 'EXPENSES' && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#0f766e', marginTop: 0 }}>All Recorded Expenses</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Review your full ledger of categorized monthly expenses.</p>
          <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '13px' }}>
                <th style={{ padding: '10px' }}>Category</th>
                <th style={{ padding: '10px' }}>Date</th>
                <th style={{ padding: '10px' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data.monthlyExpenses.map((exp, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '13px' }}>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#334155' }}>{exp.category}</td>
                  <td style={{ padding: '12px', color: '#64748b' }}>{exp.date || '2026-09-05'}</td>
                  <td style={{ padding: '12px', fontWeight: '700', color: '#0f766e' }}>${exp.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: PEER-LEDGER */}
      {activeTab === 'PEER-LEDGER' && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#0f766e', marginTop: 0 }}>Peer Expense & Settlement Ledger</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Track amounts you owe to peers and amounts pending to be collected.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
            {data.splitGroups.map((split, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '15px 20px', borderRadius: '8px', borderLeft: `5px solid ${split.type === 'owe' ? '#e11d48' : '#10b981'}` }}>
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#334155' }}>{split.groupName}</h4>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>{split.type === 'owe' ? `Liability to ${split.user}` : `Receivable from ${split.user}`}</span>
                </div>
                <h3 style={{ margin: 0, color: split.type === 'owe' ? '#e11d48' : '#10b981' }}>${split.amount}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: REPORTS */}
      {activeTab === 'REPORTS' && (
        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#0f766e', marginTop: 0 }}>Financial Analytics & Reports</h2>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Summary analytics of your monthly spending habits and net worth trajectory.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#334155', marginTop: 0 }}>Total Monthly Outflow</h4>
              <h2 style={{ color: '#0f766e' }}>${data.monthlyExpenses.reduce((a, b) => a + b.amount, 0)}</h2>
            </div>
            <div style={{ background: '#f8fafc', padding: '20px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <h4 style={{ color: '#334155', marginTop: 0 }}>Net Outstanding Balance</h4>
              <h2 style={{ color: totalOwed - totalOwe >= 0 ? '#10b981' : '#e11d48' }}>${totalOwed - totalOwe}</h2>
            </div>
          </div>
        </div>
      )}

      {/* Functional Modal for Adding Transactions */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', padding: '25px', borderRadius: '12px', width: '360px', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#0f766e' }}>Record New Transaction</h3>
            <form onSubmit={handleAddTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '600' }}>Category / Description</label>
              <input 
                type="text" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
                placeholder="e.g., Netflix, Uber, Groceries"
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />

              <label style={{ fontSize: '12px', fontWeight: '600' }}>Amount ($)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required 
                placeholder="75"
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              />

              <label style={{ fontSize: '12px', fontWeight: '600' }}>Transaction Type</label>
              <select 
                value={txType} 
                onChange={(e) => setTxType(e.target.value)}
                style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
              >
                <option value="expense">Personal Monthly Expense</option>
                <option value="owe">Peer Expense (You Owe)</option>
                <option value="owed">Peer Expense (Owed to You)</option>
              </select>

              {txType !== 'expense' && (
                <>
                  <label style={{ fontSize: '12px', fontWeight: '600' }}>Peer / Roommate Name</label>
                  <input 
                    type="text" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                    placeholder="e.g., Roommate 2"
                    style={{ padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                  />
                </>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ background: '#cbd5e1', border: 'none', padding: '9px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Cancel</button>
                <button type="submit" style={{ background: '#0f766e', color: '#fff', border: 'none', padding: '9px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>Save Transaction</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}