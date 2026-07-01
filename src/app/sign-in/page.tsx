import { PageShell } from '@/components/PageShell';
import Sminout from '@/components/sminout';

export default function Page() {
  return (
    <PageShell title="Sign In">
      <div className="auth-page">
        <p className="auth-subtitle">
          {' '}
          Sign in to access your account and quick shortcuts.
        </p>
        <form className="register-form">
          <label>
            <span>Email or Username</span>
            <input
              name="email"
              type="text"
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </label>
          <label className="auth-remember">
            <input type="checkbox" name="stay-logged-in" /> Stay logged in
          </label>
          <button className="auth-submit" type="submit">
            Sign in
          </button>
          <div className="auth-links">
            <a href="/forgot-password">Forgot password?</a>
          </div>
          <p className="auth-switch">
            Don't have an account?{' '}
            <a href="/registration-login">Create one here</a>
          </p>
        </form>
      </div>
    </PageShell>
  );
}
