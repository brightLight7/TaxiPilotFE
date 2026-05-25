import RegisterLogin from '../components/RegisterLogin';

export default function RegisterLoginPage() {
  return (
    <div className="page-content" style={{ background: '#f8f5f5', minHeight: '100vh', paddingTop: 'calc(var(--height-navbar) + 40px)' }}>
      <RegisterLogin />
    </div>
  );
}
