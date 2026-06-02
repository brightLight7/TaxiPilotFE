import { useEffect, useState } from 'react';

interface ToastProps {
  toastMessage: string; // format: "Success|message" | "Error|message" | "Warning|message" | plain text
}

export default function Toast({ toastMessage }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState<'success' | 'error' | 'warning'>('success');
  const [text, setText] = useState('');

  useEffect(() => {
    if (!toastMessage) return;

    const parts = toastMessage.split('|');
    const prefix = parts[0]?.toLowerCase();
    const body = parts[1] ?? toastMessage;

    if (!body) return;

    if (prefix === 'success') setType('success');
    else if (prefix === 'error') setType('error');
    else if (prefix === 'warning') setType('warning');
    else setType('success');

    setText(body);
    setVisible(true);

    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  if (!visible) return null;

  return (
    <div className="toast-container">
      <div className={`toast-msg toast-${type}`}>{text}</div>
    </div>
  );
}
