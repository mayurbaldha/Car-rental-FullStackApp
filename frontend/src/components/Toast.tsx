import React from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  durationMs?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose, durationMs = 2500 }) => {
  React.useEffect(() => {
    const id = setTimeout(onClose, durationMs);
    return () => clearTimeout(id);
  }, [onClose, durationMs]);

  const bg = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#2563eb';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        background: bg,
        color: 'white',
        padding: '10px 14px',
        borderRadius: 8,
        boxShadow: '0 6px 24px rgba(0,0,0,0.2)',
        zIndex: 1000,
        maxWidth: 360,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontWeight: 600 }}>{type.toUpperCase()}</span>
        <span style={{ opacity: 0.85 }}>{message}</span>
        <button
          aria-label="Close notification"
          onClick={onClose}
          style={{
            marginLeft: 'auto',
            background: 'transparent',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};
