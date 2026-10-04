const PATHS = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  arrowUpRight: <path d="M7 17L17 7M8 7h9v9" />,
  mail: (<><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></>),
  phone: <path d="M5 4h3.5l2 5-2.4 1.5a11 11 0 0 0 5.4 5.4L15 13.5l5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  pin: (<><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  dress: (<><path d="M9.5 3h5l-.8 4.5L19 21H5l5.3-13.5z" /><path d="M10.3 7.5h3.4" /><path d="M7 17.5c3.3 1 6.7 1 10 0" strokeDasharray="1.6 1.8" /></>),
  hem: (<><path d="M7 3h10l1 18h-5l-1-10-1 10H6z" /><path d="M6.3 17.5h4.6M13.1 17.5h4.6" strokeDasharray="1.4 1.6" /></>),
  scissors: (<><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M8.6 7.5L20 18M8.6 16.5L20 6" /></>),
  drape: (<><path d="M3 4h18" /><path d="M5 4c0 6 1 11-1 16h6c-2-5-1-10-1-16M19 4c0 6-1 11 1 16h-6c2-5 1-10 1-16" /></>),
  pillow: (<><path d="M4 7c3-2 13-2 16 0 2 3 2 7 0 10-3 2-13 2-16 0-2-3-2-7 0-10z" /><path d="M7.5 12h9" strokeDasharray="1.5 2" /></>),
  badge: (<><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" /><path d="M9 12l2 2 4-4" /></>),
  needle: (<><path d="M4 20L18 6" /><ellipse cx="19.2" cy="4.8" rx="2" ry="1" transform="rotate(-45 19.2 4.8)" /><path d="M17 8c-4 2-9 1-11 6" strokeDasharray="2 2" /></>),
  spool: (<><path d="M6 3h12M6 21h12M8 3v18M16 3v18" /><path d="M8 8l8 2M8 12l8 2M8 16l8 2" /></>),
  quote: <path d="M10 7H6a2 2 0 0 0-2 2v4h5v5H4M20 7h-4a2 2 0 0 0-2 2v4h5v5h-5" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
};

export function Icon({ name, className = "h-5 w-5", strokeWidth = 1.7 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}
