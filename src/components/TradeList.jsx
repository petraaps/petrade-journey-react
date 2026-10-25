
import TradeCard from './TradeCard.jsx';

function TradeList({ trades }) {
  return (
    <section className="trade-list-section" id="riwayat">
      <h2>Riwayat Trading</h2>

      {trades.length === 0 ? (
        <div className="empty-state">
          <p>Belum ada data Trade</p>
        </div>
      ) : (
        <div className="trade-table-wrapper">
          <table className="trade-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Pair</th>
                <th>Posisi</th>
                <th>Lot Size</th>
                <th>Hasil</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>

            <tbody>
              {trades.map((trade) => (
                <TradeCard
                  key={trade.id}
                  trade={trade}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TradeList;
