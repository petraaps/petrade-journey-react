
function PerformanceSummary({ trades }) {
  const totalTrade = trades.length;

  const totalWin = trades.filter(
    (trade) => trade.hasil === "Win"
  ).length;

  const totalLoss = trades.filter(
    (trade) => trade.hasil === "Loss"
  ).length;

  const winRate =
    totalTrade > 0
      ? (totalWin / totalTrade) * 100
      : 0;

  const totalProfitLoss = trades.reduce(
    (total, trade) => total + trade.profitLoss,
    0
  );

  return (
    <section className="performance-summary">
      <h2>Performa Trading</h2>

      <div className="performance-grid">
        <div className="performance-card">
          <h3>Total Trade</h3>
          <p>{totalTrade}</p>
        </div>

        <div className="performance-card">
          <h3>Total Win</h3>
          <p className="text-success">{totalWin}</p>
        </div>

        <div className="performance-card">
          <h3>Total Loss</h3>
          <p className="text-danger">{totalLoss}</p>
        </div>

        <div className="performance-card">
          <h3>Win Rate</h3>
          <p>{winRate.toFixed(1)}%</p>
        </div>

        <div className="performance-card">
          <h3>Total Profit/Loss</h3>
          <p className={
            totalProfitLoss >= 0
              ? "text-success"
              : "text-danger"
          }>
            ${totalProfitLoss.toFixed(2)}
          </p>
        </div>
      </div>
    </section>
  );
}

export default PerformanceSummary;
