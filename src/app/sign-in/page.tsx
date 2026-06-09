import { PageShell } from '@/components/PageShell';

export default function Page() {
  return (
    <PageShell title="Sign In">
      <div className="auth-page">
        <form className="register-form">
          <label>
            <span>Email</span>
            <input name="email" type="email" />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" />
          </label>
          <button className="auth-submit" type="submit">
            Sign in
          </button>
          <p className="auth-switch">
            Don't have an account?{' '}
            <a href="/registration-login">Create one here</a>
          </p>
        </form>
      </div>
    </PageShell>
  );
}
