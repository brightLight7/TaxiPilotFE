export default function AdminDashboard() {
  const bookings = { new: 5, ongoing: 12, completed: 120, cancelled: 3 };
  const drivers  = { online: 15, offline: 8, pending: 2 };
  const customers = { total: 500, newSignups: 10, active: 300 };
  const payments  = { todayEarnings: 3200, pendingPayments: 4, refunds: 2 };

  return (
    <div className="page-content">
      <div className="admin-container">
        <h1 style={{ fontSize: '1.8rem', marginBottom: 8 }}>Admin Dashboard</h1>

        <h3 style={{ fontSize: '1.1rem', color: '#666', marginBottom: 16 }}>Bookings Overview</h3>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>New</h3>
            <p>{bookings.new}</p>
          </div>
          <div className="dashboard-card">
            <h3>Ongoing</h3>
            <p>{bookings.ongoing}</p>
          </div>
          <div className="dashboard-card">
            <h3>Completed</h3>
            <p>{bookings.completed}</p>
          </div>
          <div className="dashboard-card">
            <h3>Cancelled</h3>
            <p>{bookings.cancelled}</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#666', marginTop: 32, marginBottom: 16 }}>Drivers</h3>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Online</h3>
            <p>{drivers.online}</p>
          </div>
          <div className="dashboard-card">
            <h3>Offline</h3>
            <p>{drivers.offline}</p>
          </div>
          <div className="dashboard-card">
            <h3>Pending</h3>
            <p>{drivers.pending}</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#666', marginTop: 32, marginBottom: 16 }}>Customers</h3>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Total</h3>
            <p>{customers.total}</p>
          </div>
          <div className="dashboard-card">
            <h3>New Sign-ups</h3>
            <p>{customers.newSignups}</p>
          </div>
          <div className="dashboard-card">
            <h3>Active</h3>
            <p>{customers.active}</p>
          </div>
        </div>

        <h3 style={{ fontSize: '1.1rem', color: '#666', marginTop: 32, marginBottom: 16 }}>Payments</h3>
        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>Today's Earnings</h3>
            <p>£{payments.todayEarnings.toLocaleString()}</p>
          </div>
          <div className="dashboard-card">
            <h3>Pending Payments</h3>
            <p>{payments.pendingPayments}</p>
          </div>
          <div className="dashboard-card">
            <h3>Refunds</h3>
            <p>{payments.refunds}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
