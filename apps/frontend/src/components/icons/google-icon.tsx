interface GoogleIconProps {
  size?: number;
  className?: string;
}

export const GoogleIcon = ({ size = 16, className }: GoogleIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M12 11v3.6h5.1c-.2 1.3-1.5 3.9-5.1 3.9-3.1 0-5.6-2.5-5.6-5.6S8.9 7.3 12 7.3c1.8 0 2.9.7 3.6 1.4l2.4-2.3C16.5 4.9 14.5 4 12 4 7 4 3 8 3 13s4 9 9 9c5.2 0 8.6-3.7 8.6-8.8 0-.6-.1-1-.1-1.5H12z" />
  </svg>
);
