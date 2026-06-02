import { useState, useEffect } from 'react';
import Toast from './Toast';
import {
  fetchUserByEmail,
  insertUser,
  sendVerificationEmail,
} from '../services/api';
import {
  initializeSignalR,
  onSignalREvent,
  offSignalREvent,
  stopSignalR,
} from '../services/signalr';
import { useAppStore } from '../store/appStore';

export default function RegisterLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    emailHash: '',
    phoneNumber: '',
    passwordHash: '',
    confirmPassword: '',
    notRobot: false,
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailSentMsg, setEmailSentMsg] = useState('All fields are mandatory.');
  const [emailVerifiedOk, setEmailVerifiedOk] = useState(false);

  const setLogin = useAppStore((s) => s.setLogin);
  const setSettingsObj = useAppStore((s) => s.setSettingsObj);

  useEffect(() => {
    initializeSignalR();

    const handler = () => {
      setEmailSentMsg('Thank you! Your email has been successfully verified. Login to your account.');
      setEmailVerifiedOk(true);
      setTimeout(() => setIsLogin(true), 3000);
    };

    onSignalREvent('ReceiveAlert', handler);
    return () => {
      offSignalREvent('ReceiveAlert', handler);
      stopSignalR();
    };
  }, []);

  function blur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function updateForm(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  const errors = {
    emailRequired: touched.emailHash && !form.emailHash,
    emailInvalid: touched.emailHash && form.emailHash && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailHash),
    passwordShort: touched.passwordHash && form.passwordHash.length > 0 && form.passwordHash.length < 6,
    passwordMismatch: touched.confirmPassword && form.passwordHash !== form.confirmPassword,
    notRobot: touched.notRobot && !form.notRobot,
  };

  const formValid =
    form.firstName &&
    form.lastName &&
    form.emailHash &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailHash) &&
    form.phoneNumber &&
    form.passwordHash.length >= 6 &&
    form.passwordHash === form.confirmPassword &&
    form.notRobot;

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!formValid) {
      setTouched({ emailHash: true, passwordHash: true, confirmPassword: true, notRobot: true, firstName: true, lastName: true });
      return;
    }
    try {
      const existing = await fetchUserByEmail(form.emailHash);
      if (existing) {
        setToastMsg('Error|User already exists!');
        return;
      }
      await sendVerificationEmail(form.emailHash);
      setToastMsg('Warning|Please verify your email!');
      setEmailSentMsg('A verification email has been sent to your address. Please verify to continue.');
    } catch {
      setToastMsg('Error|Registration failed. Please try again.');
    }
  }

  function onLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    // Simple local login – wire up real auth when backend is ready
    setLogin(true);
    setSettingsObj({ showLogin: false });
    setToastMsg('Success|Logged in successfully!');
  }

  return (
    <div className="main-container">
      <div className="login-or-register-buttons">
        <input
          id="loginUser"
          type="button"
          className={`sm-btn-default-flat ${isLogin ? 'active' : ''}`}
          value="Login"
          onClick={() => setIsLogin(true)}
        />
        <input
          id="registerUser"
          type="button"
          className={`sm-btn-default-flat ${!isLogin ? 'active' : ''}`}
          value="Register"
          onClick={() => setIsLogin(false)}
        />
      </div>

      <div className="div-login-container">
        {/* ── Register ─────────────────────────────── */}
        <div className={isLogin ? 'visibility-hidden' : ''}>
          <form onSubmit={onRegister}>
            <div className="div-register">
              <h3 className="dialog-heading">Register</h3>

              <div className="name-container">
                <div className="name-left">
                  <label htmlFor="reg-firstname">First Name</label>
                  <input
                    id="reg-firstname"
                    type="text"
                    className="sm-input"
                    placeholder="Enter first name"
                    value={form.firstName}
                    onChange={(e) => updateForm('firstName', e.target.value)}
                    onBlur={() => blur('firstName')}
                    required
                  />
                </div>
                <div className="name-right">
                  <label htmlFor="reg-lastname">Last Name</label>
                  <input
                    id="reg-lastname"
                    type="text"
                    className="sm-input"
                    placeholder="Enter last name"
                    value={form.lastName}
                    onChange={(e) => updateForm('lastName', e.target.value)}
                    onBlur={() => blur('lastName')}
                    required
                  />
                </div>
              </div>

              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                type="email"
                className="sm-input"
                placeholder="Enter email"
                value={form.emailHash}
                onChange={(e) => updateForm('emailHash', e.target.value)}
                onBlur={() => blur('emailHash')}
                required
              />
              {errors.emailRequired && <span className="error-message">Email is required.</span>}
              {errors.emailInvalid && <span className="error-message">Invalid email address.</span>}

              <label htmlFor="reg-phone">Phone Number</label>
              <input
                id="reg-phone"
                type="tel"
                className="sm-input"
                placeholder="Enter phone number"
                value={form.phoneNumber}
                onChange={(e) => updateForm('phoneNumber', e.target.value)}
                required
              />

              <div className="password-container">
                <div className="password-left">
                  <label htmlFor="reg-password">Enter Password</label>
                  <input
                    id="reg-password"
                    type="password"
                    className="sm-input"
                    placeholder="Enter password"
                    value={form.passwordHash}
                    onChange={(e) => updateForm('passwordHash', e.target.value)}
                    onBlur={() => blur('passwordHash')}
                    required
                  />
                  {errors.passwordShort && <span className="error-message">Min 6 characters.</span>}
                </div>
                <div className="password-right">
                  <label htmlFor="reg-confirm">Confirm Password</label>
                  <input
                    id="reg-confirm"
                    type="password"
                    className="sm-input"
                    placeholder="Repeat password"
                    value={form.confirmPassword}
                    onChange={(e) => updateForm('confirmPassword', e.target.value)}
                    onBlur={() => blur('confirmPassword')}
                    required
                  />
                  {errors.passwordMismatch && <span className="error-message">Passwords do not match.</span>}
                </div>
              </div>

              <div className="checkbox-group mt-2 flex flex-row gap-4 items-center">
                <input
                  type="checkbox"
                  id="not-robot"
                  checked={form.notRobot}
                  onChange={(e) => updateForm('notRobot', e.target.checked)}
                  onBlur={() => blur('notRobot')}
                />
                <label htmlFor="not-robot" className="align-baseline">I am not a robot</label>
              </div>
              {errors.notRobot && <span className="error-message">Please confirm you are not a robot.</span>}

              <button type="submit" className="sm-btn sm-btn-bronze sm-btn-md">
                Register
              </button>

              {emailVerifiedOk && (
                <div className="email-sent-msg" style={{ color: '#1b9064', fontWeight: 600 }}>
                  <p>{emailSentMsg}</p>
                </div>
              )}

              {!emailVerifiedOk && emailSentMsg !== 'All fields are mandatory.' && (
                <div className="email-sent-msg">
                  <p>{emailSentMsg}</p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* ── Login ────────────────────────────────── */}
        <div className={!isLogin ? 'visibility-hidden' : 'div-login'}>
          <h2 className="dialog-heading">Login</h2>
          <form className="flex-container" style={{ flexDirection: 'column', gap: 8 }} onSubmit={onLogin}>
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              className="sm-input"
              placeholder="Enter email address"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              className="sm-input"
              placeholder="Enter password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            <button type="submit" className="sm-btn sm-btn-bronze sm-btn-md">
              Login
            </button>
          </form>
        </div>
      </div>

      <Toast toastMessage={toastMsg} />
    </div>
  );
}
