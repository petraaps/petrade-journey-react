
function TradeCard({ trade }) {
  return (
    <tr>
      <td>{trade.tanggal}</td>
      <td>{trade.pair}</td>
      <td>{trade.posisi}</td>
      <td>{trade.lotSize}</td>

      <td>
        <span
          className={
            trade.hasil === 'Win'
              ? 'status-win'
              : trade.hasil === 'Loss'
                ? 'status-loss'
                : 'status-neutral'
          }
        >
          {trade.hasil}
        </span>
      </td>

      <td
        className={
          trade.profitLoss >= 0
            ? 'text-success'
            : 'text-danger'
        }
      >
        ${trade.profitLoss.toFixed(2)}
      </td>
    </tr>
  );
}

export default TradeCard;
