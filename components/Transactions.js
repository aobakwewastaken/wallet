import { useEffect, useState } from "react"

import { data } from "../utils/data"

export const Transactions = () => {

  const [transactions, setTransactions] = useState([])
  const [deposit, setDeposit] = useState(0)

  const tableRows = transactions.map((info) => (
    <tr>
      <td>{info.postingDate.slice(0, 10)}</td>
      <td>{info.description}</td>
      <td>{info.type}</td>
      <td>{info.amount}</td>
      <td>{info.runningBalance}</td>
    </tr>
  ))

  const addRows = (data) => {
    const totalTransactions = transactions.length;
    data.id = totalTransactions + 1;
    const updatedTransactions = [... transactions];
    updatedTransactions.push(data);
    setTransactions(updatedTransactions);
  };

  const changeDeposit = (event) => {
    setDeposit(event.target.value);
  };

  const transferValue = (event) => {
    event.preventDefault();
    const val = {
      type: 'CREDIT',
      postingDate: new Date().toISOString(),
      amount: deposit,
      description: 'Deposit'
    };
    addRows(val)
  };

  useEffect(() => {
    setTransactions(data[0].transactions)
  }, [])
  console.log(transactions)
  return(
    <div>
      <label>Deposit:</label>
      <input type="number" value={deposit} onChange={changeDeposit} />
      <button onClick={transferValue}> Click Me</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </div>
  )
}