import { useState } from 'react';

const scenarios = [
  {
    id: 'equilibrium',
    title: '1. Equilibrium Exchange Rate',
    subtitle: 'How the exchange rate is determined',
    color: '#2563eb',
    accentColor: '#dbeafe',
    shift: 'none',
    shiftCurve: null,
    explanation: {
      what: 'The exchange rate is determined where the Demand curve (D) and Supply curve (S) for a currency intersect. This point is called the equilibrium — where the quantity of currency demanded equals the quantity supplied.',
      how: 'Just like any market! Demand for £ comes from foreigners buying UK exports, investing in UK, or tourists visiting. Supply of £ comes from UK citizens buying imports, investing abroad, or going on holiday.',
      examTip:
        "In an exam: draw D sloping DOWN, S sloping UP. Where they cross = equilibrium exchange rate (e.g., £1 = $1.30). Label the axes: y-axis = 'Exchange Rate (£1 = $?)' and x-axis = 'Quantity of £'.",
    },
    points: [],
  },
  {
    id: 'appreciation-d',
    title: '2. Appreciation — Demand Increases',
    subtitle: 'Currency strengthens: D shifts RIGHT',
    color: '#16a34a',
    accentColor: '#dcfce7',
    shift: 'right',
    shiftCurve: 'demand',
    explanation: {
      what: 'When demand for the pound RISES, the demand curve shifts to the RIGHT. This pushes the exchange rate UP — the pound APPRECIATES.',
      how: 'Causes of rising demand: UK exports become more popular abroad → foreigners need £ to buy them. Higher UK interest rates → foreign investors want to save in UK banks. Inward FDI increases. Speculators buy £ expecting it to rise.',
      examTip:
        'Arrow: D shifts RIGHT → Exchange rate rises from e₁ to e₂ (APPRECIATION). Exports become MORE EXPENSIVE. Imports become CHEAPER.',
    },
    points: [
      '🏭 UK exports become popular → foreigners need £',
      '📈 UK interest rates rise → foreign savings flow in',
      '🏢 MNCs invest in UK (inward FDI) → demand for £ rises',
      '🎰 Speculators buy £ expecting it to rise',
    ],
  },
  {
    id: 'depreciation-d',
    title: '3. Depreciation — Demand Decreases',
    subtitle: 'Currency weakens: D shifts LEFT',
    color: '#dc2626',
    accentColor: '#fee2e2',
    shift: 'left',
    shiftCurve: 'demand',
    explanation: {
      what: 'When demand for the pound FALLS, the demand curve shifts to the LEFT. This pushes the exchange rate DOWN — the pound DEPRECIATES.',
      how: 'Causes of falling demand: UK exports become less competitive (e.g., due to high inflation). Lower UK interest rates → foreign investors move money elsewhere. Speculators lose confidence in UK economy. Outward FDI by UK companies.',
      examTip:
        'Arrow: D shifts LEFT → Exchange rate falls from e₁ to e₂ (DEPRECIATION). Exports become CHEAPER for foreigners. Imports become MORE EXPENSIVE for UK consumers.',
    },
    points: [
      '📉 UK inflation rises → exports less competitive, fewer bought',
      '💸 UK interest rates fall → foreign investors leave',
      '🏗️ UK companies invest abroad (outward FDI) → £ supplied',
      '😨 Speculators lose confidence, sell £',
    ],
  },
  {
    id: 'appreciation-s',
    title: '4. Appreciation — Supply Decreases',
    subtitle: 'Currency strengthens: S shifts LEFT',
    color: '#7c3aed',
    accentColor: '#ede9fe',
    shift: 'left',
    shiftCurve: 'supply',
    explanation: {
      what: 'When the supply of pounds FALLS, the supply curve shifts to the LEFT. Less currency on the market means it becomes more valuable — the pound APPRECIATES.',
      how: 'Supply falls when: UK citizens buy fewer imports (import demand falls). UK companies invest less abroad. UK tourists travel less overseas. Central bank buys its own currency from the market.',
      examTip:
        'Arrow: S shifts LEFT → Exchange rate rises from e₁ to e₂. A leftward shift in supply = appreciation. Remember: LESS supply → MORE valuable.',
    },
    points: [
      '🛒 UK consumers buy fewer imports → less £ supplied',
      '🏦 Bank of England buys £ from market (fixed rate)',
      '✈️ UK tourists travel less → less £ converted',
      '📊 UK firms invest less overseas',
    ],
  },
  {
    id: 'depreciation-s',
    title: '5. Depreciation — Supply Increases',
    subtitle: 'Currency weakens: S shifts RIGHT',
    color: '#ea580c',
    accentColor: '#ffedd5',
    shift: 'right',
    shiftCurve: 'supply',
    explanation: {
      what: 'When the supply of pounds INCREASES, the supply curve shifts to the RIGHT. More currency flooding the market drives its value down — the pound DEPRECIATES.',
      how: 'Supply rises when: UK citizens import more goods (they must exchange £ for foreign currency). UK firms invest heavily overseas. Government/Bank of England sells reserves of £ to lower the exchange rate. UK tourism abroad increases.',
      examTip:
        'Arrow: S shifts RIGHT → Exchange rate falls from e₁ to e₂. A rightward shift in supply = depreciation. More supply → less valuable.',
    },
    points: [
      '🛍️ UK consumers buy more imports → more £ exchanged',
      '🌍 UK firms invest more abroad → £ supplied to buy foreign currency',
      '🏛️ Central bank sells £ reserves (to lower fixed rate)',
      '📉 Current account deficit worsens → more £ leaving country',
    ],
  },
];

function ForexGraph({ scenario, animated }) {
  const W = 380;
  const H = 300;
  const PAD = { top: 30, right: 20, bottom: 50, left: 55 };
  const gW = W - PAD.left - PAD.right;
  const gH = H - PAD.top - PAD.bottom;

  const color = scenario.color;
  const isShift = scenario.shift !== 'none';
  const shiftD = isShift && scenario.shiftCurve === 'demand';
  const shiftS = isShift && scenario.shiftCurve === 'supply';
  const shiftRight = scenario.shift === 'right';
  const shiftLeft = scenario.shift === 'left';
  const appreciation = (shiftD && shiftRight) || (shiftS && shiftLeft);
  const depreciation = (shiftD && shiftLeft) || (shiftS && shiftRight);

  // Base curves
  // Demand: starts top-left, ends bottom-right
  const dStart = { x: gW * 0.05, y: gH * 0.1 };
  const dEnd = { x: gW * 0.95, y: gH * 0.9 };
  // Supply: starts bottom-left, ends top-right
  const sStart = { x: gW * 0.05, y: gH * 0.9 };
  const sEnd = { x: gW * 0.95, y: gH * 0.1 };

  // Equilibrium
  const eq = { x: gW * 0.5, y: gH * 0.5 };

  // Shifted curves (offset by 20%)
  const offset = gW * 0.2;
  const dShiftStart = {
    x: dStart.x + (shiftRight ? offset : -offset),
    y: dStart.y,
  };
  const dShiftEnd = { x: dEnd.x + (shiftRight ? offset : -offset), y: dEnd.y };
  const sShiftStart = {
    x: sStart.x + (shiftRight ? offset : -offset),
    y: sStart.y,
  };
  const sShiftEnd = { x: sEnd.x + (shiftRight ? offset : -offset), y: sEnd.y };

  // New equilibrium
  function lineIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const t =
      ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) /
      ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
    return { x: x1 + t * (x2 - x1), y: y1 + t * (y2 - y1) };
  }

  let newEq = eq;
  if (shiftD) {
    newEq = lineIntersect(
      dShiftStart.x,
      dShiftStart.y,
      dShiftEnd.x,
      dShiftEnd.y,
      sStart.x,
      sStart.y,
      sEnd.x,
      sEnd.y,
    );
  } else if (shiftS) {
    newEq = lineIntersect(
      dStart.x,
      dStart.y,
      dEnd.x,
      dEnd.y,
      sShiftStart.x,
      sShiftStart.y,
      sShiftEnd.x,
      sShiftEnd.y,
    );
  }

  // Y-axis labels
  const eqRate = 1.3;
  const shift = appreciation ? 0.2 : depreciation ? -0.2 : 0;
  const newRate = eqRate + shift;

  return (
    <svg
      width={W}
      height={H}
      style={{ fontFamily: "'Lora', Georgia, serif", overflow: 'visible' }}
    >
      <defs>
        <marker
          id={`arrowD-${scenario.id}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
        <marker
          id={`arrowS-${scenario.id}`}
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill={color} />
        </marker>
        <marker
          id="arrowBlue"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#2563eb" />
        </marker>
        <marker
          id="arrowGray"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="3"
          orient="auto"
        >
          <path d="M0,0 L0,6 L8,3 z" fill="#9ca3af" />
        </marker>
      </defs>

      <g transform={`translate(${PAD.left},${PAD.top})`}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={0}
            y1={gH * f}
            x2={gW}
            y2={gH * f}
            stroke="#f3f4f6"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1={0} y1={0} x2={0} y2={gH} stroke="#374151" strokeWidth="2" />
        <line x1={0} y1={gH} x2={gW} y2={gH} stroke="#374151" strokeWidth="2" />

        {/* Axis arrows */}
        <polygon points={`0,0 -4,10 4,10`} fill="#374151" />
        <polygon
          points={`${gW},${gH} ${gW - 10},${gH - 4} ${gW - 10},${gH + 4}`}
          fill="#374151"
        />

        {/* Axis labels */}
        <text
          x={-40}
          y={gH / 2}
          textAnchor="middle"
          transform={`rotate(-90, -40, ${gH / 2})`}
          fontSize="11"
          fill="#374151"
          fontWeight="600"
        >
          Exchange Rate (£1=$?)
        </text>
        <text
          x={gW / 2}
          y={gH + 42}
          textAnchor="middle"
          fontSize="11"
          fill="#374151"
          fontWeight="600"
        >
          Quantity of £
        </text>

        {/* Base Demand curve (always shown) */}
        <line
          x1={dStart.x}
          y1={dStart.y}
          x2={dEnd.x}
          y2={dEnd.y}
          stroke={shiftD ? '#d1d5db' : '#2563eb'}
          strokeWidth={shiftD ? 1.5 : 2.5}
          strokeDasharray={shiftD ? '6,4' : 'none'}
        />
        <text
          x={dEnd.x + 4}
          y={dEnd.y + 4}
          fontSize="13"
          fontWeight="bold"
          fill={shiftD ? '#9ca3af' : '#2563eb'}
        >
          D{shiftD ? '₁' : ''}
        </text>

        {/* Base Supply curve (always shown) */}
        <line
          x1={sStart.x}
          y1={sStart.y}
          x2={sEnd.x}
          y2={sEnd.y}
          stroke={shiftS ? '#d1d5db' : '#dc2626'}
          strokeWidth={shiftS ? 1.5 : 2.5}
          strokeDasharray={shiftS ? '6,4' : 'none'}
        />
        <text
          x={sEnd.x + 4}
          y={sEnd.y - 4}
          fontSize="13"
          fontWeight="bold"
          fill={shiftS ? '#9ca3af' : '#dc2626'}
        >
          S{shiftS ? '₁' : ''}
        </text>

        {/* Shifted curves */}
        {shiftD && (
          <>
            <line
              x1={dShiftStart.x}
              y1={dShiftStart.y}
              x2={dShiftEnd.x}
              y2={dShiftEnd.y}
              stroke="#2563eb"
              strokeWidth="2.5"
            />
            <text
              x={dShiftEnd.x + 4}
              y={dShiftEnd.y + 4}
              fontSize="13"
              fontWeight="bold"
              fill="#2563eb"
            >
              D₂
            </text>
            {/* Arrow showing shift */}
            <line
              x1={(dStart.x + dEnd.x) / 2 + (shiftRight ? 0 : offset * 0.7)}
              y1={(dStart.y + dEnd.y) / 2}
              x2={
                (dShiftStart.x + dShiftEnd.x) / 2 -
                (shiftRight ? offset * 0.15 : -offset * 0.15)
              }
              y2={(dShiftStart.y + dShiftEnd.y) / 2}
              stroke={color}
              strokeWidth="2"
              strokeDasharray="4,2"
              markerEnd={`url(#arrowD-${scenario.id})`}
            />
          </>
        )}

        {shiftS && (
          <>
            <line
              x1={sShiftStart.x}
              y1={sShiftStart.y}
              x2={sShiftEnd.x}
              y2={sShiftEnd.y}
              stroke="#dc2626"
              strokeWidth="2.5"
            />
            <text
              x={sShiftEnd.x + 4}
              y={sShiftEnd.y - 4}
              fontSize="13"
              fontWeight="bold"
              fill="#dc2626"
            >
              S₂
            </text>
            {/* Arrow showing shift */}
            <line
              x1={(sStart.x + sEnd.x) / 2 + (shiftRight ? 0 : offset * 0.7)}
              y1={(sStart.y + sEnd.y) / 2}
              x2={
                (sShiftStart.x + sShiftEnd.x) / 2 -
                (shiftRight ? offset * 0.15 : -offset * 0.15)
              }
              y2={(sShiftStart.y + sShiftEnd.y) / 2}
              stroke={color}
              strokeWidth="2"
              strokeDasharray="4,2"
              markerEnd={`url(#arrowS-${scenario.id})`}
            />
          </>
        )}

        {/* Equilibrium e1 */}
        <circle cx={eq.x} cy={eq.y} r={5} fill="#374151" />
        {/* Dashed lines to axes for e1 */}
        <line
          x1={0}
          y1={eq.y}
          x2={eq.x}
          y2={eq.y}
          stroke="#374151"
          strokeWidth="1"
          strokeDasharray="4,3"
        />
        <line
          x1={eq.x}
          y1={gH}
          x2={eq.x}
          y2={eq.y}
          stroke="#374151"
          strokeWidth="1"
          strokeDasharray="4,3"
        />
        <text x={-5} y={eq.y + 4} fontSize="10" fill="#374151" textAnchor="end">
          e₁ ($1.30)
        </text>

        {/* New equilibrium e2 */}
        {isShift && (
          <>
            <circle cx={newEq.x} cy={newEq.y} r={5} fill={color} />
            {/* Dashed lines to axes for e2 */}
            <line
              x1={0}
              y1={newEq.y}
              x2={newEq.x}
              y2={newEq.y}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <line
              x1={newEq.x}
              y1={gH}
              x2={newEq.x}
              y2={newEq.y}
              stroke={color}
              strokeWidth="1"
              strokeDasharray="4,3"
            />
            <text
              x={-5}
              y={newEq.y + 4}
              fontSize="10"
              fill={color}
              textAnchor="end"
              fontWeight="bold"
            >
              e₂ (${newRate.toFixed(2)})
            </text>

            {/* Vertical arrow showing rate change */}
            <line
              x1={-30}
              y1={eq.y}
              x2={-30}
              y2={newEq.y + (appreciation ? 6 : -6)}
              stroke={color}
              strokeWidth="2"
              markerEnd={`url(#arrowD-${scenario.id})`}
            />
            <text
              x={-46}
              y={(eq.y + newEq.y) / 2 + 4}
              fontSize="10"
              fill={color}
              textAnchor="middle"
              transform={`rotate(-90, -46, ${(eq.y + newEq.y) / 2})`}
              fontWeight="bold"
            >
              {appreciation ? 'RISES ▲' : 'FALLS ▼'}
            </text>
          </>
        )}
      </g>
    </svg>
  );
}

export default function ForexGraphs() {
  const [active, setActive] = useState(0);
  const scenario = scenarios[active];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        fontFamily: "'Lora', Georgia, serif",
        padding: '0',
      }}
    >
      {/* Header */}
      <div
        style={{
          background: 'linear-gradient(90deg, #1e40af, #2563eb)',
          padding: '24px 32px',
          borderBottom: '2px solid #3b82f6',
        }}
      >
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 11,
              color: '#93c5fd',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: 6,
            }}
          >
            IGCSE Economics 0455 — Unit 6.3
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 'bold',
              color: '#fff',
              marginBottom: 2,
            }}
          >
            Foreign Exchange Rate Diagrams
          </div>
          <div style={{ fontSize: 14, color: '#bfdbfe' }}>
            Interactive study guide — click each scenario to see the diagram
          </div>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div
        style={{
          background: '#0f172a',
          borderBottom: '1px solid #1e293b',
          padding: '0 32px',
          display: 'flex',
          gap: 0,
          overflowX: 'auto',
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: 'none',
              padding: '14px 18px',
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: "'Lora', Georgia, serif",
              color: active === i ? s.color : '#64748b',
              borderBottom:
                active === i ? `3px solid ${s.color}` : '3px solid transparent',
              fontWeight: active === i ? 'bold' : 'normal',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
            }}
          >
            {s.title.split('.')[0] + '. ' + s.title.split('. ')[1]}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '24px 32px' }}>
        <div
          style={{
            display: 'flex',
            gap: 24,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          {/* Left: Graph */}
          <div
            style={{
              background: '#fff',
              borderRadius: 16,
              padding: '24px',
              flex: '0 0 auto',
              boxShadow: `0 0 0 3px ${scenario.color}40, 0 20px 60px rgba(0,0,0,0.3)`,
              transition: 'box-shadow 0.3s',
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 'bold',
                color: scenario.color,
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}
            >
              {scenario.subtitle}
            </div>
            <ForexGraph scenario={scenario} />

            {/* Legend */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 8,
                flexWrap: 'wrap',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 24,
                    height: 3,
                    background: '#2563eb',
                    borderRadius: 2,
                  }}
                />
                <span style={{ fontSize: 11, color: '#374151' }}>
                  Demand (D)
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 24,
                    height: 3,
                    background: '#dc2626',
                    borderRadius: 2,
                  }}
                />
                <span style={{ fontSize: 11, color: '#374151' }}>
                  Supply (S)
                </span>
              </div>
              {scenario.shift !== 'none' && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div
                    style={{
                      width: 24,
                      height: 3,
                      background: '#9ca3af',
                      borderRadius: 2,
                      borderTop: '1px dashed #9ca3af',
                    }}
                  />
                  <span style={{ fontSize: 11, color: '#374151' }}>
                    Original curve
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Explanation */}
          <div style={{ flex: '1 1 280px', minWidth: 260 }}>
            <div
              style={{
                background: scenario.accentColor,
                borderLeft: `4px solid ${scenario.color}`,
                borderRadius: '0 12px 12px 0',
                padding: '16px 20px',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: scenario.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 6,
                }}
              >
                What's happening?
              </div>
              <div style={{ fontSize: 14, color: '#1e293b', lineHeight: 1.6 }}>
                {scenario.explanation.what}
              </div>
            </div>

            <div
              style={{
                background: '#1e293b',
                borderLeft: `4px solid ${scenario.color}`,
                borderRadius: '0 12px 12px 0',
                padding: '16px 20px',
                marginBottom: 14,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: scenario.color,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 6,
                }}
              >
                How & Why
              </div>
              <div style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.7 }}>
                {scenario.explanation.how}
              </div>
            </div>

            {scenario.points.length > 0 && (
              <div
                style={{
                  background: '#0f172a',
                  border: `1px solid ${scenario.color}40`,
                  borderRadius: 12,
                  padding: '14px 18px',
                  marginBottom: 14,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 'bold',
                    color: scenario.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    marginBottom: 10,
                  }}
                >
                  Causes
                </div>
                {scenario.points.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      fontSize: 13,
                      color: '#e2e8f0',
                      marginBottom: 8,
                      lineHeight: 1.5,
                    }}
                  >
                    {p}
                  </div>
                ))}
              </div>
            )}

            <div
              style={{
                background: '#fefce8',
                border: '1px solid #fde047',
                borderRadius: 12,
                padding: '14px 18px',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: '#92400e',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: 6,
                }}
              >
                ✏️ Exam Tip
              </div>
              <div style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6 }}>
                {scenario.explanation.examTip}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 24,
            gap: 12,
          }}
        >
          <button
            onClick={() => setActive(Math.max(0, active - 1))}
            disabled={active === 0}
            style={{
              background: active === 0 ? '#1e293b' : '#2563eb',
              color: active === 0 ? '#475569' : '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              cursor: active === 0 ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 'bold',
            }}
          >
            ← Previous
          </button>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {scenarios.map((_, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? scenario.color : '#334155',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                }}
              />
            ))}
          </div>

          <button
            onClick={() =>
              setActive(Math.min(scenarios.length - 1, active + 1))
            }
            disabled={active === scenarios.length - 1}
            style={{
              background:
                active === scenarios.length - 1 ? '#1e293b' : '#2563eb',
              color: active === scenarios.length - 1 ? '#475569' : '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '10px 20px',
              cursor:
                active === scenarios.length - 1 ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontFamily: "'Lora', Georgia, serif",
              fontWeight: 'bold',
            }}
          >
            Next →
          </button>
        </div>

        {/* Summary table */}
        <div
          style={{
            background: '#1e293b',
            borderRadius: 16,
            padding: '20px 24px',
            marginTop: 24,
            border: '1px solid #334155',
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: '#f1f5f9',
              marginBottom: 14,
              borderBottom: '1px solid #334155',
              paddingBottom: 10,
            }}
          >
            📊 Quick Reference Summary
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 12,
            }}
          >
            {[
              {
                title: 'D shifts RIGHT →',
                result: 'APPRECIATION ↑',
                color: '#16a34a',
                bg: '#052e16',
              },
              {
                title: 'D shifts LEFT →',
                result: 'DEPRECIATION ↓',
                color: '#dc2626',
                bg: '#2d0000',
              },
              {
                title: 'S shifts LEFT →',
                result: 'APPRECIATION ↑',
                color: '#7c3aed',
                bg: '#1e0b3a',
              },
              {
                title: 'S shifts RIGHT →',
                result: 'DEPRECIATION ↓',
                color: '#ea580c',
                bg: '#2c0e00',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: item.bg,
                  border: `1px solid ${item.color}40`,
                  borderRadius: 10,
                  padding: '12px 14px',
                }}
              >
                <div
                  style={{ fontSize: 12, color: '#94a3b8', marginBottom: 4 }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: item.color,
                  }}
                >
                  {item.result}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 14,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 10,
            }}
          >
            <div
              style={{
                background: '#0f172a',
                borderRadius: 10,
                padding: '12px 14px',
                border: '1px solid #16a34a40',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#4ade80',
                  fontWeight: 'bold',
                  marginBottom: 6,
                }}
              >
                APPRECIATION effects:
              </div>
              <div style={{ fontSize: 12, color: '#86efac' }}>
                ✓ Imports CHEAPER
              </div>
              <div style={{ fontSize: 12, color: '#fca5a5' }}>
                ✗ Exports MORE EXPENSIVE
              </div>
              <div style={{ fontSize: 12, color: '#fca5a5' }}>
                ✗ May WORSEN trade balance
              </div>
              <div style={{ fontSize: 12, color: '#86efac' }}>
                ✓ Helps reduce INFLATION
              </div>
            </div>
            <div
              style={{
                background: '#0f172a',
                borderRadius: 10,
                padding: '12px 14px',
                border: '1px solid #dc262640',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#f87171',
                  fontWeight: 'bold',
                  marginBottom: 6,
                }}
              >
                DEPRECIATION effects:
              </div>
              <div style={{ fontSize: 12, color: '#fca5a5' }}>
                ✗ Imports MORE EXPENSIVE
              </div>
              <div style={{ fontSize: 12, color: '#86efac' }}>
                ✓ Exports CHEAPER (more competitive)
              </div>
              <div style={{ fontSize: 12, color: '#86efac' }}>
                ✓ Can IMPROVE trade balance (if PED elastic)
              </div>
              <div style={{ fontSize: 12, color: '#fca5a5' }}>
                ✗ Can cause INFLATION
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 12,
              background: '#fefce8',
              borderRadius: 10,
              padding: '10px 14px',
            }}
          >
            <span
              style={{ fontSize: 12, color: '#92400e', fontWeight: 'bold' }}
            >
              🧠 Memory Trick: SPICED —{' '}
            </span>
            <span style={{ fontSize: 12, color: '#78350f' }}>
              Strong Pound = Imports Cheap, Exports Dear
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
