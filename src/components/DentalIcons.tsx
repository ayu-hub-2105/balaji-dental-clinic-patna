import React from 'react';

export const ToothIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C8 2 6 4 6 7c0 3.5 1.5 5 1.5 8 0 2.5-.5 5 1.5 6s3-2 3-5c0-1.5 1-2 1.5-2s1.5.5 1.5 2c0 3 1 6 3 5s1.5-3.5 1.5-6c0-3 1.5-4.5 1.5-8 0-3-2-5-6-5z" />
    <path d="M9.5 7.5c1-1 3.5-1 5 0" opacity="0.6" strokeWidth="1.5" />
  </svg>
);

export const BalajiCircularLogo: React.FC<{
  className?: string;
  size?: number;
  variant?: 'blue' | 'white' | 'dark';
}> = ({ className = '', size = 54, variant = 'blue' }) => {
  const isWhite = variant === 'white';
  const isDark = variant === 'dark';

  const bgColor = isWhite ? '#ffffff' : isDark ? '#0f172a' : '#0284c7';
  const ringColor = isWhite ? '#0284c7' : isDark ? '#475569' : '#38bdf8';
  const textColor = isWhite ? '#0284c7' : '#ffffff';
  const innerBg = isWhite ? '#f0f9ff' : isDark ? '#1e293b' : '#0369a1';
  const toothColor = isWhite ? '#0284c7' : '#ffffff';
  const accentColor = '#f59e0b'; // vibrant amber star/sparkle

  const idSuffix = React.useId().replace(/:/g, '');
  const topPathId = `top-arc-${idSuffix}`;
  const bottomPathId = `bottom-arc-${idSuffix}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`shrink-0 select-none ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Top Arc for "BALAJI DENTAL" (left to right clockwise, centered at 50,50 radius 35.5) */}
        <path
          id={topPathId}
          d="M 14.5 50 A 35.5 35.5 0 0 1 85.5 50"
          fill="none"
        />
        {/* Bottom Arc for "IMPLANT & BRACES" (counter-clockwise along bottom so letters point toward center, radius 35.5) */}
        <path
          id={bottomPathId}
          d="M 14.5 50 A 35.5 35.5 0 0 0 85.5 50"
          fill="none"
        />
        {/* Subtle shadow filter */}
        <filter id={`glow-${idSuffix}`} x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Outer Main Circle */}
      <circle
        cx="50"
        cy="50"
        r="47.5"
        fill={bgColor}
        stroke={ringColor}
        strokeWidth="2.5"
        filter={`url(#glow-${idSuffix})`}
      />

      {/* Inner Thin Border Ring */}
      <circle
        cx="50"
        cy="50"
        r="44.5"
        fill="none"
        stroke={isWhite ? '#bae6fd' : 'rgba(255,255,255,0.45)'}
        strokeWidth="0.8"
      />

      {/* Inner Central Circle housing the tooth */}
      <circle
        cx="50"
        cy="50"
        r="20"
        fill={innerBg}
        stroke={ringColor}
        strokeWidth="1.8"
      />

      {/* Upper Text: BALAJI DENTAL - High visibility, bold & clear */}
      <text
        fill={textColor}
        stroke={textColor}
        strokeWidth="0.45"
        paintOrder="stroke fill"
        fontSize="9.2"
        fontWeight="900"
        letterSpacing="0.08em"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        <textPath
          href={`#${topPathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          BALAJI DENTAL
        </textPath>
      </text>

      {/* Left & Right Decorative Stars */}
      <text
        x="12.5"
        y="52.5"
        fill={accentColor}
        stroke={accentColor}
        strokeWidth="0.3"
        fontSize="7"
        textAnchor="middle"
        fontWeight="900"
      >
        ★
      </text>
      <text
        x="87.5"
        y="52.5"
        fill={accentColor}
        stroke={accentColor}
        strokeWidth="0.3"
        fontSize="7"
        textAnchor="middle"
        fontWeight="900"
      >
        ★
      </text>

      {/* Lower Text: IMPLANT & BRACES - High visibility, bold & clear */}
      <text
        fill={textColor}
        stroke={textColor}
        strokeWidth="0.4"
        paintOrder="stroke fill"
        fontSize="8.2"
        fontWeight="900"
        letterSpacing="0.06em"
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      >
        <textPath
          href={`#${bottomPathId}`}
          startOffset="50%"
          textAnchor="middle"
        >
          IMPLANT & BRACES
        </textPath>
      </text>

      {/* Center Tooth / Smile Icon */}
      <g transform="translate(39.5, 39.5) scale(0.88)">
        <path
          d="M12 2.5C8.2 2.5 6 4.8 6 7.8c0 3.6 1.4 5.2 1.4 8.2 0 2.4-.4 4.5 1.6 5.5 2 .8 2.8-2.2 3-5 .1-1.3 1-1.8 1.5-1.8s1.4.5 1.5 1.8c.2 2.8 1 5.8 3 5 2-1 1.6-3.1 1.6-5.5 0-3 1.4-4.6 1.4-8.2 0-3-2.2-5.3-6-5.3z"
          fill="none"
          stroke={toothColor}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Smile curve in tooth */}
        <path
          d="M9.2 8c1.5-.8 4.1-.8 5.6 0"
          fill="none"
          stroke={accentColor}
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export const BalajiLogo: React.FC<{
  className?: string;
  variant?: 'light' | 'dark' | 'white';
  size?: number;
}> = ({
  className = '',
  variant = 'light',
  size = 52
}) => {
  const isWhite = variant === 'white';
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-1.5 sm:gap-3 select-none ${className}`}>
      {/* Circular Emblem with bold, clear letters */}
      <div className="shrink-0 w-9 h-9 sm:w-[52px] sm:h-[52px] flex items-center justify-center">
        <BalajiCircularLogo
          className="w-9 h-9 sm:w-[52px] sm:h-[52px]"
          variant={isWhite ? 'white' : isDark ? 'dark' : 'blue'}
        />
      </div>

      {/* Brand Typography: BALAJI + normally stacked DENTAL and CLINIC without rectangular boxes */}
      <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 text-left">
        <span
          className={`font-black tracking-tight text-xl sm:text-[32px] md:text-[36px] leading-none font-heading ${
            isWhite ? 'text-white' : isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          BALAJI
        </span>
        <div className="flex flex-col justify-center leading-tight">
          <span
            className={`text-[9px] sm:text-[13px] md:text-[14px] font-black uppercase tracking-wider leading-none ${
              isWhite ? 'text-amber-300' : isDark ? 'text-sky-400' : 'text-sky-700'
            }`}
          >
            DENTAL
          </span>
          <span
            className={`text-[8px] sm:text-[11px] md:text-[12px] font-bold uppercase tracking-widest leading-none mt-0.5 sm:mt-1 ${
              isWhite ? 'text-white/90' : isDark ? 'text-slate-300' : 'text-slate-600'
            }`}
          >
            CLINIC
          </span>
        </div>
      </div>
    </div>
  );
};

export const SmileCurve: React.FC<{ className?: string }> = ({ className = 'w-full h-4' }) => (
  <svg viewBox="0 0 200 20" fill="none" className={className}>
    <path
      d="M10 5 C 60 20, 140 20, 190 5"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
