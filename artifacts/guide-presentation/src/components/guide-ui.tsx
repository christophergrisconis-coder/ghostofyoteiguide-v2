import React from 'react';
import { GOLD, GOLD20, GOLD40, WHITE, DIM, CARD, ACT_COLOR, REGION_COLOR } from '../data/quests';
import type { Quest } from '../data/quests';

// ── Primitive components ───────────────────────────────────────────────────────

export function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ background: CARD, backdropFilter: 'blur(12px)', border: `1px solid ${GOLD40}`, borderRadius: 12, padding: '20px 24px', ...style }}>
      {children}
    </div>
  );
}

export function Tag({ label, color = GOLD20, textColor = GOLD }: { label: string; color?: string; textColor?: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '2px 10px', borderRadius: 20, background: color, color: textColor, fontSize: 10, fontFamily: 'sans-serif', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
      {label}
    </span>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(22px, 3vw, 34px)', fontWeight: 400, color: WHITE, letterSpacing: '0.04em', textShadow: '0 2px 20px rgba(0,0,0,0.8)', margin: '8px 0 4px' }}>
      {children}
    </h2>
  );
}

export function GoldLine({ width = '60%' }: { width?: string }) {
  return (
    <div style={{ height: 2, background: `linear-gradient(90deg, ${GOLD}, transparent)`, margin: '12px 0 20px', width }} />
  );
}

export function MiniBar({ pct, color = GOLD }: { pct: number; color?: string }) {
  return (
    <div className="mini-bar-bg" style={{ marginTop: 8 }}>
      <div className="mini-bar-fg" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function TierDots({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`tier-dot ${i < filled ? 'filled' : 'empty'}`} />
      ))}
    </span>
  );
}

// ── Section background wrapper ────────────────────────────────────────────────

export function SectionBg({ img, overlay = 'rgba(5,5,15,0.88)', children }: {
  img: string;
  overlay?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay, pointerEvents: 'none' }} />
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}

// ── Quest list row ─────────────────────────────────────────────────────────────

export function QuestRow({ quest, index, selected, onClick, accentColor, checked = false, onToggle }: {
  quest: Quest; index: number; selected: boolean; onClick: () => void; accentColor: string;
  checked?: boolean; onToggle?: (e: React.MouseEvent) => void;
}) {
  const regionColor = REGION_COLOR[quest.region] || '#888';
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px',
        borderRadius: 8, marginBottom: 4, cursor: 'pointer',
        background: checked
          ? `${accentColor}10`
          : selected ? `${accentColor}18` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${selected ? accentColor + '60' : checked ? accentColor + '30' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.15s ease',
        opacity: checked ? 0.72 : 1,
      }}
    >
      {/* Checkbox */}
      <button
        onClick={onToggle}
        aria-label={checked ? 'Mark incomplete' : 'Mark complete'}
        style={{
          flexShrink: 0, width: 18, height: 18, borderRadius: 4,
          border: `1.5px solid ${checked ? accentColor : 'rgba(255,255,255,0.25)'}`,
          background: checked ? accentColor : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', padding: 0, transition: 'all 0.15s ease',
        }}
      >
        {checked && <span style={{ fontSize: 10, color: '#0a0a0f', lineHeight: 1, fontWeight: 700 }}>✓</span>}
      </button>

      <span style={{ fontFamily: 'sans-serif', fontSize: 10, color: 'rgba(255,255,255,0.3)', width: 20, flexShrink: 0 }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <span style={{
        flex: 1, fontFamily: 'sans-serif', fontSize: 12, lineHeight: 1.3,
        color: selected ? WHITE : 'rgba(240,237,232,0.8)',
        textDecoration: checked ? 'line-through' : 'none',
      }}>
        {quest.title}
      </span>
      {quest.boss && <span style={{ fontSize: 10 }}>💀</span>}
      <span style={{ fontFamily: 'sans-serif', fontSize: 9, color: regionColor, background: `${regionColor}20`, padding: '1px 5px', borderRadius: 3, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
        {quest.region.split(' ')[0]}
      </span>
    </div>
  );
}

// ── Collectible checklist item ────────────────────────────────────────────────

export function CollectibleCheckItem({ id, label, color, checked, onToggle }: {
  id: string; label: string; color: string; checked: boolean; onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: 6, padding: '4px 6px',
        borderRadius: 5, cursor: 'pointer',
        background: checked ? `${color}18` : 'rgba(255,255,255,0.02)',
        transition: 'background 0.1s ease',
      }}
    >
      <div style={{
        width: 14, height: 14, borderRadius: 3, flexShrink: 0,
        border: `1.5px solid ${checked ? color : 'rgba(255,255,255,0.2)'}`,
        background: checked ? color : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.12s ease',
      }}>
        {checked && <span style={{ fontSize: 9, color: '#0a0a0f', fontWeight: 700, lineHeight: 1 }}>✓</span>}
      </div>
      <span style={{
        fontFamily: 'sans-serif', fontSize: 11, color: checked ? 'rgba(240,237,232,0.45)' : 'rgba(240,237,232,0.75)',
        textDecoration: checked ? 'line-through' : 'none',
        lineHeight: 1.3,
      }}>{label}</span>
    </div>
  );
}

// ── Quest detail panel ─────────────────────────────────────────────────────────

export function QuestDetail({ quest, onPrev, onNext, hasPrev, hasNext, accentColor = GOLD }: {
  quest: Quest; onPrev: () => void; onNext: () => void;
  hasPrev: boolean; hasNext: boolean; accentColor?: string;
}) {
  const btnBase: React.CSSProperties = {
    padding: '7px 16px', borderRadius: 8, border: `1px solid ${accentColor}60`,
    fontFamily: 'sans-serif', fontSize: 12, cursor: 'pointer',
    background: 'rgba(255,255,255,0.04)', color: accentColor, transition: 'all 0.15s ease',
  };
  const btnDisabled: React.CSSProperties = { ...btnBase, opacity: 0.3, cursor: 'default' };

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ flex: 1, overflowY: 'auto', paddingRight: 2 }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {quest.act    && <Tag label={quest.act}              color={`${ACT_COLOR[quest.act]  || '#888'}25`} textColor={ACT_COLOR[quest.act]  || '#888'} />}
          {quest.ally   && <Tag label={`Ally: ${quest.ally}`}  color="rgba(123,104,238,0.2)"                textColor="#7B68EE" />}
          {quest.target && <Tag label="Bounty Target"           color="rgba(184,134,11,0.2)"                textColor="#B8860B" />}
          {quest.boss   && <Tag label="Boss Fight"              color="rgba(139,26,26,0.3)"                 textColor="#ef4444" />}
          {quest.prereq && <Tag label={`Req: ${quest.prereq}`} color="rgba(255,255,255,0.06)"              textColor="rgba(240,237,232,0.5)" />}
        </div>
        {/* Title */}
        <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, color: WHITE, marginBottom: quest.target ? 4 : 6, lineHeight: 1.2 }}>
          {quest.title}
        </h3>
        {quest.target && (
          <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: '#B8860B', marginBottom: 6, fontStyle: 'italic' }}>{quest.target}</p>
        )}
        {/* Meta */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>📍 {quest.region}</span>
          <span style={{ fontFamily: 'sans-serif', fontSize: 11, color: DIM }}>⏱ {quest.time}</span>
        </div>
        {/* Desc */}
        <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.55, marginBottom: 14 }}>{quest.desc}</p>
        {/* Steps */}
        <p style={{ fontFamily: 'sans-serif', fontSize: 10, color: accentColor, fontWeight: 700, letterSpacing: '0.08em', marginBottom: 8, textTransform: 'uppercase' }}>Steps</p>
        {quest.steps.map((step, i) => (
          <div key={i} className="check-row">
            <div className="check-box" />
            <span className="check-text">{step}</span>
          </div>
        ))}
        {/* Tip */}
        {quest.tip && (
          <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: 'rgba(201,168,76,0.08)', border: `1px solid ${GOLD40}` }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: 11, color: GOLD, marginBottom: 4, fontWeight: 700 }}>💡 {quest.tipLabel || 'Tip'}</p>
            <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM, lineHeight: 1.45 }}>{quest.tip}</p>
          </div>
        )}
        {/* Reward */}
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: 8, background: `${accentColor}0d`, border: `1px solid ${accentColor}30` }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: 12, color: DIM }}>
            <span style={{ color: accentColor, fontWeight: 700 }}>Reward: </span>{quest.reward}
          </p>
        </div>
      </div>
      {/* Prev / Next */}
      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, marginTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={onPrev} disabled={!hasPrev} style={hasPrev ? btnBase : btnDisabled}>← Prev</button>
        <button onClick={onNext} disabled={!hasNext} style={hasNext ? btnBase : btnDisabled}>Next →</button>
      </div>
    </Card>
  );
}
