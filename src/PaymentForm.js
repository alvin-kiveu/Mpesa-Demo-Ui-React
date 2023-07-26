import React, { useState } from 'react';

const PaymentForm = () => {
  const [phone, setPhone] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/stkpush", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: phone, accountNumber: accountNumber, amount: amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMessage('Payment successful!');
      })
      .catch((error) => {
        console.error(error);
        setMessage('Payment failed!');
      });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h1>Mpesa Payment Form</h1>
      {message && <p style={{ color: message.includes('failed') ? 'red' : 'green' }}>{message}</p>}
      <div style={styles.formGroup}>
        <label htmlFor="phone" style={styles.label}>Phone Number</label>
        <input
          type="number"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="accountNumber" style={styles.label}>Account Number</label>
        <input
          type="text"
          id="accountNumber"
          value={accountNumber}
          onChange={handleAccountNumberChange}
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label htmlFor="amount" style={styles.label}>Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={handleAmountChange}
          style={styles.input}
          required
        />
      </div>
      <button type="submit" style={styles.button}>Pay Now</button>


    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added box shadow
  },
  formGroup: {
    marginBottom: '1rem',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    width: '100%',
  },
  button: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '1rem',
  },
};

export default PaymentForm;
