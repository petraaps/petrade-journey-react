
import { useState } from 'react';
import Header from './components/Header.jsx';
import AccountSummary from './components/AccountSummary.jsx';
import PerformanceSummary from './components/PerformanceSummary.jsx';
import './App.css';
import TradeForm from './components/TradeForm.jsx';
import TradeList from './components/TradeList.jsx';

function App() {
  const [trades, setTrades] = useState([
    {
      id: 1,
      tanggal: '2026-10-20',
      pair: 'XAUUSD',
      posisi: 'Buy',
      lotSize: 0.1,
      hasil: 'Win',
      profitLoss: 150
    },
    {
      id: 2,
      tanggal: '2026-10-21',
      pair: 'EURUSD',
      posisi: 'Sell',
      lotSize: 0.2,
      hasil: 'Loss',
      profitLoss: -50
    }
  ]);

  function tambahTrade(tradeBaru) {
  setTrades((dataSebelumnya) => [
    ...dataSebelumnya,
    tradeBaru
  ]);
}

  return (
    <>
      <Header />

      <main id="dashboard">
        <h2>Dashboard Trading</h2>
        <p>Selamat datang di PeTrade Journey.</p>

        <AccountSummary />

        <PerformanceSummary trades={trades} />
        <TradeForm onTambahTrade={tambahTrade} />
        <TradeList trades={trades} />
      </main>
    </>
  );
}

export default App;
