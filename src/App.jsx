import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import AccountSummary from './components/AccountSummary.jsx';
import PerformanceSummary from './components/PerformanceSummary.jsx';
import TradeForm from './components/TradeForm.jsx';
import TradeList from './components/TradeList.jsx';
import ForexChart from './components/ForexChart.jsx';
import { tradesApi } from './lib/api.js';
import './App.css';

function App() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [retry, setRetry] = useState(0);
  const [editingTrade, setEditingTrade] = useState(null);
  const [saving, setSaving] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const busy = loading || saving || activeId !== null;

  useEffect(() => {
    const controller = new AbortController();
    tradesApi.findAll(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setTrades(data);
      })
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [retry]);

  function muatUlang() {
    setLoading(true);
    setError('');
    setRetry((value) => value + 1);
  }

  async function simpanTrade(payload) {
    setSaving(true);
    setStatus('');
    try {
      const saved = editingTrade
        ? await tradesApi.update(editingTrade.id, payload)
        : await tradesApi.create(payload);
      setTrades((current) => (
        editingTrade
          ? current.map((trade) => trade.id === saved.id ? saved : trade)
          : [saved, ...current]
      ).sort((a, b) => b.tanggal.localeCompare(a.tanggal) || b.createdAt.localeCompare(a.createdAt)));
      setStatus(editingTrade ? 'Trade berhasil diubah.' : 'Trade berhasil ditambahkan.');
      setError('');
      setEditingTrade(null);
    } finally {
      setSaving(false);
    }
  }

  async function ubahTrade(id) {
    setActiveId(id);
    setError('');
    setStatus('');
    try {
      const trade = await tradesApi.findOne(id);
      setEditingTrade(trade);
      document.getElementById('tambah-trade')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    } finally {
      setActiveId(null);
    }
  }

  async function hapusTrade(id) {
    setActiveId(id);
    setError('');
    setStatus('');
    try {
      await tradesApi.remove(id);
      setTrades((current) => current.filter((trade) => trade.id !== id));
      if (editingTrade?.id === id) setEditingTrade(null);
      setStatus('Trade berhasil dihapus.');
    } catch (err) {
      setError(err.message);
    } finally {
      setActiveId(null);
    }
  }

  return (
    <>
      <Header />
      <main id="dashboard">
        <h2>Dashboard Trading</h2>
        <p>Selamat datang di PeTrade Journey.</p>
        <p className="storage-note">Jurnal tersimpan di database dan tetap tersedia setelah server dimulai ulang.</p>
        {loading && <p role="status">Memuat data trading...</p>}
        {error && (
          <div className="feedback feedback-error" role="alert">
            <p>{error}</p>
            <button type="button" onClick={muatUlang} disabled={busy}>Muat ulang data</button>
          </div>
        )}
        <div className="feedback-status" role="status" aria-live="polite">{status}</div>
        <AccountSummary trades={trades} />
        <PerformanceSummary trades={trades} />
        <TradeForm
          key={editingTrade?.id ?? 'new'}
          trade={editingTrade}
          onSimpanTrade={simpanTrade}
          onBatal={() => setEditingTrade(null)}
          disabled={busy}
          saving={saving}
        />
        <TradeList
          trades={trades}
          loading={loading}
          disabled={busy}
          activeId={activeId}
          onUbahTrade={ubahTrade}
          onHapusTrade={hapusTrade}
        />
        <ForexChart />
      </main>
    </>
  );
}

export default App;
