import { useState } from 'react';

const MENU_ITEMS = ['Booking', 'Drivers', 'Companies', 'Customers', 'Employees', 'Visitors'];

export default function AdminPage() {
  const [activeMenu, setActiveMenu] = useState('Booking');

  return (
    <div className="page-content" style={{ paddingTop: 'var(--height-navbar)' }}>
      <div className="admin-page-layout">
        {/* Sidebar */}
        <aside className="admin-sidebar">
          {MENU_ITEMS.map((item) => (
            <button
              key={item}
              className={activeMenu === item ? 'active' : ''}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </aside>

        {/* Content */}
        <main className="admin-content">
          <h2>{activeMenu}</h2>
          <p style={{ color: '#888' }}>
            {activeMenu} management panel — connect to backend API to display real data.
          </p>
        </main>
      </div>
    </div>
  );
}
