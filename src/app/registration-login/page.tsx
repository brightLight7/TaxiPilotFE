import { PageShell } from '@/components/PageShell';

export default function Page() {
  return (
    <PageShell title="Create Account">
      <div className="auth-page">
        <form className="register-form">
          <label>
            <span>Full name</span>
            <input name="fullName" type="text" required />
          </label>
          <label>
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label>
            <span>Password</span>
            <input name="password" type="password" required />
          </label>
          <button className="auth-submit" type="submit">
            Sign up
          </button>
          <p className="auth-switch">
            Already have an account? <a href="/sign-in">Sign in here</a>
          </p>
        </form>
      </div>
    </PageShell>
  );
}
