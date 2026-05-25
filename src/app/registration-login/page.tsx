import { PageShell } from '@/components/PageShell';

export default function Page() {
  return (
    <PageShell title="Create Account">
      <form className="register-form">
        <label><span>Full name</span><input name="fullName" /></label>
        <label><span>Email</span><input name="email" type="email" /></label>
        <label><span>Password</span><input name="password" type="password" /></label>
        <button className="sm-btn sm-btn-primary" type="submit">Sign up</button>
      </form>
    </PageShell>
  );
}
