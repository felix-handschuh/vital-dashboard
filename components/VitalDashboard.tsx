"use client";

import { useState, useRef, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import * as d3 from "d3";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon, HeartCheckIcon, WeightScaleIcon, SmileIcon, Calendar01Icon,
  Maximize01Icon, Minimize01Icon, ArrowLeft01Icon, ArrowRight01Icon,
  Download01Icon, Table01Icon, ChartLineData01Icon,
  PillIcon, CallIcon, Alert01Icon, PulseRectangle01Icon,
  ViewIcon, ViewOffIcon, InformationCircleIcon,
  ChartIncreaseIcon, ChartDecreaseIcon, MinusSignIcon,
  Cancel01Icon, ArrowUpRight01Icon, ArrowDownRight01Icon,
  ShieldBanIcon, ArrowUp01Icon, ArrowDown01Icon,
  Clock01Icon, BarChartIcon, ZoomInAreaIcon, ZoomOutAreaIcon,
  Link01Icon, CheckmarkCircle01Icon, CancelCircleIcon, RotateLeft01Icon,
  ToggleOnIcon, ToggleOffIcon, Notification01Icon, NotificationOff01Icon,
  Sun01Icon, Moon01Icon, Stethoscope02Icon, KeyboardIcon,
  UserIcon, CpuIcon, Radio01Icon, BluetoothIcon, BatteryFullIcon, Wifi01Icon
} from "@hugeicons/core-free-icons";

/* ═══════════════════════════════════════════════════════════════════════════════
   HUGEICONS WRAPPERS — map to Lucide-style API for drop-in replacement
   ═══════════════════════════════════════════════════════════════════════════════ */
const hi = (icon: any) => {
  const Comp = ({ size = 24, color, style, className }: { size?: number; color?: string; style?: React.CSSProperties; className?: string }) => (
    <HugeiconsIcon icon={icon} size={size} color={color} style={style} className={className} strokeWidth={1.5} />
  );
  return Comp;
};
const Activity = hi(Activity01Icon);
const Heart = hi(HeartCheckIcon);
const Weight = hi(WeightScaleIcon);
const Smile = hi(SmileIcon);
const Calendar = hi(Calendar01Icon);
const Maximize2 = hi(Maximize01Icon);
const Minimize2 = hi(Minimize01Icon);
const ChevronLeft = hi(ArrowLeft01Icon);
const ChevronRight = hi(ArrowRight01Icon);
const Download = hi(Download01Icon);
const Table2 = hi(Table01Icon);
const LineChart = hi(ChartLineData01Icon);
const Pill = hi(PillIcon);
const Phone = hi(CallIcon);
const AlertTriangle = hi(Alert01Icon);
const FileHeart = hi(PulseRectangle01Icon);
const Eye = hi(ViewIcon);
const EyeOff = hi(ViewOffIcon);
const Info = hi(InformationCircleIcon);
const TrendingUp = hi(ChartIncreaseIcon);
const TrendingDown = hi(ChartDecreaseIcon);
const Minus = hi(MinusSignIcon);
const X = hi(Cancel01Icon);
const ArrowUpRight = hi(ArrowUpRight01Icon);
const ArrowDownRight = hi(ArrowDownRight01Icon);
const ShieldAlert = hi(ShieldBanIcon);
const ChevronUp = hi(ArrowUp01Icon);
const ChevronDown = hi(ArrowDown01Icon);
const Clock = hi(Clock01Icon);
const BarChart3 = hi(BarChartIcon);
const ZoomIn = hi(ZoomInAreaIcon);
const ZoomOut = hi(ZoomOutAreaIcon);
const ExternalLink = hi(Link01Icon);
const CheckCircle = hi(CheckmarkCircle01Icon);
const XCircle = hi(CancelCircleIcon);
const RotateCcw = hi(RotateLeft01Icon);
const ToggleLeft = hi(ToggleOffIcon);
const ToggleRight = hi(ToggleOnIcon);
const Bell = hi(Notification01Icon);
const BellOff = hi(NotificationOff01Icon);
const Sun = hi(Sun01Icon);
const Moon = hi(Moon01Icon);
const Stethoscope = hi(Stethoscope02Icon);
const Keyboard = hi(KeyboardIcon);
const User = hi(UserIcon);
const Cpu = hi(CpuIcon);
const Radio = hi(Radio01Icon);
const Bluetooth = hi(BluetoothIcon);
const Battery = hi(BatteryFullIcon);
const Link2 = hi(Link01Icon);
const Wifi = hi(Wifi01Icon);

/* ═══════════════════════════════════════════════════════════════════════════════
   THEME SYSTEM — dark / light mode
   ═══════════════════════════════════════════════════════════════════════════════ */
type Theme = "dark" | "light";

const darkPalette = {
  bg: "#09090b", bgCard: "rgba(24,24,27,0.8)", bgCardHover: "rgba(39,39,42,0.6)",
  bgPanel: "rgba(24,24,27,0.98)", bgInput: "rgba(39,39,42,0.6)",
  border: "rgba(39,39,42,0.6)", borderStrong: "rgba(63,63,70,0.5)",
  text: "#fafafa", textSecondary: "#a1a1aa", textMuted: "#71717a", textDim: "#52525b",
  grid: "#27272a", gridLabel: "#a1a1aa",
  bpSystolic: "#4A9EDE", bpDiastolic: "#7EC8F0", heartRate: "#F07040",
  weight: "#2CC990", mood: "#F5B840",
  threshUpper: "#EF4444", threshLower: "#60A5FA",
  medication: "#E879A8", call: "#F5B840", alert: "#EF4444", ecg: "#2CC990",
  examination: "#818CF8",
  median: "#A1A1AA", good: "#2CC990", warning: "#F5B840", danger: "#EF4444", missed: "#52525b",
  alarmRed: "#EF4444", alarmYellow: "#F59E0B", alarmBlue: "#60A5FA", alarmGray: "#9CA3AF",
  atrialHigh: "#EF4444", atrialMod: "#F59E0B", atrialLow: "#60A5FA",
  outlier: "#C084FC",
  shortcutBg: "rgba(24,24,27,0.95)", shortcutKey: "#3f3f46", shortcutKeyText: "#e4e4e7",
};

const lightPalette: typeof darkPalette = {
  bg: "#fafafa", bgCard: "rgba(255,255,255,0.9)", bgCardHover: "rgba(244,244,245,0.8)",
  bgPanel: "rgba(255,255,255,0.98)", bgInput: "rgba(244,244,245,0.8)",
  border: "rgba(228,228,231,0.8)", borderStrong: "rgba(212,212,216,0.6)",
  text: "#18181b", textSecondary: "#52525b", textMuted: "#71717a", textDim: "#a1a1aa",
  grid: "#e4e4e7", gridLabel: "#71717a",
  bpSystolic: "#2563EB", bpDiastolic: "#3B82F6", heartRate: "#DC2626",
  weight: "#16A34A", mood: "#CA8A04",
  threshUpper: "#DC2626", threshLower: "#2563EB",
  medication: "#DB2777", call: "#CA8A04", alert: "#DC2626", ecg: "#16A34A",
  examination: "#6366F1",
  median: "#71717a", good: "#16A34A", warning: "#CA8A04", danger: "#DC2626", missed: "#d4d4d8",
  alarmRed: "#DC2626", alarmYellow: "#CA8A04", alarmBlue: "#2563EB", alarmGray: "#71717a",
  atrialHigh: "#DC2626", atrialMod: "#CA8A04", atrialLow: "#2563EB",
  outlier: "#9333EA",
  shortcutBg: "rgba(255,255,255,0.95)", shortcutKey: "#e4e4e7", shortcutKeyText: "#27272a",
};

const ALARM_LABELS: Record<string, string> = {
  critical: "Kritisch", warning: "Warnung", change: "Änderung", info: "Information",
};

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA TYPES — measurements support multiple per day
   ═══════════════════════════════════════════════════════════════════════════════ */
interface BpReading { time: string; systolic: number; diastolic: number; }
interface BpPoint { date: string; readings: BpReading[]; systolic: number; diastolic: number; alarm?: string; outlier?: boolean; outlierValidated?: boolean; }
interface HrReading { time: string; value: number; }
interface HrPoint { date: string; readings: HrReading[]; value: number; alarm?: string; outlier?: boolean; outlierValidated?: boolean; }
interface WeightReading { time: string; value: number; }
interface WeightPoint { date: string; readings: WeightReading[]; value: number; alarm?: string; outlier?: boolean; outlierValidated?: boolean; }
interface MoodPoint { date: string; value: number; }
interface EcgEvent { date: string; time: string; duration: number; atrialBurden?: number; atrialUncertain?: boolean; alarm?: string; acknowledgedBy?: string; acknowledgedAt?: string; waveform?: number[]; }
interface EventItem { date: string; type: string; label: string; alarm?: string; acknowledgedBy?: string; acknowledgedAt?: string; linkedId?: string; }
interface AllData { bp: BpPoint[]; hr: HrPoint[]; weight: WeightPoint[]; mood: MoodPoint[]; events: EventItem[]; ecgs: EcgEvent[]; missed: string[]; }

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA GENERATION — multi-measurement per day, many events
   ═══════════════════════════════════════════════════════════════════════════════ */
const NOW = new Date(2026, 2, 6);

const generateEcgWaveform = (len: number): number[] => {
  const w: number[] = [];
  for (let i = 0; i < len; i++) {
    const t = i / 250;
    const beat = Math.sin(t * 2 * Math.PI * 1.2) * 0.1;
    const qrs = Math.exp(-((t % 0.83 - 0.2) ** 2) / 0.001) * 1.2 - Math.exp(-((t % 0.83 - 0.18) ** 2) / 0.0005) * 0.3;
    w.push(beat + qrs + (Math.random() - 0.5) * 0.05);
  }
  return w;
};

const randTime = (hourMin = 6, hourMax = 22): string => {
  const h = hourMin + Math.floor(Math.random() * (hourMax - hourMin));
  const m = Math.floor(Math.random() * 60);
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
};

const generateData = (): AllData => {
  const days = 100;
  const data: AllData = { bp: [], hr: [], weight: [], mood: [], events: [], ecgs: [], missed: [] };
  let bW = 72.3, bS = 128, bD = 82, bHR = 72;
  const outlierDays = new Set([5, 12, 20, 35, 50, 65, 80]);

  for (let i = days; i >= 0; i--) {
    const date = new Date(NOW); date.setDate(date.getDate() - i);
    const ds = date.toISOString().split("T")[0];

    if (Math.random() < 0.06 && !outlierDays.has(i)) { data.missed.push(ds); continue; }
    if (i === 55 || i === 54) { data.missed.push(ds); continue; }

    const drift = Math.sin(i / 15) * 5;
    const isOutlierBp = outlierDays.has(i);

    // Multiple measurements per day: most days 2-3, some up to 10
    const bpCount = i % 7 === 0 ? Math.floor(Math.random() * 6) + 5 : // weekly: 5-10
      i % 2 === 0 ? Math.floor(Math.random() * 3) + 2 : // every other day: 2-4
      Math.random() < 0.6 ? Math.floor(Math.random() * 2) + 2 : 1; // rest: 60% get 2-3, 40% get 1
    const bpReadings: BpReading[] = [];
    for (let r = 0; r < bpCount; r++) {
      const s = Math.round(bS + drift + (Math.random() - 0.5) * 12 + (isOutlierBp && r === 0 ? 35 : 0));
      const d = Math.round(bD + drift * 0.6 + (Math.random() - 0.5) * 8 + (isOutlierBp && r === 0 ? -10 : 0));
      bpReadings.push({ time: randTime(6 + r * 2, 8 + r * 2), systolic: s, diastolic: d });
    }
    bpReadings.sort((a, b) => a.time.localeCompare(b.time));
    const avgSys = Math.round(bpReadings.reduce((s, r) => s + r.systolic, 0) / bpReadings.length);
    const avgDia = Math.round(bpReadings.reduce((s, r) => s + r.diastolic, 0) / bpReadings.length);
    const bpAlarm = avgSys > 150 ? "critical" : avgSys > 140 ? "warning" : avgSys < 100 ? "change" : undefined;
    data.bp.push({ date: ds, readings: bpReadings, systolic: avgSys, diastolic: avgDia, alarm: isOutlierBp ? "warning" : bpAlarm, outlier: isOutlierBp });

    const hrCount = i % 5 === 0 ? Math.floor(Math.random() * 5) + 3 : i % 2 === 0 ? Math.floor(Math.random() * 2) + 2 : Math.random() < 0.5 ? 2 : 1;
    const hrReadings: HrReading[] = [];
    const isOutlierHr = i === 12 || i === 35;
    for (let r = 0; r < hrCount; r++) {
      const hr = Math.round(bHR + Math.sin(i / 10) * 8 + (Math.random() - 0.5) * 10 + (isOutlierHr && r === 0 ? 40 : 0));
      hrReadings.push({ time: randTime(6 + r, 8 + r * 2), value: hr });
    }
    hrReadings.sort((a, b) => a.time.localeCompare(b.time));
    const avgHr = Math.round(hrReadings.reduce((s, r) => s + r.value, 0) / hrReadings.length);
    const hrAlarm = avgHr > 110 ? "critical" : avgHr > 100 ? "warning" : avgHr < 50 ? "warning" : undefined;
    data.hr.push({ date: ds, readings: hrReadings, value: avgHr, alarm: isOutlierHr ? "critical" : hrAlarm, outlier: isOutlierHr });

    bW += (Math.random() - 0.52) * 0.15;
    const w = Math.round(bW * 10) / 10;
    const isOutlierW = i === 20 || i === 65;
    const wCount = Math.random() < 0.35 ? 2 : 1;
    const wReadings: WeightReading[] = [];
    for (let r = 0; r < wCount; r++) {
      wReadings.push({ time: randTime(6, 10), value: Math.round((w + (Math.random() - 0.5) * 0.3 + (isOutlierW && r === 0 ? 4 : 0)) * 10) / 10 });
    }
    const avgW = Math.round(wReadings.reduce((s, r) => s + r.value, 0) / wReadings.length * 10) / 10;
    data.weight.push({ date: ds, readings: wReadings, value: avgW, alarm: isOutlierW ? "warning" : undefined, outlier: isOutlierW });

    if (Math.random() < 0.7) {
      data.mood.push({ date: ds, value: Math.min(5, Math.max(1, Math.round(3 + Math.sin(i / 8) + (Math.random() - 0.5) * 2))) });
    }

    // --- MANY MORE EVENTS ---
    // Alarms (~20% of days)
    if (Math.random() < 0.20) {
      const alarm = Math.random() < 0.3 ? "critical" : Math.random() < 0.5 ? "warning" : "change";
      data.events.push({
        date: ds, type: "alert", label: alarm === "critical" ? "Kritischer Schwellwert-Alarm" : alarm === "warning" ? "Schwellwert-Warnung" : "Wert-Änderung detektiert",
        alarm, acknowledgedBy: Math.random() < 0.6 ? "Dr. Schmidt" : undefined,
        acknowledgedAt: Math.random() < 0.6 ? `${ds}T10:30:00` : undefined, linkedId: `evt-alert-${i}`,
      });
    }
    // Phone calls (~15%)
    if (Math.random() < 0.15) {
      data.events.push({
        date: ds, type: "call",
        label: Math.random() < 0.5 ? "Telefonat mit Patient" : "Rückruf Arzt",
        alarm: "info",
        acknowledgedBy: Math.random() < 0.8 ? (Math.random() < 0.5 ? "Sr. Weber" : "Dr. Schmidt") : undefined,
        acknowledgedAt: Math.random() < 0.8 ? `${ds}T14:20:00` : undefined, linkedId: `evt-call-${i}`,
      });
    }
    // Medication changes (~10%)
    if (Math.random() < 0.10) {
      const meds = ["Ramipril angepasst (5mg→10mg)", "Metoprolol neu verordnet", "Amlodipin abgesetzt", "Diuretikum erhöht"];
      data.events.push({
        date: ds, type: "medication", label: meds[Math.floor(Math.random() * meds.length)],
        alarm: "change",
        acknowledgedBy: Math.random() < 0.9 ? "Dr. Müller" : undefined,
        acknowledgedAt: Math.random() < 0.9 ? `${ds}T09:00:00` : undefined, linkedId: `evt-med-${i}`,
      });
    }
    // On-site examinations (~8%)
    if (Math.random() < 0.08) {
      const exams = ["Vor-Ort Untersuchung", "Routinekontrolle", "Nachsorge-Termin", "Notfall-Visite"];
      data.events.push({
        date: ds, type: "examination", label: exams[Math.floor(Math.random() * exams.length)],
        alarm: Math.random() < 0.2 ? "warning" : "info",
        acknowledgedBy: "Dr. Schmidt",
        acknowledgedAt: `${ds}T11:00:00`, linkedId: `evt-exam-${i}`,
      });
    }

    // Atrial Burden events (~12%)
    if (Math.random() < 0.12) {
      const burden = Math.round(Math.random() * 35 + 3);
      const abAlarm = burden > 20 ? "critical" : burden > 10 ? "warning" : "change";
      data.events.push({
        date: ds, type: "atrialBurden",
        label: `Atrial Burden: ${burden}%${burden > 20 ? " — kritisch erhöht" : burden > 10 ? " — erhöht" : " — niedrig"}`,
        alarm: abAlarm,
        acknowledgedBy: Math.random() < 0.5 ? "Dr. Müller" : undefined,
        acknowledgedAt: Math.random() < 0.5 ? `${ds}T16:00:00` : undefined,
        linkedId: `evt-ab-${i}`,
      });
    }

    // ECG (~15%)
    if (Math.random() < 0.15) {
      const ab = Math.random();
      const atrialBurden = ab < 0.15 ? Math.round(Math.random() * 30 + 20) : ab < 0.3 ? Math.round(Math.random() * 10 + 2) : 0;
      const ecgAlarm = atrialBurden > 15 ? "critical" : atrialBurden > 5 ? "warning" : undefined;
      data.ecgs.push({
        date: ds, time: `${8 + Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        duration: Math.round(30 + Math.random() * 90),
        atrialBurden, atrialUncertain: Math.random() < 0.1,
        alarm: ecgAlarm,
        acknowledgedBy: Math.random() < 0.5 ? "Dr. Müller" : undefined,
        acknowledgedAt: Math.random() < 0.5 ? `${ds}T14:00:00` : undefined,
        waveform: generateEcgWaveform(10000),
      });
    }
  }
  return data;
};

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════════════════════ */
const RANGES = [14, 30, 60, 90] as const;
type Range = typeof RANGES[number];

const rollingMedian = (vals: { date: string; v: number }[], window = 7) => {
  return vals.map((pt, idx) => {
    const start = Math.max(0, idx - Math.floor(window / 2));
    const end = Math.min(vals.length, idx + Math.ceil(window / 2));
    const slice = vals.slice(start, end).map(p => p.v).sort((a, b) => a - b);
    return { date: pt.date, v: slice[Math.floor(slice.length / 2)] };
  });
};

const detectTrend = (values: number[]): "up" | "down" | "stable" => {
  if (values.length < 3) return "stable";
  const last7 = values.slice(-7);
  const first = last7.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
  const last = last7.slice(-3).reduce((a, b) => a + b, 0) / 3;
  const diff = last - first;
  if (Math.abs(diff) < 2) return "stable";
  return diff > 0 ? "up" : "down";
};

const complianceScore = (data: AllData, range: Range): number => {
  const end = NOW;
  const start = new Date(NOW); start.setDate(start.getDate() - range);
  let expected = 0, actual = 0;
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    expected++;
    const ds = d.toISOString().split("T")[0];
    if (data.bp.some(p => p.date === ds) || data.hr.some(p => p.date === ds)) actual++;
  }
  return expected > 0 ? Math.round((actual / expected) * 100) : 0;
};

const niceYDomain = (values: number[], padding = 0.1): [number, number] => {
  if (values.length === 0) return [0, 100];
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 10;
  const pad = range * padding;
  return [Math.floor(min - pad), Math.ceil(max + pad)];
};

const generateYTicks = (domain: [number, number], count = 5): number[] => {
  const [lo, hi] = domain;
  const step = (hi - lo) / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(lo + i * step));
};

/* HTML TrendIcon for DOM contexts */
const TrendIcon = ({ trend, color }: { trend: string; color: string }) => {
  if (trend === "up") return <ArrowUpRight size={18} color={color} />;
  if (trend === "down") return <ArrowDownRight size={18} color={color} />;
  return <Minus size={18} color={color} />;
};

/* SVG-native icons for use inside <svg> */
const SvgTrendArrow = ({ trend, color }: { trend: string; color: string }) => {
  if (trend === "up") return <path d="M0 10L7 3L10 6" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />;
  if (trend === "down") return <path d="M0 3L7 10L10 7" stroke={color} strokeWidth={2} fill="none" strokeLinecap="round" />;
  return <line x1={0} y1={6} x2={10} y2={6} stroke={color} strokeWidth={2} strokeLinecap="round" />;
};
const SvgPillIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <rect x={0} y={0} width={16} height={8} rx={4} fill="none" stroke={color} strokeWidth={1.8} />
    <line x1={8} y1={0} x2={8} y2={8} stroke={color} strokeWidth={1.2} />
  </g>
);
const SvgPhoneIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <path d="M2 1C2 1 0.5 3 4 7C7.5 11 10 10 10 10L11.5 8L9 6L7.5 8C7.5 8 5.5 7 4 5C2.5 3 3 2.5 3 2.5L2 1Z" fill={color} />
  </g>
);
const SvgAlertIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <path d="M7 0L14 12H0Z" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
    <line x1={7} y1={4} x2={7} y2={8} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <circle cx={7} cy={10} r={0.8} fill={color} />
  </g>
);
const SvgEcgIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <polyline points="0,7 4,7 6,1 9,13 11,4 13,7 16,7" fill="none" stroke={color} strokeWidth={1.5} strokeLinejoin="round" />
  </g>
);
const SvgAtrialIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <path d="M2 8 Q5 0 8 4 Q11 8 14 2" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <text x={8} y={14} textAnchor="middle" fill={color} fontSize={5} fontWeight="bold" fontFamily="IBM Plex Sans">AF</text>
  </g>
);
const SvgExamIcon = ({ x, y, color, size = 1 }: { x: number; y: number; color: string; size?: number }) => (
  <g transform={`translate(${x},${y}) scale(${size})`}>
    <circle cx={7} cy={4} r={3.5} fill="none" stroke={color} strokeWidth={1.5} />
    <line x1={7} y1={7.5} x2={7} y2={14} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    <line x1={4} y1={10} x2={10} y2={10} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
  </g>
);

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════════ */
export default function VitalDashboard() {
  const [allData, setAllData] = useState<AllData>(() => generateData());
  const [range, setRange] = useState<Range>(30);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const mousePosRef = useRef<{ cx: number; cy: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [sidePanel, setSidePanel] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [vis, setVis] = useState({ thresholds: true, missed: true });
  const [ecgDrawer, setEcgDrawer] = useState<EcgEvent | null>(null);
  const [ecgZoom, setEcgZoom] = useState(1);
  const [ecgHover, setEcgHover] = useState<{ ecg: EcgEvent; cx: number; cy: number } | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");

  const P = theme === "dark" ? darkPalette : lightPalette;
  const ALARM_COLORS: Record<string, string> = { critical: P.alarmRed, warning: P.alarmYellow, change: P.alarmBlue, info: P.alarmGray };

  const score = useMemo(() => complianceScore(allData, range), [allData, range]);

  const filteredData = useMemo(() => {
    const cutoff = new Date(NOW);
    cutoff.setDate(cutoff.getDate() - range);
    const cs = cutoff.toISOString().split("T")[0];
    return {
      bp: allData.bp.filter(p => p.date >= cs),
      hr: allData.hr.filter(p => p.date >= cs),
      weight: allData.weight.filter(p => p.date >= cs),
      mood: allData.mood.filter(p => p.date >= cs),
      events: allData.events.filter(p => p.date >= cs),
      ecgs: allData.ecgs.filter(p => p.date >= cs),
      missed: allData.missed.filter(d => d >= cs),
    };
  }, [allData, range]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape") { setSidePanel(null); setEcgDrawer(null); }
      if (e.key === "t" && !e.ctrlKey && !e.metaKey) setViewMode(v => v === "chart" ? "table" : "chart");
      if (e.key === "d" && !e.ctrlKey && !e.metaKey) setTheme(t => t === "dark" ? "light" : "dark");
      if (e.key === "1" && !e.ctrlKey && !e.metaKey) setRange(14);
      if (e.key === "2" && !e.ctrlKey && !e.metaKey) setRange(30);
      if (e.key === "3" && !e.ctrlKey && !e.metaKey) setRange(60);
      if (e.key === "4" && !e.ctrlKey && !e.metaKey) setRange(90);
      if (e.key === "g" && !e.ctrlKey && !e.metaKey) setVis(v => ({ ...v, thresholds: !v.thresholds }));
      if (e.key === "m" && !e.ctrlKey && !e.metaKey) setVis(v => ({ ...v, missed: !v.missed }));
      /* r key removed — trends always visible */
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleValidateOutlier = (type: "bp" | "hr" | "weight", date: string) => {
    setAllData(prev => {
      const next = { ...prev };
      if (type === "bp") next.bp = prev.bp.map(p => p.date === date && p.outlier ? { ...p, outlierValidated: !p.outlierValidated } : p);
      else if (type === "hr") next.hr = prev.hr.map(p => p.date === date && p.outlier ? { ...p, outlierValidated: !p.outlierValidated } : p);
      else next.weight = prev.weight.map(p => p.date === date && p.outlier ? { ...p, outlierValidated: !p.outlierValidated } : p);
      return next;
    });
  };

  const xDomain = useMemo(() => {
    const end = NOW;
    const start = new Date(NOW); start.setDate(start.getDate() - range);
    return [start, end] as [Date, Date];
  }, [range]);

  /* Chart dimensions — wider for horizontal scrolling */
  const chartW = range <= 14 ? 1200 : range <= 30 ? 1600 : range <= 60 ? 2400 : 3200;
  const chartH = (type: string) => (expanded === type ? 260 : 160);
  const margin = { top: 28, right: 24, bottom: 28, left: 64 };
  const innerW = chartW - margin.left - margin.right;
  const innerH = (type: string) => chartH(type) - margin.top - margin.bottom;

  const xScale = useMemo(() => d3.scaleTime().domain(xDomain).range([0, innerW]), [xDomain, innerW]);

  const ToggleBtn = ({ label, active, onToggle, shortcut }: { label: string; active: boolean; onToggle: () => void; shortcut?: string }) => (
    <button onClick={onToggle}
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
      style={{
        backgroundColor: active ? (theme === "dark" ? "rgba(63,63,70,0.8)" : "rgba(228,228,231,0.8)") : (theme === "dark" ? "rgba(39,39,42,0.4)" : "rgba(244,244,245,0.5)"),
        color: active ? P.text : P.textMuted,
      }}>
      {active ? <Eye size={16} /> : <EyeOff size={16} />}
      {label}
      {shortcut && <kbd className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ backgroundColor: P.shortcutKey, color: P.shortcutKeyText }}>{shortcut}</kbd>}
    </button>
  );

  /* ─── CHART RENDERER — scrollable, dynamic Y-axis ─── */
  const renderChart = (
    type: string, label: string, icon: React.ReactNode, color: string,
    renderContent: (xS: any, yS: any, iH: number) => React.ReactNode,
    yDomain: [number, number], unit: string,
    thresholds?: { upper?: number; lower?: number }
  ) => {
    const isExpanded = expanded === type;
    const h = chartH(type);
    const iH = innerH(type);
    const yS = d3.scaleLinear().domain(yDomain).range([iH, 0]);
    const ticks = generateYTicks(yDomain, 5);
    const clipId = `clip-${type}`;

    return (
      <div key={type} className="rounded-xl overflow-hidden shadow-sm transition-all" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>{label}</span>
            <span className="text-sm font-normal" style={{ color: P.textMuted }}>{yDomain[0]}–{yDomain[1]} {unit}</span>
          </div>
          <button onClick={() => setExpanded(isExpanded ? null : type)} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}>
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
        {/* Horizontal scroll wrapper */}
        <div className="overflow-x-auto">
          <svg width={chartW} height={h} viewBox={`0 0 ${chartW} ${h}`} style={{ minWidth: chartW }}>
            <defs>
              <clipPath id={clipId}>
                <rect x={0} y={0} width={innerW} height={iH} />
              </clipPath>
            </defs>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {/* Grid */}
              {ticks.map(t => (
                <g key={t}>
                  <line x1={0} x2={innerW} y1={yS(t)} y2={yS(t)} stroke={P.grid} strokeWidth={1} />
                  <text x={-10} y={yS(t)} dy="0.35em" textAnchor="end" fill={P.gridLabel} fontSize={13} fontFamily="IBM Plex Sans">{t}</text>
                </g>
              ))}
              {/* X ticks */}
              {xScale.ticks(range <= 14 ? 14 : range <= 30 ? 30 : range <= 60 ? 30 : 45).map(t => (
                <text key={t.getTime()} x={xScale(t)} y={iH + 20} textAnchor="middle" fill={P.gridLabel} fontSize={12} fontFamily="IBM Plex Sans">
                  {d3.timeFormat("%-d.%-m.")(t)}
                </text>
              ))}
              {/* Thresholds */}
              {vis.thresholds && thresholds?.upper && yDomain[1] >= thresholds.upper && (
                <line x1={0} x2={innerW} y1={yS(thresholds.upper)} y2={yS(thresholds.upper)} stroke={P.threshUpper} strokeWidth={1.2} strokeDasharray="6,4" opacity={0.6} />
              )}
              {vis.thresholds && thresholds?.lower && yDomain[0] <= thresholds.lower && (
                <line x1={0} x2={innerW} y1={yS(thresholds.lower)} y2={yS(thresholds.lower)} stroke={P.threshLower} strokeWidth={1.2} strokeDasharray="6,4" opacity={0.6} />
              )}
              {/* Missed */}
              {vis.missed && filteredData.missed.map(d => {
                const x = xScale(new Date(d));
                return <rect key={d} x={x - 3} y={0} width={6} height={iH} fill={P.missed} opacity={0.15} rx={2} />;
              })}
              {/* Clipped content */}
              <g clipPath={`url(#${clipId})`}>
                {renderContent(xScale, yS, iH)}
              </g>
            </g>
          </svg>
        </div>
      </div>
    );
  };

  const AlarmDot = ({ x, y, alarm }: { x: number; y: number; alarm?: string }) => {
    if (!alarm) return null;
    const c = ALARM_COLORS[alarm] || P.alarmGray;
    return (
      <g>
        <circle cx={x} cy={y - 12} r={5} fill={c} opacity={0.9} />
        <text x={x} y={y - 12} textAnchor="middle" dy="0.35em" fill="white" fontSize={8} fontWeight="bold">!</text>
      </g>
    );
  };

  const OutlierRing = ({ x, y, validated }: { x: number; y: number; validated?: boolean }) => (
    <circle cx={x} cy={y} r={10} fill="none" stroke={P.outlier} strokeWidth={2.5}
      strokeDasharray={validated ? "none" : "4,3"} opacity={0.9} />
  );

  /* ── Multi-measurement count badge ── */
  const CountBadge = ({ x, y, count }: { x: number; y: number; count: number }) => {
    if (count <= 1) return null;
    return (
      <g>
        <circle cx={x + 8} cy={y - 14} r={8} fill={P.bgCard} stroke={P.border} strokeWidth={1} />
        <text x={x + 8} y={y - 14} textAnchor="middle" dy="0.35em" fill={P.textSecondary} fontSize={9} fontWeight="600" fontFamily="IBM Plex Sans">{count}</text>
      </g>
    );
  };

  /* ─── Mouse tracking ─── */
  const handleDataHover = (info: any, e: React.MouseEvent) => {
    setHoverInfo(info);
    mousePosRef.current = { cx: e.clientX, cy: e.clientY };
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 16}px`;
      tooltipRef.current.style.top = `${e.clientY - 16}px`;
      tooltipRef.current.style.display = "block";
    }
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    mousePosRef.current = { cx: e.clientX, cy: e.clientY };
    if (tooltipRef.current) {
      tooltipRef.current.style.left = `${e.clientX + 16}px`;
      tooltipRef.current.style.top = `${e.clientY - 16}px`;
    }
  };
  const handleDataLeave = () => {
    setHoverInfo(null);
    mousePosRef.current = null;
    if (tooltipRef.current) tooltipRef.current.style.display = "none";
  };

  /* ─── BP Chart ─── */
  const bpAllVals = useMemo(() => [...filteredData.bp.map(p => p.systolic), ...filteredData.bp.map(p => p.diastolic)], [filteredData.bp]);
  const bpYDomain = useMemo(() => niceYDomain(bpAllVals, 0.08), [bpAllVals]);
  const bpChart = renderChart("bp", "Blutdruck", <Activity size={18} color={P.bpSystolic} />, P.bpSystolic,
    (xS, yS, iH) => {
      const sysLine = d3.line<BpPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.systolic)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const diaLine = d3.line<BpPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.diastolic)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const medVals = rollingMedian(filteredData.bp.map(p => ({ date: p.date, v: p.systolic })));
      const medLine = d3.line<{ date: string; v: number }>().x(d => xS(new Date(d.date))).y(d => yS(d.v)).curve(d3.curveCatmullRom);

      return (
        <g>
          <path d={sysLine(filteredData.bp) || ""} fill="none" stroke={P.bpSystolic} strokeWidth={2} />
          <path d={diaLine(filteredData.bp) || ""} fill="none" stroke={P.bpDiastolic} strokeWidth={2} />
          <path d={medLine(medVals) || ""} fill="none" stroke={P.median} strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />
          {/* Median hover points */}
          {medVals.map((mv, i) => {
            const x = xS(new Date(mv.date));
            const y = yS(mv.v);
            return (
              <g key={`med-${i}`}
                onMouseEnter={(e) => handleDataHover({ type: "median", date: mv.date, label: "Median Systolisch", value: mv.v, unit: "mmHg" }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}>
                <circle cx={x} cy={y} r={8} fill="transparent" className="cursor-crosshair" />
              </g>
            );
          })}
          {filteredData.bp.map((p, i) => {
            const x = xS(new Date(p.date));
            const ySys = yS(p.systolic);
            const yDia = yS(p.diastolic);
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "bp", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "bp", date: p.date, data: p })}
                className="cursor-pointer">
                <rect x={x - 10} y={Math.min(ySys, yDia) - 10} width={20} height={Math.abs(yDia - ySys) + 20} fill="transparent" />
                <polygon points={`${x},${ySys - 6} ${x - 5},${ySys + 4} ${x + 5},${ySys + 4}`} fill={P.bpSystolic} />
                <polygon points={`${x},${yDia + 6} ${x - 5},${yDia - 4} ${x + 5},${yDia - 4}`} fill={P.bpDiastolic} />
                <line x1={x} y1={ySys + 4} x2={x} y2={yDia - 4} stroke={P.bpSystolic} strokeWidth={1} opacity={0.3} />
                {p.alarm && <AlarmDot x={x} y={ySys - 6} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={ySys} validated={p.outlierValidated} />}
                <CountBadge x={x} y={ySys - 6} count={p.readings.length} />
              </g>
            );
          })}
          {filteredData.bp.length > 7 && (() => {
            const trend = detectTrend(filteredData.bp.map(p => p.systolic));
            const last = filteredData.bp[filteredData.bp.length - 1];
            if (trend === "stable") return null;
            return <g transform={`translate(${xS(new Date(last.date)) + 12},${yS(last.systolic) - 10})`}><SvgTrendArrow trend={trend} color={trend === "up" ? P.danger : P.good} /></g>;
          })()}
        </g>
      );
    },
    bpYDomain, "mmHg", { upper: 140, lower: 90 }
  );

  /* ─── HR Chart ─── */
  const hrYDomain = useMemo(() => niceYDomain(filteredData.hr.map(p => p.value), 0.1), [filteredData.hr]);
  const hrChart = renderChart("hr", "Herzfrequenz", <Heart size={18} color={P.heartRate} />, P.heartRate,
    (xS, yS, iH) => {
      const line = d3.line<HrPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.value)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const medVals = rollingMedian(filteredData.hr.map(p => ({ date: p.date, v: p.value })));
      const medLine = d3.line<{ date: string; v: number }>().x(d => xS(new Date(d.date))).y(d => yS(d.v)).curve(d3.curveCatmullRom);

      return (
        <g>
          <path d={line(filteredData.hr) || ""} fill="none" stroke={P.heartRate} strokeWidth={2} />
          <path d={medLine(medVals) || ""} fill="none" stroke={P.median} strokeWidth={1} strokeDasharray="4,4" opacity={0.5} />
          {/* Median hover points */}
          {medVals.map((mv, i) => {
            const x = xS(new Date(mv.date));
            const y = yS(mv.v);
            return (
              <g key={`med-${i}`}
                onMouseEnter={(e) => handleDataHover({ type: "median", date: mv.date, label: "Median Herzfrequenz", value: mv.v, unit: "bpm" }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}>
                <circle cx={x} cy={y} r={8} fill="transparent" className="cursor-crosshair" />
              </g>
            );
          })}
          {filteredData.hr.map((p, i) => {
            const x = xS(new Date(p.date));
            const y = yS(p.value);
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "hr", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "hr", date: p.date, data: p })}
                className="cursor-pointer">
                <circle cx={x} cy={y} r={10} fill="transparent" />
                <polygon points={`${x - 5},${y} ${x},${y - 5} ${x + 5},${y} ${x},${y + 5}`} fill={P.heartRate} />
                {p.alarm && <AlarmDot x={x} y={y - 5} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={y} validated={p.outlierValidated} />}
                <CountBadge x={x} y={y - 5} count={p.readings.length} />
              </g>
            );
          })}
          {filteredData.hr.length > 7 && (() => {
            const trend = detectTrend(filteredData.hr.map(p => p.value));
            const last = filteredData.hr[filteredData.hr.length - 1];
            if (trend === "stable") return null;
            return <g transform={`translate(${xS(new Date(last.date)) + 12},${yS(last.value) - 10})`}><SvgTrendArrow trend={trend} color={trend === "up" ? P.warning : P.good} /></g>;
          })()}
        </g>
      );
    },
    hrYDomain, "bpm", { upper: 100, lower: 60 }
  );

  /* ─── Weight Chart ─── */
  const wYDomain = useMemo(() => niceYDomain(filteredData.weight.map(p => p.value), 0.12), [filteredData.weight]);
  const weightChart = renderChart("weight", "Gewicht", <Weight size={18} color={P.weight} />, P.weight,
    (xS, yS, iH) => {
      const line = d3.line<WeightPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.value)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);

      return (
        <g>
          <path d={line(filteredData.weight) || ""} fill="none" stroke={P.weight} strokeWidth={2} />
          {filteredData.weight.map((p, i) => {
            const x = xS(new Date(p.date));
            const y = yS(p.value);
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "weight", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "weight", date: p.date, data: p })}
                className="cursor-pointer">
                <circle cx={x} cy={y} r={10} fill="transparent" />
                <circle cx={x} cy={y} r={4} fill={P.weight} />
                {p.alarm && <AlarmDot x={x} y={y} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={y} validated={p.outlierValidated} />}
                <CountBadge x={x} y={y} count={p.readings.length} />
              </g>
            );
          })}
        </g>
      );
    },
    wYDomain, "kg", { upper: wYDomain[1] - 2, lower: wYDomain[0] + 2 }
  );

  /* ─── Mood Chart ─── */
  const moodChart = renderChart("mood", "Stimmung", <Smile size={18} color={P.mood} />, P.mood,
    (xS, yS, iH) => (
      <g>
        {filteredData.mood.map((p, i) => {
          const x = xS(new Date(p.date));
          const y = yS(p.value);
          return (
            <g key={i}
              onMouseEnter={(e) => handleDataHover({ type: "mood", ...p }, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleDataLeave}
              onClick={() => setSidePanel({ type: "mood", date: p.date, data: p })}
              className="cursor-pointer">
              <circle cx={x} cy={y} r={10} fill="transparent" />
              <rect x={x - 4} y={y - 4} width={8} height={8} fill={P.mood} rx={1.5} />
            </g>
          );
        })}
      </g>
    ),
    [0.5, 5.5], "", undefined
  );

  /* ─── ECG Timeline ─── */
  const ecgTimelineH = 52;
  const ecgTimeline = (
    <div className="rounded-xl overflow-visible relative shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
        <div className="flex items-center gap-3">
          <FileHeart size={18} color={P.ecg} />
          <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>EKG-Aufzeichnungen</span>
          <span className="text-sm" style={{ color: P.textMuted }}>Hover = Vorschau · Klick = Detail</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <svg width={chartW} height={ecgTimelineH} viewBox={`0 0 ${chartW} ${ecgTimelineH}`} style={{ minWidth: chartW }}>
          <g transform={`translate(${margin.left},8)`}>
            <line x1={0} x2={innerW} y1={18} y2={18} stroke={P.grid} strokeWidth={1} />
            {filteredData.ecgs.map((ecg, i) => {
              const x = xScale(new Date(ecg.date));
              const color = ecg.alarm ? ALARM_COLORS[ecg.alarm] : P.ecg;
              const abSize = ecg.atrialBurden ? Math.min(12, 4 + ecg.atrialBurden / 4) : 6;
              return (
                <g key={i}
                  onMouseEnter={(e) => setEcgHover({ ecg, cx: e.clientX, cy: e.clientY })}
                  onMouseMove={(e) => setEcgHover(prev => prev ? { ...prev, cx: e.clientX, cy: e.clientY } : null)}
                  onMouseLeave={() => setEcgHover(null)}
                  onClick={() => setEcgDrawer(ecg)}
                  className="cursor-pointer">
                  <circle cx={x} cy={18} r={abSize + 5} fill="transparent" />
                  <circle cx={x} cy={18} r={abSize} fill={color} opacity={0.8} />
                  {ecg.atrialBurden && ecg.atrialBurden > 10 && (
                    <text x={x} y={18} textAnchor="middle" dy="0.35em" fill="white" fontSize={8} fontWeight="bold">
                      {ecg.atrialBurden}%
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      {ecgHover && ecgHover.ecg.waveform && (
        <div className="fixed z-[200] rounded-xl p-4 shadow-2xl pointer-events-none"
          style={{ left: ecgHover.cx + 16, top: ecgHover.cy - 80, backgroundColor: P.bgPanel, border: `1px solid ${P.borderStrong}`, backdropFilter: "blur(8px)" }}>
          <div className="text-sm mb-1 font-medium" style={{ color: P.textSecondary }}>{ecgHover.ecg.date} {ecgHover.ecg.time} · {ecgHover.ecg.duration}s</div>
          {ecgHover.ecg.atrialBurden !== undefined && ecgHover.ecg.atrialBurden > 0 && (
            <div className="text-sm mb-1" style={{ color: ecgHover.ecg.atrialBurden > 15 ? P.atrialHigh : ecgHover.ecg.atrialBurden > 5 ? P.atrialMod : P.atrialLow }}>
              Atrial Burden: {ecgHover.ecg.atrialBurden}% {ecgHover.ecg.atrialUncertain ? "(unsicher)" : ""}
            </div>
          )}
          <svg width={280} height={60}>
            <path d={ecgHover.ecg.waveform!.slice(0, 700).map((v, j) => `${j === 0 ? "M" : "L"}${j * 0.4},${30 - v * 20}`).join(" ")} fill="none" stroke={P.ecg} strokeWidth={1.2} />
          </svg>
        </div>
      )}
    </div>
  );

  /* ─── Events Row — with x-axis dates, no badges ─── */
  const eventsH = 96;
  const eventsInnerH = eventsH - margin.top - 20;
  const nonEcgEvents = filteredData.events;
  const alarmEcgAsEvents = filteredData.ecgs.filter(e => e.alarm);

  const eventsRow = (
    <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
      <div className="flex items-center gap-3 px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
        <ShieldAlert size={18} color={P.alert} />
        <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>Ereignisse</span>
        <span className="text-sm" style={{ color: P.textMuted }}>{nonEcgEvents.length + alarmEcgAsEvents.length} Einträge</span>
      </div>
      <div className="overflow-x-auto">
        <svg width={chartW} height={eventsH} viewBox={`0 0 ${chartW} ${eventsH}`} style={{ minWidth: chartW }}>
          <g transform={`translate(${margin.left},12)`}>
            <line x1={0} x2={innerW} y1={eventsInnerH / 2} y2={eventsInnerH / 2} stroke={P.grid} strokeWidth={1} />
            {/* X-axis date labels */}
            {xScale.ticks(range <= 14 ? 14 : range <= 30 ? 30 : range <= 60 ? 30 : 45).map(t => (
              <text key={t.getTime()} x={xScale(t)} y={eventsInnerH + 16} textAnchor="middle" fill={P.gridLabel} fontSize={12} fontFamily="IBM Plex Sans">
                {d3.timeFormat("%-d.%-m.")(t)}
              </text>
            ))}
            {nonEcgEvents.map((ev, i) => {
              const x = xScale(new Date(ev.date));
              const iconColor = ev.alarm ? ALARM_COLORS[ev.alarm] : P.alarmGray;
              const yOff = (i % 3) * 14;
              return (
                <g key={`ev-${i}`}
                  onClick={() => setSidePanel({ type: "event", date: ev.date, data: ev })}
                  onMouseEnter={(e) => handleDataHover({ type: "event", ...ev }, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleDataLeave}
                  className="cursor-pointer">
                  {ev.type === "medication" && <SvgPillIcon x={x - 8} y={6 + yOff} color={P.medication} size={1.2} />}
                  {ev.type === "call" && <SvgPhoneIcon x={x - 8} y={6 + yOff} color={P.call} size={1.3} />}
                  {ev.type === "alert" && <SvgAlertIcon x={x - 8} y={4 + yOff} color={iconColor} size={1.2} />}
                  {ev.type === "examination" && <SvgExamIcon x={x - 8} y={4 + yOff} color={P.examination} size={1.2} />}
                  {ev.type === "atrialBurden" && <SvgAtrialIcon x={x - 8} y={4 + yOff} color={iconColor} size={1.2} />}
                </g>
              );
            })}
            {alarmEcgAsEvents.map((ecg, i) => {
              const x = xScale(new Date(ecg.date));
              return (
                <g key={`ecg-ev-${i}`} onClick={() => setEcgDrawer(ecg)} className="cursor-pointer">
                  <SvgEcgIcon x={x - 8} y={eventsInnerH - 8} color={ALARM_COLORS[ecg.alarm!]} size={1.2} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
    </div>
  );

  /* ─── Tooltip ─── */
  const tooltip = hoverInfo && (
    <div ref={tooltipRef} className="fixed z-[100] pointer-events-none rounded-xl px-5 py-3 shadow-2xl"
      style={{
        left: mousePosRef.current ? mousePosRef.current.cx + 16 : -9999,
        top: mousePosRef.current ? mousePosRef.current.cy - 16 : -9999,
        maxWidth: 380,
        backgroundColor: theme === "dark" ? "rgba(39,39,42,0.95)" : "rgba(255,255,255,0.95)",
        border: `1px solid ${P.borderStrong}`,
        backdropFilter: "blur(8px)",
      }}>
      <div className="text-sm mb-1" style={{ color: P.textMuted }}>{hoverInfo.date}</div>
      {hoverInfo.type === "bp" && (
        <div>
          <div className="text-lg font-semibold">
            <span style={{ color: P.bpSystolic }}>{hoverInfo.systolic}</span>
            <span style={{ color: P.textDim }}>/</span>
            <span style={{ color: P.bpDiastolic }}>{hoverInfo.diastolic}</span>
            <span className="text-sm font-normal ml-1" style={{ color: P.textMuted }}>mmHg</span>
          </div>
          {hoverInfo.readings && hoverInfo.readings.length > 1 && (
            <div className="text-sm mt-1" style={{ color: P.textMuted }}>{hoverInfo.readings.length} Messungen (Ø angezeigt)</div>
          )}
        </div>
      )}
      {hoverInfo.type === "hr" && (
        <div>
          <span className="text-lg font-semibold" style={{ color: P.heartRate }}>{hoverInfo.value}</span>
          <span className="text-sm ml-1" style={{ color: P.textMuted }}>bpm</span>
          {hoverInfo.readings && hoverInfo.readings.length > 1 && (
            <div className="text-sm mt-1" style={{ color: P.textMuted }}>{hoverInfo.readings.length} Messungen</div>
          )}
        </div>
      )}
      {hoverInfo.type === "weight" && (
        <div>
          <span className="text-lg font-semibold" style={{ color: P.weight }}>{hoverInfo.value}</span>
          <span className="text-sm ml-1" style={{ color: P.textMuted }}>kg</span>
          {hoverInfo.readings && hoverInfo.readings.length > 1 && (
            <div className="text-sm mt-1" style={{ color: P.textMuted }}>{hoverInfo.readings.length} Messungen</div>
          )}
        </div>
      )}
      {hoverInfo.type === "mood" && <div><span className="text-lg font-semibold" style={{ color: P.mood }}>{hoverInfo.value}/5</span></div>}
      {hoverInfo.type === "median" && (
        <div>
          <div className="text-xs uppercase tracking-wider font-semibold mb-0.5" style={{ color: P.median }}>7-Tage Median</div>
          <div className="text-sm font-medium" style={{ color: P.textSecondary }}>{hoverInfo.label}</div>
          <span className="text-lg font-semibold" style={{ color: P.median }}>{hoverInfo.value}</span>
          <span className="text-sm ml-1" style={{ color: P.textMuted }}>{hoverInfo.unit}</span>
        </div>
      )}
      {hoverInfo.type === "event" && (
        <div>
          <div className="text-base font-medium" style={{ color: P.text }}>{hoverInfo.label}</div>
          {hoverInfo.acknowledgedBy && <div className="text-sm mt-1" style={{ color: P.textMuted }}>Bestätigt: {hoverInfo.acknowledgedBy}</div>}
        </div>
      )}
      {hoverInfo.alarm && <div className="mt-1 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: ALARM_COLORS[hoverInfo.alarm] }} /><span className="text-sm">{ALARM_LABELS[hoverInfo.alarm]}</span></div>}
      {hoverInfo.outlier && <div className="mt-1 text-sm" style={{ color: P.outlier }}>Ausreißer {hoverInfo.outlierValidated ? "(validiert)" : "(prüfen)"}</div>}
    </div>
  );

  /* ─── Side Panel ─── */
  const sidePanelEl = sidePanel && (
    <div className="fixed right-0 top-0 h-full w-full sm:w-[440px] z-50 overflow-y-auto shadow-2xl"
      style={{ backgroundColor: P.bgPanel, borderLeft: `1px solid ${P.border}`, backdropFilter: "blur(12px)" }}>
      <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${P.border}` }}>
        <h3 className="text-lg font-semibold tracking-tight" style={{ color: P.text }}>Tagesdetail — {sidePanel.date}</h3>
        <button onClick={() => setSidePanel(null)} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}><X size={20} /></button>
      </div>
      <div className="p-5 space-y-4">
        {(() => {
          const dayBp = allData.bp.find(p => p.date === sidePanel.date);
          const dayHr = allData.hr.find(p => p.date === sidePanel.date);
          const dayW = allData.weight.find(p => p.date === sidePanel.date);
          const dayM = allData.mood.find(p => p.date === sidePanel.date);
          const dayEvts = allData.events.filter(p => p.date === sidePanel.date);
          const dayEcgs = allData.ecgs.filter(p => p.date === sidePanel.date);

          const bpTrend = detectTrend(filteredData.bp.map(p => p.systolic));
          const hrTrend = detectTrend(filteredData.hr.map(p => p.value));
          const wTrend = detectTrend(filteredData.weight.map(p => p.value));
          const avgSys = filteredData.bp.length > 0 ? Math.round(filteredData.bp.reduce((s, p) => s + p.systolic, 0) / filteredData.bp.length) : 0;
          const avgDia = filteredData.bp.length > 0 ? Math.round(filteredData.bp.reduce((s, p) => s + p.diastolic, 0) / filteredData.bp.length) : 0;
          const avgHr = filteredData.hr.length > 0 ? Math.round(filteredData.hr.reduce((s, p) => s + p.value, 0) / filteredData.hr.length) : 0;
          const avgWt = filteredData.weight.length > 0 ? Math.round(filteredData.weight.reduce((s, p) => s + p.value, 0) / filteredData.weight.length * 10) / 10 : 0;

          return (
            <>
              {dayBp && (
                <div className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Activity size={16} color={P.bpSystolic} /><span className="text-base font-medium" style={{ color: P.text }}>Blutdruck</span></div>
                    {dayBp.alarm && <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[dayBp.alarm], color: "white" }}>{ALARM_LABELS[dayBp.alarm]}</span>}
                  </div>
                  <div className="text-2xl font-bold mt-2" style={{ color: P.bpSystolic }}>{dayBp.systolic}/{dayBp.diastolic} <span className="text-sm font-normal" style={{ color: P.textMuted }}>mmHg</span></div>
                  {dayBp.readings.length > 1 && (
                    <div className="mt-2 space-y-1">
                      <div className="text-sm font-medium" style={{ color: P.textMuted }}>{dayBp.readings.length} Messungen:</div>
                      {dayBp.readings.map((r, ri) => (
                        <div key={ri} className="text-sm" style={{ color: P.textSecondary }}>{r.time} — {r.systolic}/{r.diastolic} mmHg</div>
                      ))}
                    </div>
                  )}
                  {dayBp.outlier && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm" style={{ color: P.outlier }}>Ausreißer</span>
                      <button onClick={() => handleValidateOutlier("bp", sidePanel.date)}
                        className="text-sm px-3 py-1 rounded-lg transition-colors"
                        style={{ backgroundColor: dayBp.outlierValidated ? "rgba(34,197,94,0.15)" : P.bgInput, color: dayBp.outlierValidated ? P.good : P.textSecondary }}>
                        {dayBp.outlierValidated ? <><RotateCcw size={12} className="inline mr-1" />Revidieren</> : <><CheckCircle size={12} className="inline mr-1" />Messpunkt valide</>}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {dayHr && (
                <div className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Heart size={16} color={P.heartRate} /><span className="text-base font-medium" style={{ color: P.text }}>Herzfrequenz</span></div>
                    {dayHr.alarm && <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[dayHr.alarm], color: "white" }}>{ALARM_LABELS[dayHr.alarm]}</span>}
                  </div>
                  <div className="text-2xl font-bold mt-2" style={{ color: P.heartRate }}>{dayHr.value} <span className="text-sm font-normal" style={{ color: P.textMuted }}>bpm</span></div>
                  {dayHr.readings.length > 1 && (
                    <div className="mt-2 space-y-1">
                      <div className="text-sm font-medium" style={{ color: P.textMuted }}>{dayHr.readings.length} Messungen:</div>
                      {dayHr.readings.map((r, ri) => (
                        <div key={ri} className="text-sm" style={{ color: P.textSecondary }}>{r.time} — {r.value} bpm</div>
                      ))}
                    </div>
                  )}
                  {dayHr.outlier && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm" style={{ color: P.outlier }}>Ausreißer</span>
                      <button onClick={() => handleValidateOutlier("hr", sidePanel.date)}
                        className="text-sm px-3 py-1 rounded-lg transition-colors"
                        style={{ backgroundColor: dayHr.outlierValidated ? "rgba(34,197,94,0.15)" : P.bgInput, color: dayHr.outlierValidated ? P.good : P.textSecondary }}>
                        {dayHr.outlierValidated ? <><RotateCcw size={12} className="inline mr-1" />Revidieren</> : <><CheckCircle size={12} className="inline mr-1" />Messpunkt valide</>}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {dayW && (
                <div className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2"><Weight size={16} color={P.weight} /><span className="text-base font-medium" style={{ color: P.text }}>Gewicht</span></div>
                    {dayW.alarm && <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[dayW.alarm], color: "white" }}>{ALARM_LABELS[dayW.alarm]}</span>}
                  </div>
                  <div className="text-2xl font-bold mt-2" style={{ color: P.weight }}>{dayW.value} <span className="text-sm font-normal" style={{ color: P.textMuted }}>kg</span></div>
                  {dayW.readings.length > 1 && (
                    <div className="mt-2 space-y-1">
                      <div className="text-sm font-medium" style={{ color: P.textMuted }}>{dayW.readings.length} Messungen:</div>
                      {dayW.readings.map((r, ri) => (
                        <div key={ri} className="text-sm" style={{ color: P.textSecondary }}>{r.time} — {r.value} kg</div>
                      ))}
                    </div>
                  )}
                  {dayW.outlier && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm" style={{ color: P.outlier }}>Ausreißer</span>
                      <button onClick={() => handleValidateOutlier("weight", sidePanel.date)}
                        className="text-sm px-3 py-1 rounded-lg transition-colors"
                        style={{ backgroundColor: dayW.outlierValidated ? "rgba(34,197,94,0.15)" : P.bgInput, color: dayW.outlierValidated ? P.good : P.textSecondary }}>
                        {dayW.outlierValidated ? <><RotateCcw size={12} className="inline mr-1" />Revidieren</> : <><CheckCircle size={12} className="inline mr-1" />Messpunkt valide</>}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {dayM && (
                <div className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                  <div className="flex items-center gap-2"><Smile size={16} color={P.mood} /><span className="text-base font-medium" style={{ color: P.text }}>Stimmung</span></div>
                  <div className="text-2xl font-bold mt-2" style={{ color: P.mood }}>{dayM.value}/5</div>
                </div>
              )}
              {dayEvts.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: P.textMuted }}>Ereignisse</div>
                  {dayEvts.map((ev, i) => (
                    <div key={i} className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {ev.alarm && <span className="w-3 h-3 rounded-full" style={{ backgroundColor: ALARM_COLORS[ev.alarm] }} />}
                          <span className="text-sm" style={{ color: P.text }}>{ev.label}</span>
                        </div>
                        {ev.linkedId && <button style={{ color: P.textMuted }}><ExternalLink size={14} /></button>}
                      </div>
                      {ev.acknowledgedBy && (
                        <div className="text-sm mt-1" style={{ color: P.textMuted }}>
                          Bestätigt von {ev.acknowledgedBy} {ev.acknowledgedAt && `am ${new Date(ev.acknowledgedAt).toLocaleDateString("de")}`}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {dayEcgs.length > 0 && (
                <div className="space-y-2">
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: P.textMuted }}>EKG-Aufzeichnungen</div>
                  {dayEcgs.map((ecg, i) => (
                    <div key={i} className="rounded-lg p-4 cursor-pointer transition-colors" style={{ backgroundColor: P.bgCardHover }} onClick={() => { setSidePanel(null); setEcgDrawer(ecg); }}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm" style={{ color: P.text }}>{ecg.time} · {ecg.duration}s</span>
                        {ecg.alarm && <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[ecg.alarm], color: "white" }}>{ALARM_LABELS[ecg.alarm]}</span>}
                      </div>
                      {ecg.atrialBurden !== undefined && ecg.atrialBurden > 0 && (
                        <div className="text-sm mt-1" style={{ color: ecg.atrialBurden > 15 ? P.atrialHigh : ecg.atrialBurden > 5 ? P.atrialMod : P.atrialLow }}>
                          Atrial Burden: {ecg.atrialBurden}%
                        </div>
                      )}
                      {ecg.acknowledgedBy && <div className="text-sm mt-1" style={{ color: P.textMuted }}>Bestätigt: {ecg.acknowledgedBy}</div>}
                    </div>
                  ))}
                </div>
              )}
              {/* Trend section */}
              <div className="rounded-lg p-4 space-y-3" style={{ backgroundColor: theme === "dark" ? "rgba(39,39,42,0.3)" : "rgba(244,244,245,0.5)" }}>
                <div className="text-sm font-medium uppercase tracking-wider" style={{ color: P.textMuted }}>Trend — {range} Tage</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Activity size={14} color={P.bpSystolic} /><span className="text-sm" style={{ color: P.textSecondary }}>Blutdruck</span></div>
                  <div className="flex items-center gap-2"><span className="text-sm" style={{ color: P.textMuted }}>Ø {avgSys}/{avgDia}</span><TrendIcon trend={bpTrend} color={bpTrend === "up" ? P.danger : bpTrend === "down" ? P.good : P.textMuted} /></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Heart size={14} color={P.heartRate} /><span className="text-sm" style={{ color: P.textSecondary }}>Herzfrequenz</span></div>
                  <div className="flex items-center gap-2"><span className="text-sm" style={{ color: P.textMuted }}>Ø {avgHr} bpm</span><TrendIcon trend={hrTrend} color={hrTrend === "up" ? P.warning : hrTrend === "down" ? P.good : P.textMuted} /></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><Weight size={14} color={P.weight} /><span className="text-sm" style={{ color: P.textSecondary }}>Gewicht</span></div>
                  <div className="flex items-center gap-2"><span className="text-sm" style={{ color: P.textMuted }}>Ø {avgWt} kg</span><TrendIcon trend={wTrend} color={wTrend === "up" ? P.warning : wTrend === "down" ? P.good : P.textMuted} /></div>
                </div>
                <div className="flex items-center justify-between pt-2" style={{ borderTop: `1px solid ${P.borderStrong}` }}>
                  <span className="text-sm" style={{ color: P.textSecondary }}>Compliance</span>
                  <span className="text-sm font-semibold" style={{ color: score >= 80 ? P.good : score >= 50 ? P.warning : P.danger }}>{score}%</span>
                </div>
              </div>
            </>
          );
        })()}
      </div>
    </div>
  );

  /* ─── ECG Drawer — animated, with grid paper + meta info + timeline ─── */
  const [ecgDrawerVisible, setEcgDrawerVisible] = useState(false);
  useEffect(() => {
    if (ecgDrawer) {
      requestAnimationFrame(() => setEcgDrawerVisible(true));
    } else {
      setEcgDrawerVisible(false);
    }
  }, [ecgDrawer]);

  const closeEcgDrawer = () => {
    setEcgDrawerVisible(false);
    setTimeout(() => { setEcgDrawer(null); setEcgZoom(1); }, 300);
  };

  const ecgGridColor = theme === "dark" ? "rgba(44,201,144,0.08)" : "rgba(22,163,74,0.08)";
  const ecgGridStrongColor = theme === "dark" ? "rgba(44,201,144,0.18)" : "rgba(22,163,74,0.18)";
  const ecgNoiseLevel = ecgDrawer ? (ecgDrawer.atrialBurden && ecgDrawer.atrialBurden > 15 ? "Hoch" : ecgDrawer.atrialBurden && ecgDrawer.atrialBurden > 5 ? "Mittel" : "Niedrig") : "—";

  // ECG drawer timeline position
  const [ecgTimelinePos, setEcgTimelinePos] = useState(0);

  const ecgDrawerEl = ecgDrawer && ecgDrawer.waveform && (
    <div className="fixed bottom-10 left-0 right-0 z-50 shadow-2xl transition-transform duration-300 ease-out"
      style={{
        height: "380px",
        backgroundColor: P.bgPanel,
        borderTop: `1px solid ${P.borderStrong}`,
        backdropFilter: "blur(12px)",
        transform: ecgDrawerVisible ? "translateY(0)" : "translateY(100%)",
      }}>
      {/* Header with meta info */}
      <div className="flex flex-wrap items-center justify-between px-6 py-3 gap-3" style={{ borderBottom: `1px solid ${P.border}` }}>
        <div className="flex items-center gap-3 flex-wrap">
          <FileHeart size={20} color={P.ecg} />
          <span className="text-lg font-semibold tracking-tight" style={{ color: P.text }}>EKG — {ecgDrawer.date} {ecgDrawer.time}</span>
          {ecgDrawer.alarm && <span className="text-sm px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[ecgDrawer.alarm], color: "white" }}>{ALARM_LABELS[ecgDrawer.alarm]}</span>}
          {ecgDrawer.atrialBurden !== undefined && ecgDrawer.atrialBurden > 0 && (
            <span className="text-sm font-semibold" style={{ color: ecgDrawer.atrialBurden > 15 ? P.atrialHigh : P.atrialMod }}>AF: {ecgDrawer.atrialBurden}%</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setEcgZoom(z => Math.max(0.5, z - 0.25))} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}><ZoomOut size={18} /></button>
          <span className="text-sm font-mono" style={{ color: P.textMuted }}>{Math.round(ecgZoom * 100)}%</span>
          <button onClick={() => setEcgZoom(z => Math.min(4, z + 0.25))} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}><ZoomIn size={18} /></button>
          <button onClick={closeEcgDrawer} className="ml-2 p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}><X size={18} /></button>
        </div>
      </div>

      {/* Meta info bar */}
      <div className="flex items-center gap-5 px-6 py-2 text-sm" style={{ borderBottom: `1px solid ${P.border}`, backgroundColor: theme === "dark" ? "rgba(39,39,42,0.3)" : "rgba(244,244,245,0.3)" }}>
        <div className="flex items-center gap-1.5">
          <Clock size={13} style={{ color: P.textMuted }} />
          <span style={{ color: P.textMuted }}>Dauer:</span>
          <span className="font-semibold" style={{ color: P.text }}>{ecgDrawer.duration}s</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu size={13} style={{ color: P.textMuted }} />
          <span style={{ color: P.textMuted }}>Gerät:</span>
          <span className="font-semibold" style={{ color: P.text }}>Biotronik Rivacor 7 VR-T DX</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Activity size={13} style={{ color: P.textMuted }} />
          <span style={{ color: P.textMuted }}>Noise:</span>
          <span className="font-semibold" style={{ color: ecgNoiseLevel === "Hoch" ? P.danger : ecgNoiseLevel === "Mittel" ? P.warning : P.good }}>{ecgNoiseLevel}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span style={{ color: P.textMuted }}>Abtastrate:</span>
          <span className="font-semibold" style={{ color: P.text }}>250 Hz</span>
        </div>
        {ecgDrawer.acknowledgedBy && (
          <div className="flex items-center gap-1.5">
            <CheckCircle size={13} style={{ color: P.good }} />
            <span style={{ color: P.textMuted }}>Bestätigt:</span>
            <span className="font-semibold" style={{ color: P.text }}>{ecgDrawer.acknowledgedBy}</span>
          </div>
        )}
      </div>

      {/* ECG waveform with grid paper */}
      <div className="overflow-x-auto px-5 py-2" style={{ height: "240px" }}
        onScroll={(e) => {
          const el = e.currentTarget;
          const pct = el.scrollLeft / (el.scrollWidth - el.clientWidth || 1);
          setEcgTimelinePos(pct);
        }}>
        {(() => {
          const svgW = Math.max(1100, ecgDrawer.waveform.length * 0.4 * ecgZoom);
          const svgH = 220;
          const smallStep = 10; // small grid squares
          const bigStep = 50;  // large grid squares (5 small = 1 big)
          return (
            <svg width={svgW} height={svgH}>
              {/* ECG grid paper — small squares */}
              {Array.from({ length: Math.ceil(svgW / smallStep) + 1 }, (_, i) => (
                <line key={`gv-${i}`} x1={i * smallStep} y1={0} x2={i * smallStep} y2={svgH} stroke={ecgGridColor} strokeWidth={0.5} />
              ))}
              {Array.from({ length: Math.ceil(svgH / smallStep) + 1 }, (_, i) => (
                <line key={`gh-${i}`} x1={0} y1={i * smallStep} x2={svgW} y2={i * smallStep} stroke={ecgGridColor} strokeWidth={0.5} />
              ))}
              {/* ECG grid paper — big squares */}
              {Array.from({ length: Math.ceil(svgW / bigStep) + 1 }, (_, i) => (
                <line key={`gbv-${i}`} x1={i * bigStep} y1={0} x2={i * bigStep} y2={svgH} stroke={ecgGridStrongColor} strokeWidth={1} />
              ))}
              {Array.from({ length: Math.ceil(svgH / bigStep) + 1 }, (_, i) => (
                <line key={`gbh-${i}`} x1={0} y1={i * bigStep} x2={svgW} y2={i * bigStep} stroke={ecgGridStrongColor} strokeWidth={1} />
              ))}
              {/* ECG waveform */}
              <path d={ecgDrawer.waveform.map((v, j) => `${j === 0 ? "M" : "L"}${j * 0.4 * ecgZoom},${110 - v * 65}`).join(" ")} fill="none" stroke={P.ecg} strokeWidth={1.5} />
            </svg>
          );
        })()}
      </div>

      {/* Timeline scrubber below ECG */}
      <div className="px-6 py-1.5 flex items-center gap-3" style={{ borderTop: `1px solid ${P.border}` }}>
        <span className="text-xs font-mono" style={{ color: P.textMuted }}>0s</span>
        <div className="flex-1 h-2 rounded-full relative" style={{ backgroundColor: theme === "dark" ? "rgba(39,39,42,0.6)" : "rgba(228,228,231,0.6)" }}>
          <div className="absolute top-0 left-0 h-full rounded-full transition-all" style={{ width: `${Math.max(5, ecgTimelinePos * 100)}%`, backgroundColor: P.ecg, opacity: 0.6 }} />
          <div className="absolute top-[-2px] h-3 w-3 rounded-full shadow-sm transition-all" style={{ left: `${ecgTimelinePos * 100}%`, backgroundColor: P.ecg, border: `2px solid ${P.bgPanel}` }} />
        </div>
        <span className="text-xs font-mono" style={{ color: P.textMuted }}>{ecgDrawer.duration}s</span>
      </div>
    </div>
  );

  /* ─── Table View ─── */
  const tableView = (
    <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
        <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>Tabellenansicht</span>
        <div className="flex gap-2">
          <button onClick={() => {
            const rows = [["Datum", "Sys (mmHg)", "Dia (mmHg)", "HR (bpm)", "Gewicht (kg)", "Stimmung", "Messungen", "Alarm"]];
            filteredData.bp.forEach(bp => {
              const hr = filteredData.hr.find(h => h.date === bp.date);
              const w = filteredData.weight.find(wt => wt.date === bp.date);
              const m = filteredData.mood.find(mo => mo.date === bp.date);
              rows.push([bp.date, String(bp.systolic), String(bp.diastolic), hr ? String(hr.value) : "", w ? String(w.value) : "", m ? String(m.value) : "", String(bp.readings.length), bp.alarm || ""]);
            });
            const csv = rows.map(r => r.join(";")).join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a"); a.href = url; a.download = "vital-daten.csv"; a.click();
            URL.revokeObjectURL(url);
          }} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
            <Download size={14} /> CSV
          </button>
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors"
            style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
            <Download size={14} /> PDF
          </button>
        </div>
      </div>
      <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0" style={{ backgroundColor: P.bgCard }}>
            <tr style={{ borderBottom: `1px solid ${P.border}` }}>
              <th className="text-left px-4 py-3 font-medium" style={{ color: P.textMuted }}>Datum</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>Sys</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>Dia</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>HR</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>Gewicht</th>
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>Stimmung</th>
              <th className="text-center px-4 py-3 font-medium" style={{ color: P.textMuted }}>Mess.</th>
              <th className="text-center px-4 py-3 font-medium" style={{ color: P.textMuted }}>Alarm</th>
              <th className="text-center px-4 py-3 font-medium" style={{ color: P.textMuted }}>Outlier</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.bp.map((bp, i) => {
              const hr = filteredData.hr.find(h => h.date === bp.date);
              const w = filteredData.weight.find(wt => wt.date === bp.date);
              const m = filteredData.mood.find(mo => mo.date === bp.date);
              const highestAlarm = [bp.alarm, hr?.alarm, w?.alarm].filter(Boolean).sort((a, b) => {
                const order: Record<string, number> = { critical: 0, warning: 1, change: 2, info: 3 };
                return (order[a!] ?? 4) - (order[b!] ?? 4);
              })[0];
              const hasOutlier = bp.outlier || hr?.outlier || w?.outlier;
              return (
                <tr key={i} className="cursor-pointer transition-colors"
                  style={{ borderBottom: `1px solid ${theme === "dark" ? "rgba(39,39,42,0.5)" : "rgba(228,228,231,0.5)"}` }}
                  onClick={() => setSidePanel({ type: "bp", date: bp.date, data: bp })}>
                  <td className="px-4 py-2" style={{ color: P.textSecondary }}>{bp.date}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: P.bpSystolic }}>{bp.systolic}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: P.bpDiastolic }}>{bp.diastolic}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: P.heartRate }}>{hr?.value ?? "—"}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: P.weight }}>{w?.value ?? "—"}</td>
                  <td className="px-4 py-2 text-right font-medium" style={{ color: P.mood }}>{m?.value ?? "—"}</td>
                  <td className="px-4 py-2 text-center" style={{ color: P.textMuted }}>{bp.readings.length}</td>
                  <td className="px-4 py-2 text-center">
                    {highestAlarm && <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: ALARM_COLORS[highestAlarm] }} />}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {hasOutlier && <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: P.outlier }} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════════════
     KEYBOARD SHORTCUT BAR
     ═══════════════════════════════════════════════════════════════════════════════ */
  const shortcuts = [
    { key: "T", label: "Tabelle/Graph" },
    { key: "D", label: "Dark/Light" },
    { key: "1-4", label: "Zeitraum" },
    { key: "G", label: "Grenzwerte" },
    { key: "M", label: "Fehlende" },
    { key: "Esc", label: "Schließen" },
  ];

  const shortcutBar = (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-4 px-6 py-2.5"
      style={{ backgroundColor: P.shortcutBg, borderTop: `1px solid ${P.border}`, backdropFilter: "blur(8px)" }}>
      <Keyboard size={16} style={{ color: P.textMuted }} />
      {shortcuts.map(s => (
        <div key={s.key} className="flex items-center gap-1.5">
          <kbd className="text-xs px-2 py-1 rounded font-mono font-semibold min-w-[28px] text-center"
            style={{ backgroundColor: P.shortcutKey, color: P.shortcutKeyText, boxShadow: theme === "dark" ? "0 1px 2px rgba(0,0,0,0.4)" : "0 1px 2px rgba(0,0,0,0.1)" }}>
            {s.key}
          </kbd>
          <span className="text-xs" style={{ color: P.textMuted }}>{s.label}</span>
        </div>
      ))}
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════════════
     PATIENT DATA (static demo)
     ═══════════════════════════════════════════════════════════════════════════════ */
  const patient = {
    name: "Max Mustermann",
    age: 58,
    gender: "Männlich",
    nyha: "II",
    lvef: 35,
    anticoag: true,
    icd10: [
      { code: "I50.0", text: "Herzinsuffizienz, kongestiv" },
      { code: "I48.0", text: "Vorhofflimmern, paroxysmal" },
      { code: "I25.1", text: "Atherosklerotische Herzkrankheit" },
      { code: "E11.9", text: "Diabetes mellitus, Typ 2, ohne Komplikationen" },
    ],
    implant: {
      manufacturer: "Biotronik",
      model: "Rivacor 7 VR-T DX",
      type: "ICD (Implantierbarer Kardioverter-Defibrillator)",
      serial: "SN-BTK-2024-48291",
      implantDate: "2024-03-15",
      batteryVoltage: 3.12,
      batteryStatus: "OK" as const,
      lastTransmission: "2026-03-05T08:14:00",
      detailLink: "#implant-detail",
      transmissionListLink: "#transmission-list-implant",
    },
    externalDevices: [
      {
        type: "Waage",
        manufacturer: "Withings",
        model: "Body Comp",
        serial: "WBS14-DE-2025-19482",
        lastTransmission: "2026-03-06T07:22:00",
        transmissionListLink: "#transmission-list-scale",
      },
      {
        type: "Blutdruckmanschette",
        manufacturer: "Withings",
        model: "BPM Connect Pro",
        serial: "WPM05-DE-2025-83741",
        lastTransmission: "2026-03-06T07:18:00",
        transmissionListLink: "#transmission-list-bpm",
      },
    ],
  };

  const timeSince = (isoStr: string) => {
    const diff = NOW.getTime() - new Date(isoStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    if (hours > 24) return `vor ${Math.floor(hours / 24)} Tagen`;
    if (hours > 0) return `vor ${hours}h ${mins}min`;
    return `vor ${mins}min`;
  };

  /* Info pill component */
  const InfoPill = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <div className="flex flex-col gap-0.5 px-3 py-2 rounded-lg" style={{ backgroundColor: P.bgInput }}>
      <span className="text-[11px] uppercase tracking-wider font-semibold" style={{ color: P.textMuted }}>{label}</span>
      <span className="text-sm font-semibold" style={{ color: color || P.text }}>{value}</span>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen transition-colors pb-14" style={{ backgroundColor: P.bg }}>
      <div className="max-w-[1500px] mx-auto px-3 py-4 sm:px-6 sm:py-6 lg:px-8 space-y-5" style={{ color: P.text }}>
        {tooltip}
        {sidePanelEl}
        {ecgDrawerEl}
        {shortcutBar}

        {/* ── Header Row ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight" style={{ color: P.text }}>Vitalparameter</h1>
            <div className="flex items-center gap-2">
              <User size={16} style={{ color: P.textMuted }} />
              <span className="text-base font-medium" style={{ color: P.textSecondary }}>{patient.name}, {patient.age} J., {patient.gender}</span>
            </div>
            <span className="text-sm px-3 py-1 rounded-full font-semibold"
              style={{ backgroundColor: score >= 80 ? "rgba(34,197,94,0.15)" : score >= 50 ? "rgba(234,179,8,0.15)" : "rgba(239,68,68,0.15)", color: score >= 80 ? P.good : score >= 50 ? P.warning : P.danger }}>
              {score}% Compliance
            </span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
              title="Dark/Light Mode (D)">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="w-px h-7 mx-1" style={{ backgroundColor: P.borderStrong }} />
            {RANGES.map(r => (
              <button key={r} onClick={() => setRange(r)}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{
                  backgroundColor: range === r ? (theme === "dark" ? "rgba(63,63,70,0.8)" : "rgba(228,228,231,0.8)") : "transparent",
                  color: range === r ? P.text : P.textMuted,
                }}>
                {r}T
              </button>
            ))}
            <button className="p-2 rounded-lg transition-colors" style={{ color: P.textMuted }}><Calendar size={18} /></button>
            <div className="w-px h-7 mx-1" style={{ backgroundColor: P.borderStrong }} />
            <button onClick={() => setViewMode(viewMode === "chart" ? "table" : "chart")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
              {viewMode === "chart" ? <Table2 size={16} /> : <LineChart size={16} />}
              {viewMode === "chart" ? "Tabelle" : "Graphen"}
            </button>
          </div>
        </div>

        {/* ── Patient Info Bar ── */}
        <div className="rounded-xl overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
          <div className="px-5 py-3 flex items-center gap-3" style={{ borderBottom: `1px solid ${P.border}` }}>
            <Info size={16} style={{ color: P.textMuted }} />
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: P.textMuted }}>Patientendaten</span>
          </div>
          <div className="p-4">
            {/* Clinical info pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <InfoPill label="NYHA" value={`Klasse ${patient.nyha}`} />
              <InfoPill label="LVEF" value={`${patient.lvef}%`} color={patient.lvef < 40 ? P.danger : patient.lvef < 50 ? P.warning : P.good} />
              <InfoPill label="Antikoagulation" value={patient.anticoag ? "Ja" : "Nein"} color={patient.anticoag ? P.good : P.textMuted} />
              <InfoPill label="Geschlecht" value={patient.gender} />
            </div>

            {/* ICD-10 Codes */}
            <div className="mb-4">
              <span className="text-[11px] uppercase tracking-wider font-semibold block mb-2" style={{ color: P.textMuted }}>ICD-10 Diagnosen</span>
              <div className="flex flex-wrap gap-2">
                {patient.icd10.map((d, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg" style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
                    <span className="font-mono font-semibold" style={{ color: P.text }}>{d.code}</span>
                    <span style={{ color: P.textMuted }}>—</span>
                    <span>{d.text}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Devices row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Implant */}
              <div className="rounded-lg p-4" style={{ backgroundColor: P.bgInput, border: `1px solid ${P.border}` }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Cpu size={16} style={{ color: P.heartRate }} />
                    <span className="text-sm font-semibold" style={{ color: P.text }}>Implantat</span>
                  </div>
                  <a href={patient.implant.detailLink} className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors"
                    style={{ color: P.bpSystolic, backgroundColor: theme === "dark" ? "rgba(74,158,222,0.1)" : "rgba(37,99,235,0.1)" }}>
                    Details <ExternalLink size={11} />
                  </a>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-semibold" style={{ color: P.text }}>{patient.implant.manufacturer} {patient.implant.model}</div>
                  <div className="text-xs" style={{ color: P.textMuted }}>{patient.implant.type}</div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: P.textSecondary }}>
                      <Battery size={13} />
                      <span className="font-mono font-semibold" style={{ color: patient.implant.batteryVoltage > 2.8 ? P.good : P.warning }}>{patient.implant.batteryVoltage} V</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: P.textSecondary }}>
                      <Radio size={13} />
                      <span>{timeSince(patient.implant.lastTransmission)}</span>
                    </div>
                  </div>
                  <a href={patient.implant.transmissionListLink} className="inline-flex items-center gap-1 text-xs mt-1 transition-colors"
                    style={{ color: P.bpSystolic }}>
                    Transmissions-Verlauf <Link2 size={11} />
                  </a>
                </div>
              </div>

              {/* External devices */}
              {patient.externalDevices.map((dev, i) => (
                <div key={i} className="rounded-lg p-4" style={{ backgroundColor: P.bgInput, border: `1px solid ${P.border}` }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {dev.type === "Waage" ? <Weight size={16} style={{ color: P.weight }} /> : <Activity size={16} style={{ color: P.bpSystolic }} />}
                      <span className="text-sm font-semibold" style={{ color: P.text }}>{dev.type}</span>
                    </div>
                    <Bluetooth size={14} style={{ color: P.bpSystolic }} />
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold" style={{ color: P.text }}>{dev.manufacturer} {dev.model}</div>
                    <div className="flex items-center gap-1.5 text-xs mt-2" style={{ color: P.textSecondary }}>
                      <Wifi size={13} />
                      <span>Letzte Übertragung: <span className="font-medium" style={{ color: P.text }}>{timeSince(dev.lastTransmission)}</span></span>
                    </div>
                    <a href={dev.transmissionListLink} className="inline-flex items-center gap-1 text-xs mt-1 transition-colors"
                      style={{ color: P.bpSystolic }}>
                      Transmissions-Verlauf <Link2 size={11} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Events + ECG Timeline (below devices) ── */}
        {eventsRow}
        {ecgTimeline}

        {/* ── Toggles ── */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm uppercase tracking-wider font-semibold mr-1" style={{ color: P.textMuted }}>Anzeige:</span>
          <ToggleBtn label="Grenzwerte" active={vis.thresholds} onToggle={() => setVis(v => ({ ...v, thresholds: !v.thresholds }))} shortcut="G" />
          <ToggleBtn label="Fehlende Werte" active={vis.missed} onToggle={() => setVis(v => ({ ...v, missed: !v.missed }))} shortcut="M" />
        </div>

        {/* ── Legend ── */}
        <div className="flex items-center gap-5 text-sm flex-wrap" style={{ color: P.textSecondary }}>
          <span className="flex items-center gap-1.5"><span className="inline-block w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-transparent" style={{ borderBottomColor: P.bpSystolic }} />Sys</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent" style={{ borderTopColor: P.bpDiastolic }} />Dia</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rotate-45" style={{ backgroundColor: P.heartRate }} />HR</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: P.weight }} />Gewicht</span>
          <span className="flex items-center gap-1.5"><span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: P.mood }} />Stimmung</span>
          <span style={{ color: P.textDim }}>|</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: P.alarmRed }} />Kritisch</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: P.alarmYellow }} />Warnung</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: P.alarmBlue }} />Änderung</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full" style={{ backgroundColor: P.alarmGray }} />Info</span>
          <span style={{ color: P.textDim }}>|</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded-full border-2 border-dashed" style={{ borderColor: P.outlier }} />Ausreißer</span>
          <span className="flex items-center gap-1.5"><Stethoscope size={14} style={{ color: P.examination }} />Untersuchung</span>
        </div>

        {/* ── Charts / Table ── */}
        {viewMode === "chart" ? (
          <div className="flex flex-col gap-3">
            {bpChart}
            {hrChart}
            {weightChart}
            {moodChart}
          </div>
        ) : (
          tableView
        )}
      </div>
    </div>
  );
}
