interface Props {
  prices: number[];
  positive: boolean;
  width?: number;
  height?: number;
}

const PriceChart: React.FC<Props> = ({ prices, positive, width = 300, height = 100 }) => {
  if (!prices.length) return null;

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 1;
  const pad = 8;

  const pts = prices.map((p, i) => {
    const x = pad + (i / (prices.length - 1)) * (width - pad * 2);
    const y = pad + ((max - p) / range) * (height - pad * 2);
    return `${x},${y}`;
  });

  const fillPts = [
    `${pad},${height - pad}`,
    ...pts,
    `${width - pad},${height - pad}`,
  ].join(' ');

  const color = positive ? '#2dd36f' : '#eb445a';

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={`grad-${positive}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon points={fillPts} fill={`url(#grad-${positive})`} />
      <polyline
        points={pts.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PriceChart;
