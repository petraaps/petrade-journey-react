
function AccountSummary() {
  return (
    <section className="account-summary">
      <h2>Ringkasan Akun Trading</h2>

      <div className="account-grid">
        <div className="account-card">
          <h3>Nama Akun</h3>
          <p>The5ers Bootcamp</p>
        </div>

        <div className="account-card">
          <h3>Tipe Akun</h3>
          <p>Prop Firm</p>
        </div>

        <div className="account-card">
          <h3>Initial Balance</h3>
          <p>$5,000</p>
        </div>

        <div className="account-card">
          <h3>Current Equity</h3>
          <p>$5,200</p>
        </div>

        <div className="account-card">
          <h3>Maximum Loss</h3>
          <p>$250</p>
        </div>

        <div className="account-card">
          <h3>Target Profit</h3>
          <p>$300</p>
        </div>
      </div>
    </section>
  );
}

export default AccountSummary;
