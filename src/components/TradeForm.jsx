
import { useState } from 'react';

function TradeForm({ onTambahTrade }) {
  const [form, setForm] = useState({
    tanggal: '',
    pair: '',
    posisi: 'Buy',
    lotSize: '',
    hasil: 'Win',
    profitLoss: ''
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const tradeBaru = {
      ...form,
      id: crypto.randomUUID(),
      pair: form.pair.trim().toUpperCase(),
      lotSize: Number(form.lotSize),
      profitLoss: Number(form.profitLoss)
    };

    onTambahTrade(tradeBaru);

    setForm({
      tanggal: '',
      pair: '',
      posisi: 'Buy',
      lotSize: '',
      hasil: 'Win',
      profitLoss: ''
    });
  }

  return (
    <section className="trade-form-section" id="tambah-trade">
      <h2>Tambah Trade Baru</h2>

      <form className="trade-form" onSubmit={handleSubmit}>
        <label>
          Tanggal Trading
          <input
            type="date"
            name="tanggal"
            value={form.tanggal}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Pair Trading
          <input
            type="text"
            name="pair"
            placeholder="Contoh: XAUUSD"
            value={form.pair}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Posisi
          <select
            name="posisi"
            value={form.posisi}
            onChange={handleChange}
          >
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </label>

        <label>
          Lot Size
          <input
            type="number"
            name="lotSize"
            step="0.01"
            min="0.01"
            value={form.lotSize}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Hasil Trade
          <select
            name="hasil"
            value={form.hasil}
            onChange={handleChange}
          >
            <option value="Win">Win</option>
            <option value="Loss">Loss</option>
            <option value="Break Even">Break Even</option>
          </select>
        </label>

        <label>
          Profit / Loss ($)
          <input
            type="number"
            name="profitLoss"
            step="0.01"
            placeholder="Contoh: 150 atau -50"
            value={form.profitLoss}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="btn-tambah">
          + Tambah Trade
        </button>
      </form>
    </section>
  );
}

export default TradeForm;
