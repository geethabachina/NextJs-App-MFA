import React, { useState } from 'react';
import { useRouter } from 'next/router';

const menuItems = [
  'Showcase',
  'Docs',
  'Blog',
  'Analytics',
  'Commerce',
  'Templates',
  'Enterprise',
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Navbar */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.5rem 1rem',
          borderBottom: '1px solid #eee',
          background: '#fff',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Hamburger for mobile */}
        <button
          onClick={() => setOpen(true)}
          style={{
            background: 'none',
            border: 'none',
            fontSize: 24,
            marginRight: 16,
            display: 'inline-block',
            cursor: 'pointer',
            // Hide on desktop
            visibility: 'visible',
            width: 32,
            height: 32,
          }}
          className="navbar-hamburger"
          aria-label="Open menu"
        >
          ☰
        </button>
        {/* Title */}
        <span style={{ fontWeight: 700, fontSize: 18, color: '#0070f3', marginRight: 24 }}>
          AEON
        </span>
        {/* Menu items (desktop only) */}
        <div className="navbar-menu" style={{ display: 'flex', flex: 1 }}>
          {menuItems.map(item => (
            <span
              key={item}
              style={{
                marginRight: 20,
                color: '#555',
                fontSize: 15,
                cursor: 'pointer',
                display: 'none', // Hide on mobile, show on desktop via CSS
              }}
              className="navbar-menu-item"
            >
              {item}
            </span>
          ))}
        </div>
        {/* Search input (desktop only) */}
        <input
          type="text"
          placeholder="Search documentation..."
          style={{
            padding: '0.3rem 0.7rem',
            borderRadius: 4,
            border: '1px solid #eee',
            marginRight: 12,
            fontSize: 14,
            display: 'none', // Hide on mobile, show on desktop via CSS
          }}
          className="navbar-search"
        />
        {/* Login button (desktop only) */}
        <button
          onClick={() => router.push('/login')}
          style={{
            background: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
            padding: '0.4rem 1rem',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            display: 'none', // Hide on mobile, show on desktop via CSS
          }}
          className="navbar-login"
        >
          Login
        </button>
      </nav>

      {/* Mobile sidebar */}
      {open && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 260,
            height: '100%',
            background: '#fff',
            boxShadow: '2px 0 8px #0002',
            zIndex: 100,
            padding: '1rem 0.5rem',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <span style={{ color: '#0070f3', fontWeight: 700, fontSize: 18, flex: 1 }}>AEON</span>
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: 24,
                cursor: 'pointer',
              }}
              aria-label="Close menu"
            >
              ✖️
            </button>
          </div>
          <input
            type="text"
            placeholder="Search documentation..."
            style={{
              padding: '0.3rem 0.7rem',
              borderRadius: 4,
              border: '1px solid #eee',
              marginBottom: 16,
              fontSize: 14,
              width: '90%',
              alignSelf: 'center',
            }}
          />
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
            {menuItems.map(item => (
              <li
                key={item}
                style={{
                  padding: '0.7rem 1rem',
                  color: '#333',
                  borderBottom: '1px solid #f5f5f5',
                  fontSize: 16,
                  cursor: 'pointer',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setOpen(false);
              router.push('/login');
            }}
            style={{
              background: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '0.6rem 1rem',
              fontWeight: 600,
              fontSize: 16,
              margin: '1rem auto 0 auto',
              width: '90%',
              cursor: 'pointer',
            }}
          >
            Login
          </button>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#0003',
            zIndex: 99,
          }}
        />
      )}

      {/* Responsive CSS */}
      <style jsx global>{`
        @media (min-width: 700px) {
          .navbar-hamburger {
            display: none !important;
          }
          .navbar-menu-item,
          .navbar-search,
          .navbar-login {
            display: inline-block !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;