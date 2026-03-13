"use client";

import { useState, useRef, useEffect, useCallback, useMemo, createContext, useContext } from "react";
import * as d3 from "d3";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Activity01Icon, HeartCheckIcon, WeightScaleIcon, SmileIcon, Calendar01Icon,
  Maximize01Icon, Minimize01Icon, ArrowLeft01Icon, ArrowRight01Icon,
  Download01Icon, GridTableIcon, ChartLineData01Icon,
  PillIcon, CallIcon, Alert01Icon, PulseRectangle01Icon,
  ViewIcon, ViewOffIcon, InformationCircleIcon,
  ChartIncreaseIcon, ChartDecreaseIcon, MinusSignIcon,
  Cancel01Icon, ArrowUpRight01Icon, ArrowDownRight01Icon,
  ShieldBanIcon, ArrowUp01Icon, ArrowDown01Icon,
  Clock01Icon, BarChartIcon, ZoomInAreaIcon, ZoomOutAreaIcon,
  Link01Icon, CheckmarkCircle01Icon, CancelCircleIcon, RotateLeft01Icon,
  ToggleOnIcon, ToggleOffIcon, Notification01Icon, NotificationOff01Icon,
  Sun01Icon, Moon01Icon, Stethoscope02Icon, KeyboardIcon,
  UserIcon, CpuIcon, Radio01Icon, BluetoothIcon, BatteryFullIcon, Wifi01Icon,
  Settings02Icon, FloppyDiskIcon, Copy01Icon, Mail01Icon, Edit02Icon,
  Add01Icon, Delete01Icon, CheckListIcon, ArrowTurnBackwardIcon,
  SadDizzyIcon, Sad01Icon, NeutralIcon, HappyIcon
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
const MoodFace1 = hi(SadDizzyIcon);
const MoodFace2 = hi(Sad01Icon);
const MoodFace3 = hi(NeutralIcon);
const MoodFace4 = hi(HappyIcon);
const MoodFace5 = hi(SmileIcon);
const moodFaces = [null, MoodFace1, MoodFace2, MoodFace3, MoodFace4, MoodFace5];
const moodColor = (v: number) => {
  if (v <= 1) return "#ef4444"; // red
  if (v <= 2) return "#f97316"; // orange
  if (v <= 3) return "#eab308"; // yellow
  if (v <= 4) return "#60a5fa"; // blue-400
  return "#3b82f6"; // blue-500
};
const moodLabels: Record<string, string[]> = {
  de: ["", "Sehr schlecht", "Schlecht", "Okay", "Gut", "Sehr gut"],
  en: ["", "Very bad", "Bad", "Okay", "Good", "Very good"],
  hu: ["", "Nagyon rossz", "Rossz", "Rendben", "Jó", "Nagyon jó"],
  mk: ["", "Многу лошо", "Лошо", "Добро", "Добро", "Многу добро"],
  uk: ["", "Дуже погано", "Погано", "Нормально", "Добре", "Дуже добре"],
};
const Calendar = hi(Calendar01Icon);
const Maximize2 = hi(Maximize01Icon);
const Minimize2 = hi(Minimize01Icon);
const ChevronLeft = hi(ArrowLeft01Icon);
const ChevronRight = hi(ArrowRight01Icon);
const Download = hi(Download01Icon);
const Table2 = hi(GridTableIcon);
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
const Globe = ({ size = 24, color, className }: { size?: number; color?: string; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color || "currentColor"} strokeWidth={1.5} className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ImplantIcon = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.834-4.5 2.168C10.832 3.834 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    <line x1="12" y1="9" x2="12" y2="15" />
  </svg>
);
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
const Settings = hi(Settings02Icon);
const Save = hi(FloppyDiskIcon);
const Copy = hi(Copy01Icon);
const Mail = hi(Mail01Icon);
const Edit = hi(Edit02Icon);
const Plus = hi(Add01Icon);
const Trash = hi(Delete01Icon);
const Checklist = hi(CheckListIcon);
const ArrowBack = hi(ArrowTurnBackwardIcon);

/* ═══════════════════════════════════════════════════════════════════════════════
   THEME SYSTEM — dark / light mode
   ═══════════════════════════════════════════════════════════════════════════════ */
type Theme = "dark" | "light";

/* ═══════════════════════════════════════════════════════════════════════════════
   TAB KEYS
   ═══════════════════════════════════════════════════════════════════════════════ */
type TabKey = "dashboard" | "patient-info" | "telemonitoring" | "insurance" | "documents" | "app" | "contact-persons" | "settings";

const darkPalette = {
  bg: "#09090b", bgCard: "rgba(24,24,27,0.8)", bgCardHover: "rgba(39,39,42,0.6)",
  bgPanel: "rgba(24,24,27,0.98)", bgInput: "rgba(39,39,42,0.6)",
  border: "rgba(39,39,42,0.6)", borderStrong: "rgba(63,63,70,0.5)",
  text: "#fafafa", textSecondary: "#a1a1aa", textMuted: "#71717a", textDim: "#52525b",
  grid: "#27272a", gridLabel: "#a1a1aa",
  bpSystolic: "#4A9EDE", bpDiastolic: "#7EC8F0", heartRate: "#F07040",
  weight: "#60A5FA", mood: "#F5B840", detailLine: "#52525b",
  threshUpper: "#EF4444", threshLower: "#60A5FA",
  medication: "#E879A8", call: "#F5B840", alert: "#EF4444", ecg: "#818CF8",
  examination: "#818CF8",
  median: "#A1A1AA", good: "#60A5FA", warning: "#F5B840", danger: "#EF4444", missed: "#52525b",
  alarmRed: "#EF4444", alarmYellow: "#F59E0B", alarmBlue: "#60A5FA", alarmGray: "#9CA3AF",
  atrialHigh: "#EF4444", atrialMod: "#F59E0B", atrialLow: "#60A5FA",
  outlier: "#C084FC",
  shortcutBg: "rgba(24,24,27,0.95)", shortcutKey: "#3f3f46", shortcutKeyText: "#e4e4e7",
  accent: "#ff5c00",
};

const lightPalette: typeof darkPalette = {
  bg: "#f5f5f5", bgCard: "rgba(255,255,255,0.9)", bgCardHover: "rgba(244,244,245,0.8)",
  bgPanel: "rgba(255,255,255,0.98)", bgInput: "rgba(244,244,245,0.8)",
  border: "rgba(228,228,231,0.8)", borderStrong: "rgba(212,212,216,0.6)",
  text: "#18181b", textSecondary: "#52525b", textMuted: "#71717a", textDim: "#a1a1aa",
  grid: "#e4e4e7", gridLabel: "#71717a",
  bpSystolic: "#2563EB", bpDiastolic: "#3B82F6", heartRate: "#DC2626",
  weight: "#2563EB", mood: "#CA8A04", detailLine: "#71717a",
  threshUpper: "#DC2626", threshLower: "#2563EB",
  medication: "#DB2777", call: "#CA8A04", alert: "#DC2626", ecg: "#6366F1",
  examination: "#6366F1",
  median: "#71717a", good: "#2563EB", warning: "#CA8A04", danger: "#DC2626", missed: "#d4d4d8",
  alarmRed: "#DC2626", alarmYellow: "#CA8A04", alarmBlue: "#2563EB", alarmGray: "#71717a",
  atrialHigh: "#DC2626", atrialMod: "#CA8A04", atrialLow: "#2563EB",
  outlier: "#9333EA",
  shortcutBg: "rgba(255,255,255,0.95)", shortcutKey: "#e4e4e7", shortcutKeyText: "#27272a",
  accent: "#ff5c00",
};

/* ═══════════════════════════════════════════════════════════════════════════════
   TRANSLATIONS (i18n)
   ═══════════════════════════════════════════════════════════════════════════════ */
const translations = {
  de: {
    // Tabs
    dashboard: "Dashboard",
    patientInfo: "Patienteninfo",
    telemonitoring: "Telemonitoring",
    insurance: "Versicherung",
    documents: "Dokumente",
    app: "App",
    contactPersons: "Kontaktpersonen",
    // Patient data labels
    patientData: "Patientendaten",
    age: "Alter",
    gender: "Geschlecht",
    nyha: "NYHA",
    lvef: "LVEF",
    anticoagulation: "Antikoagulation",
    birthDate: "Geburtsdatum",
    icd10Diagnoses: "ICD-10 Diagnosen",
    devices: "Geräte",
    implant: "Implantat",
    externalDevices: "Externe Geräte",
    // Section headers
    events: "Ereignisse & IEGM",
    overview: "Vitaldaten-Übersicht",
    display: "Anzeige",
    thresholds: "Grenzwerte",
    missingValues: "Fehlende Werte",
    // Chart titles and units
    bloodPressure: "Blutdruck",
    heartRate: "Herzfrequenz",
    weight: "Gewicht",
    mood: "Befinden",
    // Legend items
    sys: "Sys",
    dia: "Dia",
    hr: "HR",
    outlier: "Ausreißer",
    examination: "Untersuchung",
    // Time ranges
    timeRanges: { 7: "7", 14: "14", 30: "30", 60: "60", 90: "90" }, daysLabel: "Tage",
    // Buttons
    table: "Tabelle",
    charts: "Graphen",
    backToDashboard: "Zurück zum Dashboard",
    // Calendar
    monthNames: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
    dayAbbrev: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
    patients: "Patienten",
    searchPlaceholder: "Patient suchen",
    from: "Von",
    to: "Bis",
    custom: "Benutzerdefiniert",
    save: "Speichern",
    cancel: "Abbrechen",
    monitoring: "Monitoring",
    years: "Jahre",
    class: "Klasse",
    details: "Details",
    male: "Männlich",
    female: "Weiblich",
    yes: "Ja",
    no: "Nein",
    icd10Texts: {
      "I50.0": "Herzinsuffizienz, kongestiv",
      "I48.0": "Vorhofflimmern, paroxysmal",
      "I25.1": "Atherosklerotische Herzkrankheit",
      "E11.9": "Diabetes mellitus, Typ 2, ohne Komplikationen",
    },
    male: "Männlich",
    female: "Weiblich",
    yes: "Ja",
    no: "Nein",
    icd10Texts: {
      "I50.0": "Herzinsuffizienz, kongestiv",
      "I48.0": "Vorhofflimmern, paroxysmal",
      "I25.1": "Atherosklerotische Herzkrankheit",
      "E11.9": "Diabetes mellitus, Typ 2, ohne Komplikationen",
    },
    beeToast: "Du kleines Fleißbienchen! Deine Patienten haben es gut!",
  },
  en: {
    dashboard: "Dashboard",
    patientInfo: "Patient Info",
    telemonitoring: "Telemonitoring",
    insurance: "Insurance",
    documents: "Documents",
    app: "App",
    contactPersons: "Contact Persons",
    patientData: "Patient Data",
    age: "Age",
    gender: "Gender",
    nyha: "NYHA",
    lvef: "LVEF",
    anticoagulation: "Anticoagulation",
    birthDate: "Birth Date",
    icd10Diagnoses: "ICD-10 Diagnoses",
    devices: "Devices",
    implant: "Implant",
    externalDevices: "External Devices",
    events: "Events & ECG",
    overview: "Vital Data Overview",
    display: "Display",
    thresholds: "Thresholds",
    missingValues: "Missing Values",
    bloodPressure: "Blood Pressure",
    heartRate: "Heart Rate",
    weight: "Weight",
    mood: "Mood",
    sys: "Sys",
    dia: "Dia",
    hr: "HR",
    outlier: "Outlier",
    examination: "Examination",
    timeRanges: { 7: "7", 14: "14", 30: "30", 60: "60", 90: "90" }, daysLabel: "Days",
    table: "Table",
    charts: "Charts",
    backToDashboard: "Back to Dashboard",
    monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    dayAbbrev: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    patients: "Patients",
    searchPlaceholder: "Search patient",
    from: "From",
    to: "To",
    custom: "Custom",
    save: "Save",
    cancel: "Cancel",
    monitoring: "Monitoring",
    years: "years",
    class: "Class",
    details: "Details",
    male: "Male",
    female: "Female",
    yes: "Yes",
    no: "No",
    icd10Texts: {
      "I50.0": "Congestive heart failure",
      "I48.0": "Paroxysmal atrial fibrillation",
      "I25.1": "Atherosclerotic heart disease",
      "E11.9": "Type 2 diabetes mellitus, without complications",
    },
    beeToast: "You busy little bee! Your patients are in good hands!",
    male: "Männlich",
    female: "Weiblich",
    yes: "Ja",
    no: "Nein",
    icd10Texts: {
      "I50.0": "Herzinsuffizienz, kongestiv",
      "I48.0": "Vorhofflimmern, paroxysmal",
      "I25.1": "Atherosklerotische Herzkrankheit",
      "E11.9": "Diabetes mellitus, Typ 2, ohne Komplikationen",
    },
  },
  hu: {
    dashboard: "Irányítópult",
    patientInfo: "Beteg információ",
    telemonitoring: "Távolmonitorozás",
    insurance: "Biztosítás",
    documents: "Dokumentumok",
    app: "Alkalmazás",
    contactPersons: "Kapcsolattartók",
    patientData: "Betegadatok",
    age: "Kor",
    gender: "Nem",
    nyha: "NYHA",
    lvef: "LVEF",
    anticoagulation: "Antikoaguláció",
    birthDate: "Születési dátum",
    icd10Diagnoses: "ICD-10 diagnózisok",
    devices: "Eszközök",
    implant: "Implantátum",
    externalDevices: "Külső eszközök",
    events: "Események és EKG",
    overview: "Vitális adatok áttekintése",
    display: "Megjelenítés",
    thresholds: "Küszöbértékek",
    missingValues: "Hiányzó értékek",
    bloodPressure: "Vérnyomás",
    heartRate: "Pulzus",
    weight: "Súly",
    mood: "Hangulat",
    sys: "Sys",
    dia: "Dia",
    hr: "HR",
    outlier: "Kilógás",
    examination: "Vizsgálat",
    timeRanges: { 7: "7", 14: "14", 30: "30", 60: "60", 90: "90" }, daysLabel: "Nap",
    table: "Táblázat",
    charts: "Grafikonok",
    backToDashboard: "Vissza az irányítópultra",
    monthNames: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
    dayAbbrev: ["Hé", "Ke", "Sze", "Csü", "Pé", "Szo", "Va"],
    patients: "Betegek",
    searchPlaceholder: "Beteg keresése",
    from: "Tól",
    to: "Ig",
    custom: "Egyéni",
    save: "Save",
    cancel: "Mégse",
    monitoring: "Monitoring",
    years: "év",
    class: "Osztály",
    details: "Részletek",
    male: "Férfi",
    female: "Nő",
    yes: "Igen",
    no: "Nem",
    icd10Texts: {
      "I50.0": "Pangásos szívelégtelenség",
      "I48.0": "Paroxizmális pitvarfibrilláció",
      "I25.1": "Atherosclerotikus szívbetegség",
      "E11.9": "2-es típusú diabetes mellitus, szövődmények nélkül",
    },
    beeToast: "Te kis szorgalmas méhecske! A pácienseidnek jó dolguk van!",
  },
  mk: {
    // Tabs
    dashboard: "Контролна панела",
    patientInfo: "Информации за пациент",
    telemonitoring: "Теледистанцијско надзирање",
    insurance: "Осигурување",
    documents: "Документи",
    app: "Апликација",
    contactPersons: "Контактни лица",
    // Patient data labels
    patientData: "Податоци за пациент",
    age: "Возраст",
    gender: "Пол",
    nyha: "NYHA",
    lvef: "LVEF",
    anticoagulation: "Антикоагулација",
    birthDate: "Датум на раѓање",
    icd10Diagnoses: "ICD-10 дијагнози",
    devices: "Уреди",
    implant: "Имплант",
    externalDevices: "Надворешни уреди",
    // Section headers
    events: "События и EКГ",
    overview: "Преглед на витални податоци",
    display: "Приказ",
    thresholds: "Граници на вредност",
    missingValues: "Недостасувачки вредности",
    // Chart titles and units
    bloodPressure: "Крвен притисок",
    heartRate: "Пулс",
    weight: "Тежина",
    mood: "Расположение",
    // Legend items
    sys: "Сис",
    dia: "Дија",
    hr: "ЧСС",
    outlier: "Отстапување",
    examination: "Преглед",
    // Time ranges
    timeRanges: { 7: "7", 14: "14", 30: "30", 60: "60", 90: "90" }, daysLabel: "Дні",
    // Buttons
    table: "Табела",
    charts: "Графикони",
    backToDashboard: "Назад на контролна панела",
    // Calendar
    monthNames: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
    dayAbbrev: ["Пон", "Втр", "Сря", "Чет", "Пет", "Саб", "Нед"],
    patients: "Пациенти",
    searchPlaceholder: "Пребарај пациент",
    from: "Од",
    to: "До",
    custom: "Прилагодено",
    save: "Зачувај",
    cancel: "Откажи",
    monitoring: "Надзирање",
    years: "години",
    class: "Класа",
    details: "Детали",
    male: "Мажи",
    female: "Жени",
    yes: "Да",
    no: "Не",
    icd10Texts: {
      "I50.0": "Конгестивна срцева недостаточност",
      "I48.0": "Пароксизмална атријална фибрилација",
      "I25.1": "Атеросклеротична болест на срцето",
      "E11.9": "Дијабетес мелитус тип 2, без компликации",
    },
    beeToast: "Ти мало вредно пчеличка! Твоите пациенти ја имаат добро!",
  },
  uk: {
    // Tabs
    dashboard: "Панель приладуння",
    patientInfo: "Інформація про пацієнта",
    telemonitoring: "Телемоніторинг",
    insurance: "Страхування",
    documents: "Документи",
    app: "Додаток",
    contactPersons: "Контактні особи",
    // Patient data labels
    patientData: "Дані пацієнта",
    age: "Вік",
    gender: "Стать",
    nyha: "NYHA",
    lvef: "LVEF",
    anticoagulation: "Антикоагуляція",
    birthDate: "Дата народження",
    icd10Diagnoses: "Діагнози МКХ-10",
    devices: "Пристрої",
    implant: "Імплантат",
    externalDevices: "Зовнішні пристрої",
    // Section headers
    events: "Події та ЕКГ",
    overview: "Огляд вітальних даних",
    display: "Дисплей",
    thresholds: "Пороги",
    missingValues: "Відсутні значення",
    // Chart titles and units
    bloodPressure: "Артеріальний тиск",
    heartRate: "Частота серцевих скорочень",
    weight: "Вага",
    mood: "Настрій",
    // Legend items
    sys: "САТ",
    dia: "ДАТ",
    hr: "ЧСС",
    outlier: "Викид",
    examination: "Обстеження",
    // Time ranges
    timeRanges: { 7: "7", 14: "14", 30: "30", 60: "60", 90: "90" }, daysLabel: "Дні",
    // Buttons
    table: "Таблиця",
    charts: "Графіки",
    backToDashboard: "Повернутися на панель приладуння",
    // Calendar
    monthNames: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
    dayAbbrev: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
    patients: "Пацієнти",
    searchPlaceholder: "Пошук пацієнта",
    from: "Від",
    to: "До",
    custom: "Користувацький",
    save: "Зберегти",
    cancel: "Скасувати",
    monitoring: "Моніторинг",
    years: "років",
    class: "Клас",
    details: "Подробиці",
    male: "Чоловік",
    female: "Жінка",
    yes: "Так",
    no: "Ні",
    icd10Texts: {
      "I50.0": "Застійна серцева недостатність",
      "I48.0": "Пароксизмальна фібриляція передсердь",
      "I25.1": "Атеросклеротична хвороба серця",
      "E11.9": "Цукровий діабет 2 типу без ускладнень",
    },
    beeToast: "Ти маленька працьовита бджілка! Твоїм пацієнтам пощастило!",
  },
};

const ALARM_LABELS: Record<string, string> = {
  critical: "Kritisch", warning: "Warnung", change: "Änderung", info: "Information",
};

/* ═══════════════════════════════════════════════════════════════════════════════
   THRESHOLD / ALARM CONFIGURATION TYPES
   ═══════════════════════════════════════════════════════════════════════════════ */
interface AlarmLevel {
  enabled: boolean;
  emailNotify: boolean;
}

interface ThresholdParam {
  id: string;
  label: string;
  unit: string;
  yellow: AlarmLevel & { rules: ThresholdRule[] };
  red: AlarmLevel & { rules: ThresholdRule[] };
}

interface ThresholdRule {
  id: string;
  label: string;
  operator: "<" | ">" | "≤" | "≥";
  value: number;
  suffix?: string;
  secondValue?: number;
  secondSuffix?: string;
}

interface ThresholdTemplate {
  id: string;
  name: string;
  isDefault: boolean;
  params: ThresholdParam[];
}

const createDefaultParams = (): ThresholdParam[] => [
  {
    id: "pulse", label: "Puls aus RR-Messung", unit: "bpm",
    yellow: { enabled: true, emailNotify: false, rules: [
      { id: "pulse-y1", label: "Unterer Schwellwert", operator: "<", value: 50, suffix: "bpm" },
      { id: "pulse-y2", label: "Oberer Schwellwert", operator: ">", value: 100, suffix: "bpm" },
    ]},
    red: { enabled: true, emailNotify: true, rules: [
      { id: "pulse-r1", label: "Unterer Schwellwert", operator: "<", value: 40, suffix: "bpm" },
      { id: "pulse-r2", label: "Oberer Schwellwert", operator: ">", value: 120, suffix: "bpm" },
    ]},
  },
  {
    id: "bp", label: "Blutdruck", unit: "mmHg",
    yellow: { enabled: true, emailNotify: false, rules: [
      { id: "bp-y1", label: "Systolisch unter", operator: "<", value: 90, suffix: "mmHg" },
      { id: "bp-y2", label: "Systolisch über", operator: ">", value: 140, suffix: "mmHg" },
      { id: "bp-y3", label: "Diastolisch unter", operator: "<", value: 40, suffix: "mmHg" },
      { id: "bp-y4", label: "Diastolisch über", operator: ">", value: 90, suffix: "mmHg" },
    ]},
    red: { enabled: true, emailNotify: true, rules: [
      { id: "bp-r1", label: "Systolisch unter", operator: "<", value: 80, suffix: "mmHg" },
      { id: "bp-r2", label: "Systolisch über", operator: ">", value: 160, suffix: "mmHg" },
      { id: "bp-r3", label: "Diastolisch unter", operator: "<", value: 30, suffix: "mmHg" },
      { id: "bp-r4", label: "Diastolisch über", operator: ">", value: 100, suffix: "mmHg" },
    ]},
  },
  {
    id: "weight", label: "Gewicht", unit: "kg",
    yellow: { enabled: true, emailNotify: false, rules: [
      { id: "wt-y1", label: "Zunahme in 1 Tag", operator: ">", value: 1, suffix: "kg in 1 Tag" },
      { id: "wt-y2", label: "Zunahme in 3 Tagen", operator: ">", value: 2, suffix: "kg in", secondValue: 3, secondSuffix: "Tagen" },
      { id: "wt-y3", label: "Zunahme in 8 Tagen", operator: ">", value: 2.5, suffix: "kg in", secondValue: 8, secondSuffix: "Tagen" },
    ]},
    red: { enabled: true, emailNotify: true, rules: [
      { id: "wt-r1", label: "Zunahme in 1 Tag", operator: ">", value: 1.5, suffix: "kg in 1 Tag" },
      { id: "wt-r2", label: "Zunahme in 3 Tagen", operator: ">", value: 3, suffix: "kg in", secondValue: 3, secondSuffix: "Tagen" },
      { id: "wt-r3", label: "Zunahme in 8 Tagen", operator: ">", value: 4, suffix: "kg in", secondValue: 8, secondSuffix: "Tagen" },
    ]},
  },
  {
    id: "spo2", label: "Sauerstoffsättigung", unit: "%",
    yellow: { enabled: false, emailNotify: false, rules: [
      { id: "spo2-y1", label: "Unter", operator: "<", value: 94, suffix: "%" },
    ]},
    red: { enabled: false, emailNotify: false, rules: [
      { id: "spo2-r1", label: "Unter", operator: "<", value: 89, suffix: "%" },
    ]},
  },
  {
    id: "mood", label: "Befinden", unit: "",
    yellow: { enabled: true, emailNotify: false, rules: [
      { id: "mood-y1", label: "Eher schlechter an X Tagen in Folge", operator: "≤", value: 2, suffix: "an", secondValue: 3, secondSuffix: "Tagen in Folge" },
    ]},
    red: { enabled: true, emailNotify: false, rules: [
      { id: "mood-r1", label: "Schlechter an X Tagen in Folge", operator: "≤", value: 1, suffix: "an", secondValue: 3, secondSuffix: "Tagen in Folge" },
    ]},
  },
  {
    id: "nodata", label: "Keine eingegangene Messung", unit: "",
    yellow: { enabled: true, emailNotify: false, rules: [
      { id: "nodata-y1", label: "Nach X Tagen", operator: ">", value: 3, suffix: "Tagen" },
    ]},
    red: { enabled: false, emailNotify: false, rules: [] },
  },
  {
    id: "ecg_received", label: "IEGM eingegangen", unit: "",
    yellow: { enabled: true, emailNotify: false, rules: [] },
    red: { enabled: false, emailNotify: false, rules: [] },
  },
  {
    id: "ecg_findings", label: "IEGM Befunde", unit: "",
    yellow: { enabled: false, emailNotify: false, rules: [] },
    red: { enabled: false, emailNotify: false, rules: [] },
  },
  {
    id: "implant_template", label: "Vorlage für Implantate", unit: "",
    yellow: { enabled: false, emailNotify: false, rules: [] },
    red: { enabled: false, emailNotify: false, rules: [] },
  },
];

const createDefaultTemplate = (): ThresholdTemplate => ({
  id: "standard",
  name: "Standard-Vorlage",
  isDefault: true,
  params: createDefaultParams(),
});

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
interface EcgEvent { date: string; time: string; duration: number; atrialBurden?: number; atrialUncertain?: boolean; alarm?: string; acknowledgedBy?: string; acknowledgedAt?: string; waveform?: number[]; trigger?: string; }
interface EventItem { date: string; type: string; label: string; alarm?: string; acknowledgedBy?: string; acknowledgedAt?: string; linkedId?: string; }
interface AllData { bp: BpPoint[]; hr: HrPoint[]; weight: WeightPoint[]; mood: MoodPoint[]; events: EventItem[]; ecgs: EcgEvent[]; missed: string[]; }

/* ═══════════════════════════════════════════════════════════════════════════════
   DATA GENERATION — multi-measurement per day, many events
   ═══════════════════════════════════════════════════════════════════════════════ */
const NOW = new Date(2026, 2, 6);
const DATA_START = new Date(2024, 10, 1); // Nov 1, 2024

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
  const days = Math.ceil((NOW.getTime() - DATA_START.getTime()) / (1000 * 60 * 60 * 24));
  const data: AllData = { bp: [], hr: [], weight: [], mood: [], events: [], ecgs: [], missed: [] };
  let bW = 72.3, bS = 128, bD = 82, bHR = 72;
  const outlierDays = new Set([5, 12, 20, 35, 50, 65, 80]);
  // Days with extreme spikes: sporadic systolic BP up to 180, HR near 200
  const extremeBpDays = new Set([8, 22, 47, 73, 110, 145, 190, 230, 275, 310, 360, 400, 440]);
  const extremeHrDays = new Set([15, 42, 88, 130, 175, 220, 260, 320, 380, 420, 470]);

  for (let i = days; i >= 0; i--) {
    const date = new Date(NOW); date.setDate(date.getDate() - i);
    const ds = date.toISOString().split("T")[0];

    if (Math.random() < 0.06 && !outlierDays.has(i)) { data.missed.push(ds); continue; }
    if (i === 55 || i === 54) { data.missed.push(ds); continue; }

    const drift = Math.sin(i / 15) * 5;
    const isOutlierBp = outlierDays.has(i);

    // Multiple measurements per day: mostly 1, ~8% chance of 2-3
    const bpCount = Math.random() < 0.08 ? Math.floor(Math.random() * 2) + 2 : 1; // ~8% chance of 2-3 readings, otherwise 1
    const bpReadings: BpReading[] = [];
    const isExtremeBp = extremeBpDays.has(i);
    for (let r = 0; r < bpCount; r++) {
      const extremeSpike = isExtremeBp && r === 0 ? 40 + Math.random() * 15 : 0; // systolic up to ~180
      const s = Math.round(bS + drift + (Math.random() - 0.5) * 12 + (isOutlierBp && r === 0 ? 35 : 0) + extremeSpike);
      const d = Math.round(bD + drift * 0.6 + (Math.random() - 0.5) * 8 + (isOutlierBp && r === 0 ? -10 : 0));
      bpReadings.push({ time: randTime(6 + r * 2, 8 + r * 2), systolic: s, diastolic: d });
    }
    bpReadings.sort((a, b) => a.time.localeCompare(b.time));
    const avgSys = Math.round(bpReadings.reduce((s, r) => s + r.systolic, 0) / bpReadings.length);
    const avgDia = Math.round(bpReadings.reduce((s, r) => s + r.diastolic, 0) / bpReadings.length);
    const bpAlarm = avgSys > 160 ? "critical" : avgSys > 140 ? "warning" : avgSys < 100 ? "change" : undefined;
    data.bp.push({ date: ds, readings: bpReadings, systolic: avgSys, diastolic: avgDia, alarm: isOutlierBp ? "warning" : (isExtremeBp ? "critical" : bpAlarm), outlier: false });

    const hrCount = Math.random() < 0.08 ? Math.floor(Math.random() * 2) + 2 : 1; // ~8% chance of 2-3 readings, otherwise 1
    const hrReadings: HrReading[] = [];
    const isOutlierHr = i === 12 || i === 35;
    const isExtremeHr = extremeHrDays.has(i);
    for (let r = 0; r < hrCount; r++) {
      const extremeHrSpike = isExtremeHr && r === 0 ? 100 + Math.random() * 30 : 0; // HR near 190-200
      const hr = Math.round(bHR + Math.sin(i / 10) * 8 + (Math.random() - 0.5) * 10 + (isOutlierHr && r === 0 ? 40 : 0) + extremeHrSpike);
      hrReadings.push({ time: randTime(6 + r, 8 + r * 2), value: hr });
    }
    hrReadings.sort((a, b) => a.time.localeCompare(b.time));
    const avgHr = Math.round(hrReadings.reduce((s, r) => s + r.value, 0) / hrReadings.length);
    const hrAlarm = avgHr > 150 ? "critical" : avgHr > 100 ? "warning" : avgHr < 50 ? "warning" : undefined;
    data.hr.push({ date: ds, readings: hrReadings, value: avgHr, alarm: isOutlierHr ? "critical" : (isExtremeHr ? "critical" : hrAlarm), outlier: false });

    bW += (Math.random() - 0.52) * 0.15;
    const w = Math.round(bW * 10) / 10;
    const isOutlierW = i === 20 || i === 65;
    const wCount = Math.random() < 0.05 ? 2 : 1; // rarely 2 readings
    const wReadings: WeightReading[] = [];
    for (let r = 0; r < wCount; r++) {
      wReadings.push({ time: randTime(6, 10), value: Math.round((w + (Math.random() - 0.5) * 0.3 + (isOutlierW && r === 0 ? 4 : 0)) * 10) / 10 });
    }
    const avgW = Math.round(wReadings.reduce((s, r) => s + r.value, 0) / wReadings.length * 10) / 10;
    data.weight.push({ date: ds, readings: wReadings, value: avgW, alarm: isOutlierW ? "warning" : undefined, outlier: false });

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

    // ECG (~22% to include more Periodic IEGM)
    if (Math.random() < 0.22) {
      const ab = Math.random();
      const atrialBurden = ab < 0.15 ? Math.round(Math.random() * 30 + 20) : ab < 0.3 ? Math.round(Math.random() * 10 + 2) : 0;
      const ecgAlarm = atrialBurden > 15 ? "critical" : atrialBurden > 5 ? "warning" : undefined;
      const triggers = ["VT-Stimulation", "Vorhofflimmerdetektion", "Tachykardieepisode", "Manuelle Auslösung", "AT/AF-Episode", "Periodic IEGM", "Periodic IEGM"];
      const trigger = triggers[Math.floor(Math.random() * triggers.length)];
      data.ecgs.push({
        date: ds, time: `${8 + Math.floor(Math.random() * 12)}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}`,
        duration: Math.round(30 + Math.random() * 90),
        atrialBurden, atrialUncertain: Math.random() < 0.1,
        alarm: ecgAlarm,
        acknowledgedBy: Math.random() < 0.5 ? "Dr. Müller" : undefined,
        acknowledgedAt: Math.random() < 0.5 ? `${ds}T14:00:00` : undefined,
        waveform: generateEcgWaveform(10000),
        trigger,
      });
    }
  }
  return data;
};

const detectOutliers = (data: AllData, stdDevMultiplier = 2.5): AllData => {
  // Compute rolling stats for BP systolic
  const bpWindow = 21; // 3 weeks rolling window
  data.bp.forEach((point, idx) => {
    const windowStart = Math.max(0, idx - bpWindow);
    const windowSlice = data.bp.slice(windowStart, idx).map(p => p.systolic);
    if (windowSlice.length >= 5) {
      const mean = windowSlice.reduce((a, b) => a + b, 0) / windowSlice.length;
      const stdDev = Math.sqrt(windowSlice.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / windowSlice.length);
      if (stdDev > 0 && Math.abs(point.systolic - mean) > stdDevMultiplier * stdDev) {
        point.outlier = true;
        point.alarm = point.alarm || "warning";
      }
    }
  });
  // HR
  data.hr.forEach((point, idx) => {
    const windowStart = Math.max(0, idx - bpWindow);
    const windowSlice = data.hr.slice(windowStart, idx).map(p => p.value);
    if (windowSlice.length >= 5) {
      const mean = windowSlice.reduce((a, b) => a + b, 0) / windowSlice.length;
      const stdDev = Math.sqrt(windowSlice.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / windowSlice.length);
      if (stdDev > 0 && Math.abs(point.value - mean) > stdDevMultiplier * stdDev) {
        point.outlier = true;
        point.alarm = point.alarm || "warning";
      }
    }
  });
  // Weight
  data.weight.forEach((point, idx) => {
    const windowStart = Math.max(0, idx - bpWindow);
    const windowSlice = data.weight.slice(windowStart, idx).map(p => p.value);
    if (windowSlice.length >= 5) {
      const mean = windowSlice.reduce((a, b) => a + b, 0) / windowSlice.length;
      const stdDev = Math.sqrt(windowSlice.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / windowSlice.length);
      if (stdDev > 0 && Math.abs(point.value - mean) > stdDevMultiplier * stdDev) {
        point.outlier = true;
        point.alarm = point.alarm || "warning";
      }
    }
  });
  return data;
};

/* ═══════════════════════════════════════════════════════════════════════════════
   UTILITIES
   ═══════════════════════════════════════════════════════════════════════════════ */
const RANGES = [7, 14, 30, 60, 90] as const;
type Range = typeof RANGES[number];

const rollingMedian = (vals: { date: string; v: number }[], window = 7) => {
  return vals.map((pt, idx) => {
    const start = Math.max(0, idx - Math.floor(window / 2));
    const end = Math.min(vals.length, idx + Math.ceil(window / 2));
    const slice = vals.slice(start, end).map(p => p.v).sort((a, b) => a - b);
    return { date: pt.date, v: slice[Math.floor(slice.length / 2)] };
  });
};

const percentile = (values: number[], p: number): number => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const idx = (p / 100) * (sorted.length - 1);
  const lo = Math.floor(idx);
  const hi = Math.ceil(idx);
  if (lo === hi) return sorted[lo];
  return Math.round(sorted[lo] + (sorted[hi] - sorted[lo]) * (idx - lo));
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
  const [allData, setAllData] = useState<AllData>(() => detectOutliers(generateData()));
  const [range, setRange] = useState<Range>(30);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hoverInfo, setHoverInfo] = useState<any>(null);
  const mousePosRef = useRef<{ cx: number; cy: number } | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [sidePanel, setSidePanel] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"chart" | "table">("chart");
  const [vis, setVis] = useState({ thresholds: true, missed: true, values: false });
  const [ecgDrawer, setEcgDrawer] = useState<EcgEvent | null>(null);
  const [ecgZoom, setEcgZoom] = useState(1);
  const [ecgHover, setEcgHover] = useState<{ ecg: EcgEvent; cx: number; cy: number } | null>(null);
  const [theme, setTheme] = useState<Theme>("light");
  const [page, setPage] = useState<"dashboard" | "thresholds">("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [patientTab, setPatientTab] = useState<TabKey>("dashboard");
  const [calendarSelectedDay, setCalendarSelectedDay] = useState<string | null>(null);
  const [calendarDialog, setCalendarDialog] = useState<{ dateStr: string } | null>(null);
  const [calendarHoverDay, setCalendarHoverDay] = useState<{ dateStr: string; cx: number; cy: number } | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [devicesOpen, setDevicesOpen] = useState(false);
  const [implantDetailOpen, setImplantDetailOpen] = useState(false);
  const [calendarViewMode, setCalendarViewMode] = useState<"calendar" | "timeline">("calendar");
  const [episodeSidebar, setEpisodeSidebar] = useState<{ date: string; episodes: any[] } | null>(null);
  const [lang, setLang] = useState<"de" | "en" | "hu" | "mk" | "uk">("de");
  const [langOpen, setLangOpen] = useState(false);
  const [customDateRange, setCustomDateRange] = useState<[string, string] | null>(null);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [overviewVisible, setOverviewVisible] = useState({ sys: true, dia: true, hr: true, weight: true, mood: true });
  const [overviewHover, setOverviewHover] = useState<{ xPos: number; yPos: number; data: Record<string, any> } | null>(null);
  const [notesText, setNotesText] = useState("Telefonat am 04.03. — Patient berichtet über Schwindel bei Lagewechsel. Medikation prüfen.");
  const [notesOpen, setNotesOpen] = useState(false);
  const notesRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!notesOpen) return;
    const handler = (e: MouseEvent) => {
      if (notesRef.current && !notesRef.current.contains(e.target as Node)) setNotesOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [notesOpen]);
  const [crossHairDate, setCrossHairDate] = useState<Date | null>(null);

  /* ── Threshold settings state ── */
  const [templates, setTemplates] = useState<ThresholdTemplate[]>(() => [createDefaultTemplate()]);
  const [activeTemplateId, setActiveTemplateId] = useState("standard");
  const [thresholdParams, setThresholdParams] = useState<ThresholdParam[]>(() => createDefaultParams());
  const [thresholdModified, setThresholdModified] = useState(false);
  const [saveTemplateName, setSaveTemplateName] = useState("");
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [openThresholdParams, setOpenThresholdParams] = useState<Set<string>>(new Set());
  const [autoCorrectFlash, setAutoCorrectFlash] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showBeeToast, setShowBeeToast] = useState(false);
  const hasShownConfettiRef = useRef(false);

  const [toasts, setToasts] = useState<Array<{
    id: number;
    message: string;
    prevParams: ThresholdParam[];
    timestamp: number;
  }>>([]);
  const toastIdRef = useRef(0);
  const [chartOffset, setChartOffset] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDraggingTimeline, setIsDraggingTimeline] = useState<"pan" | "left" | "right" | null>(null);
  const dragStartRef = useRef<{ x: number; offset: number; range: number }>({ x: 0, offset: 0, range: 90 });

  const activeTemplate = templates.find(t => t.id === activeTemplateId);
  const displayTemplateName = activeTemplate
    ? (thresholdModified ? `${activeTemplate.name}+` : activeTemplate.name)
    : "Benutzerdefiniert";

  const P = theme === "dark" ? darkPalette : lightPalette;
  const pushToast = useCallback((message: string, prevParams: ThresholdParam[]) => {
    const id = ++toastIdRef.current;
    setToasts(prev => [...prev.slice(-4), { id, message, prevParams, timestamp: Date.now() }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  }, []);

  const handleToastUndo = useCallback((toast: { id: number; prevParams: ThresholdParam[] }) => {
    setThresholdParams(toast.prevParams);
    setToasts(prev => prev.filter(t => t.id !== toast.id));
  }, []);

  const handleChartNav = (direction: "left" | "right") => {
    setChartOffset(prev => {
      const step = Math.max(1, Math.floor(range / 4));
      if (direction === "left") return prev + step;
      if (direction === "right") return Math.max(0, prev - step);
      return prev;
    });
  };
  const ALARM_COLORS: Record<string, string> = { critical: P.alarmRed, warning: P.alarmYellow, change: P.alarmBlue, info: P.alarmGray };

  const tr = useMemo(() => translations[lang], [lang]);

  const score = useMemo(() => complianceScore(allData, range), [allData, range]);

  const filteredData = useMemo(() => {
    const endDate = new Date(NOW);
    endDate.setDate(endDate.getDate() - chartOffset);
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - range);
    const cs = startDate.toISOString().split("T")[0];
    const ce = endDate.toISOString().split("T")[0];
    return {
      bp: allData.bp.filter(p => p.date >= cs && p.date <= ce),
      hr: allData.hr.filter(p => p.date >= cs && p.date <= ce),
      weight: allData.weight.filter(p => p.date >= cs && p.date <= ce),
      mood: allData.mood.filter(p => p.date >= cs && p.date <= ce),
      events: allData.events.filter(p => p.date >= cs && p.date <= ce),
      ecgs: allData.ecgs.filter(p => p.date >= cs && p.date <= ce),
      missed: allData.missed.filter(d => d >= cs && d <= ce),
    };
  }, [allData, range, chartOffset]);

  const chartData = useMemo(() => {
    if (range < 60) return filteredData;
    // Aggregate by day: compute daily averages
    const aggregateByDay = <T extends { date: string }>(arr: T[], valueKeys: string[]): T[] => {
      const groups = new Map<string, T[]>();
      arr.forEach(item => {
        const day = item.date.substring(0, 10);
        if (!groups.has(day)) groups.set(day, []);
        groups.get(day)!.push(item);
      });
      return Array.from(groups.entries()).map(([day, items]) => {
        const avg: any = { ...items[0], date: day };
        valueKeys.forEach(key => {
          const vals = items.map(i => (i as any)[key]).filter((v: any) => typeof v === "number");
          if (vals.length > 0) avg[key] = Math.round(vals.reduce((a: number, b: number) => a + b, 0) / vals.length * 10) / 10;
        });
        return avg as T;
      });
    };
    return {
      bp: aggregateByDay(filteredData.bp, ["systolic", "diastolic"]),
      hr: aggregateByDay(filteredData.hr, ["value"]),
      weight: aggregateByDay(filteredData.weight, ["value"]),
      mood: aggregateByDay(filteredData.mood, ["value"]),
      events: filteredData.events,
      ecgs: filteredData.ecgs,
      missed: filteredData.missed,
    };
  }, [filteredData, range]);

  /* Keyboard shortcuts */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "Escape") { setSidePanel(null); setEcgDrawer(null); }
      if (e.key === "t" && !e.ctrlKey && !e.metaKey) setViewMode(v => v === "chart" ? "table" : "chart");
      if (e.key === "d" && !e.ctrlKey && !e.metaKey) setTheme(t => t === "dark" ? "light" : "dark");
      if (e.key === "1" && !e.ctrlKey && !e.metaKey) { setRange(14); setChartOffset(0); }
      if (e.key === "2" && !e.ctrlKey && !e.metaKey) { setRange(30); setChartOffset(0); }
      if (e.key === "3" && !e.ctrlKey && !e.metaKey) { setRange(60); setChartOffset(0); }
      if (e.key === "4" && !e.ctrlKey && !e.metaKey) { setRange(90); setChartOffset(0); }
      if (e.key === "g" && !e.ctrlKey && !e.metaKey) setVis(v => ({ ...v, thresholds: !v.thresholds }));
      if (e.key === "m" && !e.ctrlKey && !e.metaKey) setVis(v => ({ ...v, missed: !v.missed }));
      if (e.key === "w" && !e.ctrlKey && !e.metaKey) setVis(v => ({ ...v, values: !v.values }));
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
    const end = new Date(NOW); end.setDate(end.getDate() - chartOffset);
    const start = new Date(end); start.setDate(start.getDate() - range);
    return [start, end] as [Date, Date];
  }, [range, chartOffset]);

  /* Chart dimensions — responsive: fill container width */
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [chartContainerW, setChartContainerW] = useState(900);
  useEffect(() => {
    const el = chartContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.floor(entry.contentRect.width);
        if (w > 0) setChartContainerW(w);
      }
    });
    ro.observe(el);
    setChartContainerW(el.clientWidth || 900);
    return () => ro.disconnect();
  }, [patientTab, viewMode]);
  const chartW = chartContainerW;
  const chartH = (type: string) => expanded === type ? 300 : range <= 14 ? 200 : range <= 30 ? 180 : 160;
  const margin = { top: 28, right: 48, bottom: 8, left: 64 };
  const innerW = chartW - margin.left - margin.right;
  const innerH = (type: string) => chartH(type) - margin.top - margin.bottom;

  /* Adaptive detail levels based on range */
  const detail = useMemo(() => ({
    lineWidth: range <= 14 ? 2.5 : range <= 30 ? 2 : 1.5,
    dotRadius: range <= 14 ? 5 : range <= 30 ? 4 : 3,
    hitRadius: range <= 14 ? 12 : range <= 30 ? 10 : 8,
    showDots: range <= 30,
    showValues: vis.values,
    xTickCount: range <= 14 ? 14 : range <= 30 ? 15 : range <= 60 ? 10 : 13,
    xTickFormat: d3.timeFormat("%d.%m."),
    medianWidth: range <= 14 ? 1.5 : 1,
    gridOpacity: range <= 30 ? 1 : 0.7,
  }), [range]);

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
    thresholds?: { upper?: number; lower?: number },
    stats?: { p10: number; median: number; p90: number }
  ) => {
    const isExpanded = expanded === type;
    const h = chartH(type);
    const iH = innerH(type);
    const yS = d3.scaleLinear().domain(yDomain).range([iH, 0]);
    const ticks = generateYTicks(yDomain, 5);
    const clipId = `clip-${type}`;

    return (
      <div key={type} className="rounded-md overflow-hidden shadow-sm transition-all" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
          <div className="flex items-center gap-3">
            {icon}
            <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>{label}</span>
            {stats ? (
              <div className="flex items-center gap-0" style={{ color: P.textMuted }}>
                <span className="text-[11px] font-normal tabular-nums" style={{ color: P.textDim }}>{stats.p10}</span>
                <svg width={80} height={26} viewBox="0 0 80 26" style={{ margin: "0 3px" }}>
                  <line x1={0} y1={18} x2={80} y2={18} stroke={P.gridLabel} strokeWidth={3} strokeLinecap="round" />
                  <circle cx={stats.p90 === stats.p10 ? 40 : 4 + ((stats.median - stats.p10) / (stats.p90 - stats.p10)) * 72} cy={18} r={3.5} fill={P.text} />
                  <text x={stats.p90 === stats.p10 ? 40 : 4 + ((stats.median - stats.p10) / (stats.p90 - stats.p10)) * 72} y={10} textAnchor="middle" fill={P.text} fontSize={10} fontFamily="IBM Plex Sans" fontWeight={600}>~{stats.median}</text>
                </svg>
                <span className="text-[11px] font-normal tabular-nums" style={{ color: P.textDim }}>{stats.p90}</span>
                <span className="text-[11px] font-normal ml-1" style={{ color: P.textDim }}>{unit}</span>
              </div>
            ) : (
              <span className="text-sm font-normal" style={{ color: P.textMuted }}>{yDomain[0]}–{yDomain[1]} {unit}</span>
            )}
          </div>
          <button onClick={() => setExpanded(isExpanded ? null : type)} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}>
            {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
        {/* Chart area — responsive width */}
        <div>
          <svg width="100%" height={h} viewBox={`0 0 ${chartW} ${h}`} preserveAspectRatio="xMidYMid meet"
            onMouseMove={(e) => {
              const svg = e.currentTarget;
              const rect = svg.getBoundingClientRect();
              const svgX = (e.clientX - rect.left) * (chartW / rect.width) - margin.left;
              if (svgX >= 0 && svgX <= innerW) {
                setCrossHairDate(xScale.invert(svgX));
              }
            }}
            onMouseLeave={() => setCrossHairDate(null)}
          >
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
                  {type !== "mood" && <text x={-10} y={yS(t)} dy="0.35em" textAnchor="end" fill={P.gridLabel} fontSize={13} fontFamily="IBM Plex Sans">{t}</text>}
                </g>
              ))}
              {/* Thresholds — clickable to go to settings */}
              {vis.thresholds && thresholds?.upper && yDomain[1] >= thresholds.upper && (
                <g onClick={() => setPage("thresholds")} className="cursor-pointer">
                  <line x1={0} x2={innerW} y1={yS(thresholds.upper)} y2={yS(thresholds.upper)} stroke={P.threshUpper} strokeWidth={1.2} strokeDasharray="6,4" opacity={0.6} />
                  <rect x={0} y={yS(thresholds.upper) - 6} width={innerW} height={12} fill="transparent" />
                  <title>Grenzwert-Einstellungen öffnen</title>
                </g>
              )}
              {vis.thresholds && thresholds?.lower && yDomain[0] <= thresholds.lower && (
                <g onClick={() => setPage("thresholds")} className="cursor-pointer">
                  <line x1={0} x2={innerW} y1={yS(thresholds.lower)} y2={yS(thresholds.lower)} stroke={P.threshLower} strokeWidth={1.2} strokeDasharray="6,4" opacity={0.6} />
                  <rect x={0} y={yS(thresholds.lower) - 6} width={innerW} height={12} fill="transparent" />
                  <title>Grenzwert-Einstellungen öffnen</title>
                </g>
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
              {crossHairDate && (() => {
                const cx = xScale(crossHairDate);
                if (cx < 0 || cx > innerW) return null;
                const dateStr = d3.timeFormat("%d.%m.%Y")(crossHairDate);
                return (
                  <g>
                    <line x1={cx} y1={0} x2={cx} y2={iH} stroke={P.textMuted} strokeWidth={1} strokeDasharray="3,3" opacity={0.6} />
                    <rect x={cx - 36} y={iH - 18} width={72} height={16} rx={3} fill={P.bgCard} opacity={0.85} />
                    <text x={cx} y={iH - 6} textAnchor="middle" fill={P.text} fontSize={11} fontFamily="IBM Plex Sans" fontWeight={500}>
                      {dateStr}
                    </text>
                  </g>
                );
              })()}
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
  const bpAllVals = useMemo(() => [...allData.bp.map(p => p.systolic), ...allData.bp.map(p => p.diastolic)], [allData.bp]);
  const bpYDomain = useMemo(() => niceYDomain(bpAllVals, 0.08), [bpAllVals]);
  const bpStats = useMemo(() => {
    const sysVals = chartData.bp.map(p => p.systolic);
    const diaVals = chartData.bp.map(p => p.diastolic);
    return {
      p10: percentile(sysVals, 10),
      median: percentile(sysVals, 50),
      p90: percentile(sysVals, 90),
    };
  }, [chartData.bp]);
  const bpChart = renderChart("bp", tr.bloodPressure, <Activity size={18} color={P.bpSystolic} />, P.bpSystolic,
    (xS, yS, iH) => {
      const sysLine = d3.line<BpPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.systolic)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const diaLine = d3.line<BpPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.diastolic)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const medVals = rollingMedian(chartData.bp.map(p => ({ date: p.date, v: p.systolic })));
      const medLine = d3.line<{ date: string; v: number }>().x(d => xS(new Date(d.date))).y(d => yS(d.v)).curve(d3.curveCatmullRom);

      return (
        <g>
          <path d={sysLine(chartData.bp) || ""} fill="none" stroke={P.detailLine} strokeWidth={detail.lineWidth} />
          <path d={diaLine(chartData.bp) || ""} fill="none" stroke={P.detailLine} strokeWidth={detail.lineWidth} />
          <path d={medLine(medVals) || ""} fill="none" stroke={P.median} strokeWidth={detail.medianWidth} strokeDasharray="4,4" opacity={0.5} />
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
          {chartData.bp.map((p, i) => {
            const x = xS(new Date(p.date));
            const ySys = yS(p.systolic);
            const yDia = yS(p.diastolic);
            const s = detail.dotRadius;
            const tickW = 6;
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "bp", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "bp", date: p.date, data: p })}
                className="cursor-pointer">
                <rect x={x - detail.hitRadius} y={Math.min(ySys, yDia) - detail.hitRadius} width={detail.hitRadius * 2} height={Math.abs(yDia - ySys) + detail.hitRadius * 2} fill="transparent" />
                {/* Individual readings as light gray horizontal ticks */}
                {p.readings.length > 1 && p.readings.map((r, ri) => (
                  <g key={`rd-${ri}`}>
                    <line x1={x - tickW} x2={x + tickW} y1={yS(r.systolic)} y2={yS(r.systolic)} stroke={P.gridLabel} strokeWidth={1.5} opacity={0.4} />
                    <line x1={x - tickW} x2={x + tickW} y1={yS(r.diastolic)} y2={yS(r.diastolic)} stroke={P.gridLabel} strokeWidth={1.5} opacity={0.4} />
                  </g>
                ))}
                {/* Median (average) point as main marker */}
                <polygon points={`${x},${ySys - s - 1} ${x - s},${ySys + s - 1} ${x + s},${ySys + s - 1}`} fill={p.alarm || p.outlier ? P.bpSystolic : P.detailLine} />
                <polygon points={`${x},${yDia + s + 1} ${x - s},${yDia - s + 1} ${x + s},${yDia - s + 1}`} fill={p.alarm || p.outlier ? P.bpDiastolic : P.detailLine} />
                <line x1={x} y1={ySys + s - 1} x2={x} y2={yDia - s + 1} stroke={P.detailLine} strokeWidth={1} opacity={0.3} />
                {detail.showValues && (
                  <>
                    <text x={x} y={ySys - s - 4} dy="0.35em" fontSize={10} fill={p.alarm || p.outlier ? P.bpSystolic : P.detailLine} fontFamily="IBM Plex Sans" textAnchor="middle">{p.systolic}</text>
                    <text x={x} y={yDia + s + 4} dy="0.35em" fontSize={10} fill={p.alarm || p.outlier ? P.bpDiastolic : P.detailLine} fontFamily="IBM Plex Sans" textAnchor="middle">{p.diastolic}</text>
                  </>
                )}
                {p.alarm && <AlarmDot x={x} y={ySys - s - 1} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={ySys} validated={p.outlierValidated} />}
              </g>
            );
          })}
          {chartData.bp.length > 7 && (() => {
            const trend = detectTrend(chartData.bp.map(p => p.systolic));
            const last = chartData.bp[chartData.bp.length - 1];
            if (trend === "stable") return null;
            return <g transform={`translate(${xS(new Date(last.date)) + 12},${yS(last.systolic) - 10})`}><SvgTrendArrow trend={trend} color={trend === "up" ? P.danger : P.good} /></g>;
          })()}
        </g>
      );
    },
    bpYDomain, "mmHg", { upper: 140, lower: 90 },
    bpStats
  );

  /* ─── HR Chart ─── */
  const hrYDomain = useMemo(() => niceYDomain(allData.hr.map(p => p.value), 0.1), [allData.hr]);
  const hrStats = useMemo(() => {
    const vals = chartData.hr.map(p => p.value);
    return { p10: percentile(vals, 10), median: percentile(vals, 50), p90: percentile(vals, 90) };
  }, [chartData.hr]);
  const hrChart = renderChart("hr", tr.heartRate, <Heart size={18} color={P.heartRate} />, P.heartRate,
    (xS, yS, iH) => {
      const line = d3.line<HrPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.value)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);
      const medVals = rollingMedian(chartData.hr.map(p => ({ date: p.date, v: p.value })));
      const medLine = d3.line<{ date: string; v: number }>().x(d => xS(new Date(d.date))).y(d => yS(d.v)).curve(d3.curveCatmullRom);

      return (
        <g>
          <path d={line(chartData.hr) || ""} fill="none" stroke={P.detailLine} strokeWidth={detail.lineWidth} />
          <path d={medLine(medVals) || ""} fill="none" stroke={P.median} strokeWidth={detail.medianWidth} strokeDasharray="4,4" opacity={0.5} />
          {/* Median hover points */}
          {medVals.map((mv, i) => {
            const x = xS(new Date(mv.date));
            const y = yS(mv.v);
            return (
              <g key={`med-${i}`}
                onMouseEnter={(e) => handleDataHover({ type: "median", date: mv.date, label: "Median Herzfrequenz", value: mv.v, unit: "bpm" }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}>
                <circle cx={x} cy={y} r={detail.hitRadius} fill="transparent" className="cursor-crosshair" />
              </g>
            );
          })}
          {chartData.hr.map((p, i) => {
            const x = xS(new Date(p.date));
            const y = yS(p.value);
            const s = detail.dotRadius;
            const tickW = 6;
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "hr", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "hr", date: p.date, data: p })}
                className="cursor-pointer">
                <circle cx={x} cy={y} r={detail.hitRadius} fill="transparent" />
                {/* Individual readings as light gray horizontal ticks */}
                {p.readings.length > 1 && p.readings.map((r, ri) => (
                  <line key={`rd-${ri}`} x1={x - tickW} x2={x + tickW} y1={yS(r.value)} y2={yS(r.value)} stroke={P.gridLabel} strokeWidth={1.5} opacity={0.4} />
                ))}
                {/* Median (average) point as main marker */}
                <polygon points={`${x - s},${y} ${x},${y - s} ${x + s},${y} ${x},${y + s}`} fill={p.alarm || p.outlier ? P.heartRate : P.detailLine} />
                {detail.showValues && <text x={x} y={y - s - 4} fontSize={10} fill={p.alarm || p.outlier ? P.heartRate : P.detailLine} fontFamily="IBM Plex Sans" textAnchor="middle">{p.value}</text>}
                {p.alarm && <AlarmDot x={x} y={y - s} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={y} validated={p.outlierValidated} />}
              </g>
            );
          })}
          {chartData.hr.length > 7 && (() => {
            const trend = detectTrend(chartData.hr.map(p => p.value));
            const last = chartData.hr[chartData.hr.length - 1];
            if (trend === "stable") return null;
            return <g transform={`translate(${xS(new Date(last.date)) + 12},${yS(last.value) - 10})`}><SvgTrendArrow trend={trend} color={trend === "up" ? P.warning : P.good} /></g>;
          })()}
        </g>
      );
    },
    hrYDomain, "bpm", { upper: 100, lower: 60 },
    hrStats
  );

  /* ─── Weight Chart ─── */
  const wYDomain = useMemo(() => niceYDomain(allData.weight.map(p => p.value), 0.12), [allData.weight]);
  const wStats = useMemo(() => {
    const vals = chartData.weight.map(p => p.value);
    return { p10: Math.round(percentile(vals, 10) * 10) / 10, median: Math.round(percentile(vals, 50) * 10) / 10, p90: Math.round(percentile(vals, 90) * 10) / 10 };
  }, [chartData.weight]);
  const weightChart = renderChart("weight", tr.weight, <Weight size={18} color={P.weight} />, P.weight,
    (xS, yS, iH) => {
      const line = d3.line<WeightPoint>().x(d => xS(new Date(d.date))).y(d => yS(d.value)).defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      }).curve(d3.curveMonotoneX);

      return (
        <g>
          <path d={line(chartData.weight) || ""} fill="none" stroke={P.detailLine} strokeWidth={detail.lineWidth} />
          {chartData.weight.map((p, i) => {
            const x = xS(new Date(p.date));
            const y = yS(p.value);
            const tickW = 6;
            return (
              <g key={i}
                onMouseEnter={(e) => handleDataHover({ type: "weight", ...p }, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleDataLeave}
                onClick={() => setSidePanel({ type: "weight", date: p.date, data: p })}
                className="cursor-pointer">
                <circle cx={x} cy={y} r={detail.hitRadius} fill="transparent" />
                {/* Individual readings as light gray horizontal ticks */}
                {p.readings.length > 1 && p.readings.map((r, ri) => (
                  <line key={`rd-${ri}`} x1={x - tickW} x2={x + tickW} y1={yS(r.value)} y2={yS(r.value)} stroke={P.gridLabel} strokeWidth={1.5} opacity={0.4} />
                ))}
                {/* Median (average) point as main marker */}
                <circle cx={x} cy={y} r={detail.dotRadius} fill={p.alarm || p.outlier ? P.weight : P.detailLine} />
                {detail.showValues && <text x={x} y={y - detail.dotRadius - 4} fontSize={10} fill={p.alarm || p.outlier ? P.weight : P.detailLine} fontFamily="IBM Plex Sans" textAnchor="middle">{p.value.toFixed(1)}</text>}
                {p.alarm && <AlarmDot x={x} y={y} alarm={p.alarm} />}
                {p.outlier && <OutlierRing x={x} y={y} validated={p.outlierValidated} />}
              </g>
            );
          })}
        </g>
      );
    },
    wYDomain, "kg", { upper: wYDomain[1] - 2, lower: wYDomain[0] + 2 },
    wStats
  );

  /* ─── Mood Chart ─── */
  const moodChart = renderChart("mood", tr.mood, <Smile size={18} color={P.mood} />, P.mood,
    (xS, yS, iH) => (
      <g>
        {/* Emoji y-axis labels */}
        {[1, 2, 3, 4, 5].map(v => {
          const MoodIcon = moodFaces[v] || MoodFace3;
          return (
            <foreignObject key={`yemoji-${v}`} x={-52} y={yS(v) - 8} width={20} height={20}>
              <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <MoodIcon size={16} color={moodColor(v)} />
              </div>
            </foreignObject>
          );
        })}
        {/* Gray measurement dots */}
        {chartData.mood.map((p, i) => {
          const x = xS(new Date(p.date));
          const y = yS(p.value);
          return (
            <g key={i}
              onMouseEnter={(e) => handleDataHover({ type: "mood", ...p }, e)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleDataLeave}
              onClick={() => setSidePanel({ type: "mood", date: p.date, data: p })}
              className="cursor-pointer">
              <circle cx={x} cy={y} r={detail.hitRadius} fill="transparent" />
              <circle cx={x} cy={y} r={detail.dotRadius} fill={P.detailLine} />
              {detail.showValues && (
                <text x={x} y={y - detail.dotRadius - 4} fontSize={9} fill={P.detailLine} fontFamily="IBM Plex Sans" textAnchor="middle">
                  {(moodLabels[lang] || moodLabels.de)[Math.round(p.value)]}
                </text>
              )}
            </g>
          );
        })}
      </g>
    ),
    [0.5, 5.5], "", undefined
  );

  /* ─── Overview Chart (dual Y-axis: left for BP/HR/Mood, right for Weight) ─── */
  const overviewChart = (() => {
    const isOvExpanded = expanded === "overview";
    const h = isOvExpanded ? 300 : 200;
    const iH = h - margin.top - margin.bottom;

    // Left scale: BP/HR/Mood range (60-160 covers both BP systolic and HR reasonably)
    const leftMin = 60, leftMax = 160;
    const yScaleLeft = d3.scaleLinear().domain([leftMin, leftMax]).range([iH, 0]);

    // Right scale: Weight (actual min/max from data)
    const weightMin = allData.weight.length > 0 ? Math.min(...allData.weight.map(p => p.value)) : 70;
    const weightMax = allData.weight.length > 0 ? Math.max(...allData.weight.map(p => p.value)) : 100;
    const yScaleRight = d3.scaleLinear().domain([weightMin, weightMax]).range([iH, 0]);

    // Map mood (1-5) to left scale (normalized to 60-160 range)
    const mapMoodToLeftScale = (mood: number) => {
      return leftMin + ((mood - 1) / 4) * (leftMax - leftMin);
    };

    const sysLine = d3.line<BpPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScaleLeft(d.systolic))
      .defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      })
      .curve(d3.curveMonotoneX);

    const diaLine = d3.line<BpPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScaleLeft(d.diastolic))
      .defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      })
      .curve(d3.curveMonotoneX);

    const hrLine = d3.line<HrPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScaleLeft(d.value))
      .defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      })
      .curve(d3.curveMonotoneX);

    const weightLine = d3.line<WeightPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScaleRight(d.value))
      .defined((d, i, arr) => {
        if (i === 0) return true;
        return (new Date(d.date).getTime() - new Date(arr[i - 1].date).getTime()) < 48 * 3600 * 1000;
      })
      .curve(d3.curveMonotoneX);

    const moodLine = d3.line<MoodPoint>()
      .x(d => xScale(new Date(d.date)))
      .y(d => yScaleLeft(mapMoodToLeftScale(d.value)))
      .curve(d3.curveMonotoneX);

    // Hover handler
    const handleOverviewHover = (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left - margin.left;
      if (x < 0 || x > innerW) {
        setOverviewHover(null);
        return;
      }
      const xValue = xScale.invert(x);
      const data: Record<string, any> = {};
      let yPos = iH;

      if (overviewVisible.sys && filteredData.bp.length > 0) {
        const nearest = filteredData.bp.reduce((prev, curr) =>
          Math.abs(new Date(curr.date).getTime() - xValue.getTime()) <
          Math.abs(new Date(prev.date).getTime() - xValue.getTime()) ? curr : prev
        );
        data.sys = { value: nearest.systolic, date: nearest.date };
        yPos = Math.min(yPos, yScaleLeft(nearest.systolic));
      }
      if (overviewVisible.dia && filteredData.bp.length > 0) {
        const nearest = filteredData.bp.reduce((prev, curr) =>
          Math.abs(new Date(curr.date).getTime() - xValue.getTime()) <
          Math.abs(new Date(prev.date).getTime() - xValue.getTime()) ? curr : prev
        );
        data.dia = { value: nearest.diastolic, date: nearest.date };
        yPos = Math.min(yPos, yScaleLeft(nearest.diastolic));
      }
      if (overviewVisible.hr && filteredData.hr.length > 0) {
        const nearest = filteredData.hr.reduce((prev, curr) =>
          Math.abs(new Date(curr.date).getTime() - xValue.getTime()) <
          Math.abs(new Date(prev.date).getTime() - xValue.getTime()) ? curr : prev
        );
        data.hr = { value: nearest.value, date: nearest.date };
        yPos = Math.min(yPos, yScaleLeft(nearest.value));
      }
      if (overviewVisible.weight && filteredData.weight.length > 0) {
        const nearest = filteredData.weight.reduce((prev, curr) =>
          Math.abs(new Date(curr.date).getTime() - xValue.getTime()) <
          Math.abs(new Date(prev.date).getTime() - xValue.getTime()) ? curr : prev
        );
        data.weight = { value: nearest.value, date: nearest.date };
        yPos = Math.min(yPos, yScaleRight(nearest.value));
      }
      if (overviewVisible.mood && filteredData.mood.length > 0) {
        const nearest = filteredData.mood.reduce((prev, curr) =>
          Math.abs(new Date(curr.date).getTime() - xValue.getTime()) <
          Math.abs(new Date(prev.date).getTime() - xValue.getTime()) ? curr : prev
        );
        data.mood = { value: nearest.value, date: nearest.date };
        yPos = Math.min(yPos, yScaleLeft(mapMoodToLeftScale(nearest.value)));
      }

      setOverviewHover({ xPos: x, yPos, data });
      setCrossHairDate(xValue);
    };

    const handleOverviewLeave = () => {
      setOverviewHover(null);
      setCrossHairDate(null);
    };

    return (
      <div className="rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
          <div className="flex items-center gap-3">
            <Activity size={18} color={P.text} />
            <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>{tr.overview}</span>
          </div>
          <button onClick={() => setExpanded(expanded === "overview" ? null : "overview")} className="p-1.5 rounded-lg transition-colors" style={{ color: P.textMuted }}>
            {expanded === "overview" ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <svg width="100%" height={h} viewBox={`0 0 ${chartW} ${h}`} preserveAspectRatio="xMidYMid meet"
            onMouseMove={handleOverviewHover}
            onMouseLeave={handleOverviewLeave}
          >
            <defs>
              <clipPath id="clip-overview">
                <rect x={0} y={0} width={innerW} height={iH} />
              </clipPath>
            </defs>
            <g transform={`translate(${margin.left},${margin.top})`}>
              {/* Left grid lines and labels (60, 80, 100, 120, 140, 160) */}
              {[60, 80, 100, 120, 140, 160].map(t => (
                <g key={`left-${t}`}>
                  <line x1={0} x2={innerW} y1={yScaleLeft(t)} y2={yScaleLeft(t)} stroke={P.grid} strokeWidth={0.8} opacity={0.5} />
                  <text x={-10} y={yScaleLeft(t)} dy="0.35em" textAnchor="end" fill={P.gridLabel} fontSize={11} fontFamily="IBM Plex Sans">{t}</text>
                </g>
              ))}
              {/* Right scale labels (weight) */}
              {[Math.ceil(weightMin), Math.floor(weightMax)].length > 1 &&
                [Math.ceil(weightMin), Math.round((weightMin + weightMax) / 2), Math.floor(weightMax)].map(t => (
                  <text key={`right-${t}`} x={innerW + 10} y={yScaleRight(t)} dy="0.35em" textAnchor="start" fill={P.gridLabel} fontSize={11} fontFamily="IBM Plex Sans">{t.toFixed(1)}</text>
                ))
              }
              {/* Clipped content */}
              <g clipPath="url(#clip-overview)">
                {overviewVisible.sys && <>
                  <path d={sysLine(chartData.bp) || ""} fill="none" stroke={P.bpSystolic} strokeWidth={1.2} opacity={0.5} />
                  {chartData.bp.map((p, i) => {
                    const x = xScale(new Date(p.date));
                    const y = yScaleLeft(p.systolic);
                    const s = 3;
                    return <polygon key={`sys-${i}`} points={`${x},${y - s - 1} ${x - s},${y + s - 1} ${x + s},${y + s - 1}`} fill={P.bpSystolic} />;
                  })}
                </>}
                {overviewVisible.dia && <>
                  <path d={diaLine(chartData.bp) || ""} fill="none" stroke={P.bpDiastolic} strokeWidth={1.2} opacity={0.5} />
                  {chartData.bp.map((p, i) => {
                    const x = xScale(new Date(p.date));
                    const y = yScaleLeft(p.diastolic);
                    const s = 3;
                    return <polygon key={`dia-${i}`} points={`${x},${y + s + 1} ${x - s},${y - s + 1} ${x + s},${y - s + 1}`} fill={P.bpDiastolic} />;
                  })}
                </>}
                {overviewVisible.hr && <>
                  <path d={hrLine(chartData.hr) || ""} fill="none" stroke={P.heartRate} strokeWidth={1.2} opacity={0.5} />
                  {chartData.hr.map((p, i) => {
                    const x = xScale(new Date(p.date));
                    const y = yScaleLeft(p.value);
                    const s = 3;
                    return <polygon key={`hr-${i}`} points={`${x - s},${y} ${x},${y - s} ${x + s},${y} ${x},${y + s}`} fill={P.heartRate} />;
                  })}
                </>}
                {overviewVisible.weight && <>
                  <path d={weightLine(chartData.weight) || ""} fill="none" stroke={P.weight} strokeWidth={1.2} opacity={0.5} />
                  {chartData.weight.map((p, i) => <circle key={`w-${i}`} cx={xScale(new Date(p.date))} cy={yScaleRight(p.value)} r={2.5} fill={P.weight} />)}
                </>}
                {overviewVisible.mood && <>
                  <path d={moodLine(chartData.mood) || ""} fill="none" stroke={P.mood} strokeWidth={1.2} opacity={0.5} />
                  {chartData.mood.map((p, i) => <circle key={`m-${i}`} cx={xScale(new Date(p.date))} cy={yScaleLeft(mapMoodToLeftScale(p.value))} r={2.5} fill={P.mood} />)}
                </>}
                {/* Hover vertical line */}
                {overviewHover && (
                  <line x1={overviewHover.xPos} y1={0} x2={overviewHover.xPos} y2={iH} stroke={P.textMuted} strokeWidth={1} opacity={0.5} strokeDasharray="3,3" />
                )}
                {/* Crosshair from detail charts */}
                {crossHairDate && (() => {
                  const cx = xScale(crossHairDate);
                  if (cx < 0 || cx > innerW) return null;
                  const dateStr = d3.timeFormat("%d.%m.%Y")(crossHairDate);
                  return (
                    <g>
                      <line x1={cx} y1={0} x2={cx} y2={iH} stroke={P.textMuted} strokeWidth={1} strokeDasharray="3,3" opacity={0.6} />
                      <rect x={cx - 36} y={iH - 18} width={72} height={16} rx={3} fill={P.bgCard} opacity={0.85} />
                      <text x={cx} y={iH - 6} textAnchor="middle" fill={P.text} fontSize={11} fontFamily="IBM Plex Sans" fontWeight={500}>
                        {dateStr}
                      </text>
                    </g>
                  );
                })()}
              </g>
            </g>
          </svg>
          {/* Hover tooltip */}
          {overviewHover && (
            <div
              style={{
                position: "absolute",
                left: `calc(${(margin.left + overviewHover.xPos) / chartW * 100}% - 50px)`,
                top: `${Math.max(0, margin.top + overviewHover.yPos - 80)}px`,
                backgroundColor: P.bgPanel,
                border: `1px solid ${P.border}`,
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "12px",
                zIndex: 10,
                pointerEvents: "none",
              }}
            >
              {overviewHover.data.sys && <div style={{ color: P.bpSystolic }}>Sys: {overviewHover.data.sys.value} mmHg</div>}
              {overviewHover.data.dia && <div style={{ color: P.bpDiastolic }}>Dia: {overviewHover.data.dia.value} mmHg</div>}
              {overviewHover.data.hr && <div style={{ color: P.heartRate }}>HR: {overviewHover.data.hr.value} bpm</div>}
              {overviewHover.data.weight && <div style={{ color: P.weight }}>{tr.weight}: {overviewHover.data.weight.value.toFixed(1)} kg</div>}
              {overviewHover.data.mood && <div style={{ color: P.mood }}>{tr.mood}: {overviewHover.data.mood.value}/5</div>}
            </div>
          )}
        </div>
      </div>
    );
  })();

  /* ─── Calendar View (Events + ECG) ─── */
  const nonEcgEvents = filteredData.events;
  const alarmEcgAsEvents = filteredData.ecgs.filter(e => e.alarm);

  const eventCounts = useMemo(() => {
    const abCount = filteredData.events.filter(e => e.type === "atrialBurden").length;
    const ecgCount = filteredData.ecgs.length;
    return { abCount, ecgCount };
  }, [filteredData.events, filteredData.ecgs]);

  const calendarData = useMemo(() => {
    const map: Record<string, { events: EventItem[]; ecgs: EcgEvent[] }> = {};
    for (const ev of filteredData.events) {
      const key = ev.date.slice(0, 10);
      if (!map[key]) map[key] = { events: [], ecgs: [] };
      map[key].events.push(ev);
    }
    for (const ecg of filteredData.ecgs) {
      const key = ecg.date.slice(0, 10);
      if (!map[key]) map[key] = { events: [], ecgs: [] };
      map[key].ecgs.push(ecg);
    }
    return map;
  }, [filteredData.events, filteredData.ecgs]);

  const calendarMonths = useMemo(() => {
    const start = new Date(xDomain[0]);
    const end = new Date(xDomain[1]);
    start.setDate(1);
    const months: { year: number; month: number }[] = [];
    const cur = new Date(start);
    while (cur <= end) {
      months.push({ year: cur.getFullYear(), month: cur.getMonth() });
      cur.setMonth(cur.getMonth() + 1);
    }
    return months;
  }, [xDomain]);

  const episodeTimelineData = useMemo(() => {
    const episodeTypes = ["VT1", "VT2", "VF", "ATR", "NST", "AT/AF", "Periodic IEGM"];
    const weeks: { weekStart: string; weekEnd: string; episodes: any[]; counts: Record<string, number> }[] = [];

    const start = new Date(DATA_START);
    const end = new Date(NOW);
    const current = new Date(start);
    current.setDate(current.getDate() - current.getDay() + 1);

    while (current < end) {
      const weekStart = new Date(current);
      const weekEnd = new Date(current);
      weekEnd.setDate(weekEnd.getDate() + 6);

      const ws = weekStart.toISOString().split("T")[0];
      const we = weekEnd.toISOString().split("T")[0];

      const weekEcgs = allData.ecgs.filter(e => e.date >= ws && e.date <= we);
      const weekABEvents = allData.events.filter(e => e.type === "atrialBurden" && e.date >= ws && e.date <= we);

      const episodes: any[] = [];
      const counts: Record<string, number> = {};

      weekEcgs.forEach(ecg => {
        const type = ecg.trigger === "VT-Stimulation" ? "VT1" :
                     ecg.trigger === "Tachykardieepisode" ? "VT2" :
                     ecg.trigger === "Vorhofflimmerdetektion" ? "ATR" :
                     ecg.trigger === "AT/AF-Episode" ? "AT/AF" :
                     ecg.trigger === "Manuelle Auslösung" ? "NST" : "Periodic IEGM";
        episodes.push({ ...ecg, episodeType: type, therapy: type === "VT1" ? "No therapies" : type === "VT2" ? "2 ATP, Shock" : type === "ATR" ? "10 ATP" : "Monitoring only", result: type === "ATR" ? "Successful" : type === "VT2" ? "Unsuccessful" : "-" });
        counts[type] = (counts[type] || 0) + 1;
      });

      weekABEvents.forEach(ev => {
        episodes.push({ date: ev.date, time: "—", episodeType: "AT/AF", label: ev.label, duration: 0 });
        counts["AT/AF"] = (counts["AT/AF"] || 0) + 1;
      });

      weeks.push({ weekStart: ws, weekEnd: we, episodes, counts });
      current.setDate(current.getDate() + 7);
    }

    return weeks;
  }, [allData]);

  const EPISODE_COLORS: Record<string, string> = {
    "VT1": "#ef4444", "VT2": "#dc2626", "VF": "#991b1b",
    "ATR": "#f59e0b", "AT/AF": "#f97316", "NST": "#60a5fa", "Periodic IEGM": "#a1a1aa",
  };

  const episodeTimelineChart = (() => {
    const h = 180;
    const m = { top: 30, right: 20, bottom: 40, left: 50 };
    const iW = chartW - m.left - m.right;
    const iH = h - m.top - m.bottom;

    const visibleWeeks = episodeTimelineData.filter(w => {
      const ws = new Date(w.weekStart);
      const we = new Date(w.weekEnd);
      return we >= xDomain[0] && ws <= xDomain[1];
    });

    const maxCount = Math.max(1, ...visibleWeeks.map(w => w.episodes.length));
    const yScale = d3.scalePow().exponent(0.7).domain([0, maxCount]).range([iH, 0]);
    const barW = Math.max(4, Math.min(20, iW / Math.max(1, visibleWeeks.length) - 2));

    const yTicks = [0, 1, 2, 5, 10, 20, 50].filter(t => t <= maxCount);
    if (maxCount > 50) yTicks.push(maxCount);

    return (
      <div className="rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
        <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${P.border}` }}>
          <div className="flex items-center gap-3">
            <BarChart3 size={18} color={P.text} />
            <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>Episoden-Zeitleiste</span>
          </div>
          <div className="flex items-center gap-3 text-xs" style={{ color: P.textMuted }}>
            {Object.entries(EPISODE_COLORS).map(([type, color]) => (
              <span key={type} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
                {type}
              </span>
            ))}
          </div>
        </div>
        <svg width="100%" height={h} viewBox={`0 0 ${chartW} ${h}`} preserveAspectRatio="xMidYMid meet">
          <g transform={`translate(${m.left},${m.top})`}>
            {yTicks.map(t => (
              <g key={t}>
                <line x1={0} x2={iW} y1={yScale(t)} y2={yScale(t)} stroke={P.grid} strokeWidth={0.8} opacity={0.5} />
                <text x={-8} y={yScale(t)} dy="0.35em" textAnchor="end" fill={P.gridLabel} fontSize={10} fontFamily="IBM Plex Sans">{t}</text>
              </g>
            ))}
            {visibleWeeks.map((week, i) => {
              const midDate = new Date(week.weekStart);
              midDate.setDate(midDate.getDate() + 3);
              const centerX = xScale(midDate);
              const total = week.episodes.length;
              if (total === 0) return null;

              // Group: VT1+VT2 stacked, others separate
              const vtStack = ["VT1", "VT2"];
              const otherTypes = Object.keys(week.counts).filter(t => !vtStack.includes(t) && week.counts[t] > 0);
              const hasVt = vtStack.some(t => (week.counts[t] || 0) > 0);
              const slotCount = (hasVt ? 1 : 0) + otherTypes.length;
              if (slotCount === 0) return null;
              const totalBarW = barW * 1.5;
              const slotW = Math.max(3, totalBarW / slotCount);
              const startX = centerX - (slotCount * slotW) / 2;
              let slotIdx = 0;

              const bars: React.ReactNode[] = [];

              // VT stack
              if (hasVt) {
                const sx = startX + slotIdx * slotW;
                let yOff = iH;
                vtStack.forEach(type => {
                  const count = week.counts[type] || 0;
                  if (count > 0) {
                    const barH = iH - yScale(count);
                    yOff -= barH;
                    bars.push(
                      <rect key={`${i}-${type}`} x={sx} y={yOff} width={slotW - 1} height={barH}
                        fill={EPISODE_COLORS[type] || P.alarmGray} rx={1} opacity={0.85} />
                    );
                  }
                });
                slotIdx++;
              }

              // Other types side by side
              otherTypes.forEach(type => {
                const count = week.counts[type] || 0;
                const sx = startX + slotIdx * slotW;
                const barH = iH - yScale(count);
                bars.push(
                  <rect key={`${i}-${type}`} x={sx} y={iH - barH} width={slotW - 1} height={barH}
                    fill={EPISODE_COLORS[type] || P.alarmGray} rx={1} opacity={0.85} />
                );
                slotIdx++;
              });

              return (
                <g key={i} className="cursor-pointer" onClick={() => setEpisodeSidebar({ date: week.weekStart, episodes: week.episodes })}>
                  {bars}
                  <text x={centerX} y={yScale(total) - 4} textAnchor="middle" fill={P.text} fontSize={9} fontFamily="IBM Plex Sans">{total}</text>
                </g>
              );
            })}
            {xScale.ticks(detail.xTickCount).map(t => (
              <text key={t.getTime()} x={xScale(t)} y={iH + 18} textAnchor="middle" fill={P.gridLabel} fontSize={10} fontFamily="IBM Plex Sans">
                {detail.xTickFormat(t)}
              </text>
            ))}
          </g>
        </svg>
      </div>
    );
  })();

  const calendarView = (
    <div className="rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
      {/* Header — clickable toggle */}
      <button
        className="w-full flex items-center gap-3 px-5 py-3 text-left transition-colors"
        style={{ borderBottom: calendarOpen ? `1px solid ${P.border}` : "none" }}
        onClick={() => setCalendarOpen(!calendarOpen)}
      >
        <span className="transition-transform" style={{ transform: calendarOpen ? "rotate(90deg)" : "rotate(0deg)", color: P.textMuted }}>
          <ChevronRight size={16} />
        </span>
        <Calendar size={18} color={P.textMuted} />
        <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>{tr.events}</span>
        <div className="flex items-center gap-2 ml-2">
          {eventCounts.abCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${P.alert}22`, color: P.alert }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.alert }} />{eventCounts.abCount}
            </span>
          )}
          {eventCounts.ecgCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: `${P.ecg}22`, color: P.ecg }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.ecg }} />{eventCounts.ecgCount}
            </span>
          )}
        </div>
      </button>

      {/* Calendar body — collapsible */}
      {calendarOpen && <>
      <div className="p-4 flex flex-wrap gap-6">
        {calendarMonths.map(({ year, month }) => {
          const monthName = new Date(year, month).toLocaleDateString("de-DE", { month: "long", year: "numeric" });
          const firstDay = new Date(year, month, 1);
          const lastDay = new Date(year, month + 1, 0);
          const startWeekday = (firstDay.getDay() + 6) % 7;
          const daysInMonth = lastDay.getDate();

          return (
            <div key={`${year}-${month}`}>
              <div className="text-sm font-semibold mb-2" style={{ color: P.text }}>{monthName}</div>
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-px text-center text-[10px] font-medium mb-1" style={{ color: P.textMuted }}>
                {tr.dayAbbrev.map(d => <div key={d} className="w-9 py-0.5">{d}</div>)}
              </div>
              {/* Day cells */}
              <div className="grid grid-cols-7 gap-px">
                {/* Empty cells before first day */}
                {Array.from({ length: startWeekday }).map((_, i) => <div key={`e-${i}`} className="w-9 h-9" />)}
                {/* Day cells */}
                {Array.from({ length: daysInMonth }).map((_, d) => {
                  const dayNum = d + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
                  const dateObj = new Date(year, month, dayNum);
                  const inRange = dateObj >= xDomain[0] && dateObj <= xDomain[1];
                  const dayData = calendarData[dateStr];
                  const hasEvents = dayData && (dayData.events.length > 0 || dayData.ecgs.length > 0);
                  const isSelected = calendarSelectedDay === dateStr;
                  const isToday = dateStr === d3.timeFormat("%Y-%m-%d")(NOW);

                  return (
                    <div
                      key={dayNum}
                      className="w-9 h-9 flex flex-col items-center justify-center rounded-md text-xs cursor-pointer transition-colors relative"
                      style={{
                        backgroundColor: isSelected ? P.bgInput : "transparent",
                        color: !inRange ? P.textDim : isToday ? P.accent : P.text,
                        fontWeight: isToday ? 700 : hasEvents ? 500 : 400,
                        opacity: inRange ? 1 : 0.35,
                        border: isToday ? `1px solid ${P.accent}` : isSelected ? `1px solid ${P.border}` : "1px solid transparent",
                      }}
                      onClick={() => hasEvents && setCalendarDialog({ dateStr })}
                      onMouseEnter={(e) => {
                        if (hasEvents) {
                          setCalendarHoverDay({ dateStr, cx: e.clientX, cy: e.clientY });
                        }
                      }}
                      onMouseMove={(e) => {
                        if (calendarHoverDay) setCalendarHoverDay(prev => prev ? { ...prev, cx: e.clientX, cy: e.clientY } : null);
                      }}
                      onMouseLeave={() => setCalendarHoverDay(null)}
                    >
                      <span>{dayNum}</span>
                      {/* Event dots */}
                      {hasEvents && (
                        <div className="flex gap-px mt-0.5">
                          {dayData.events.some(e => e.type === "atrialBurden") && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.alert }} />}
                          {dayData.events.some(e => e.alarm === "critical") && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.alarmRed }} />}
                          {dayData.ecgs.length > 0 && <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: P.ecg }} />}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover tooltip for day */}
      {calendarHoverDay && calendarData[calendarHoverDay.dateStr] && (
        <div className="fixed z-[200] rounded-lg p-4 shadow-2xl pointer-events-none max-w-xs"
          style={{
            left: calendarHoverDay.cx + 16,
            top: calendarHoverDay.cy - 16,
            backgroundColor: P.bgPanel,
            border: `1px solid ${P.borderStrong}`,
            backdropFilter: "blur(8px)",
          }}>
          <div className="text-sm font-semibold mb-2" style={{ color: P.text }}>
            {new Date(calendarHoverDay.dateStr).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
          </div>
          <div className="space-y-1.5">
            {calendarData[calendarHoverDay.dateStr].events.map((ev, i) => (
              <div key={i} className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{
                  backgroundColor: ev.alarm ? ALARM_COLORS[ev.alarm] : P.alarmGray
                }} />
                <span style={{ color: P.textSecondary }}>{ev.label}</span>
              </div>
            ))}
            {calendarData[calendarHoverDay.dateStr].ecgs.map((ecg, i) => (
              <div key={`ecg-${i}`} className="text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: P.ecg }} />
                  <span style={{ color: P.textSecondary }}>IEGM {ecg.time} · {ecg.duration}s{ecg.atrialBurden ? ` · AB ${ecg.atrialBurden}%` : ""}</span>
                </div>
                {ecg.waveform && (
                  <svg width={200} height={30} className="mt-1 ml-4">
                    <path d={ecg.waveform.slice(0, 500).map((v, j) => `${j === 0 ? "M" : "L"}${j * 0.4},${15 - v * 10}`).join(" ")} fill="none" stroke={P.ecg} strokeWidth={1} />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Calendar day dialog */}
      {calendarDialog && calendarData[calendarDialog.dateStr] && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} onClick={() => setCalendarDialog(null)}>
          <div className="rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto mx-4" style={{ backgroundColor: P.bgPanel, border: `1px solid ${P.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
              <div className="text-base font-semibold" style={{ color: P.text }}>
                {new Date(calendarDialog.dateStr).toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </div>
              <button onClick={() => setCalendarDialog(null)} className="p-1.5 rounded-md transition-colors" style={{ color: P.textMuted }}>
                <X size={16} />
              </button>
            </div>
            <div className="p-5 space-y-2">
              {calendarData[calendarDialog.dateStr].events.map((ev, i) => (
                <div key={i}
                  className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ backgroundColor: P.bgInput }}
                  onClick={() => { setCalendarDialog(null); setSidePanel({ type: "event", date: ev.date, data: ev }); }}>
                  <span className="w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0" style={{
                    backgroundColor: ev.alarm ? ALARM_COLORS[ev.alarm] : P.alarmGray
                  }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium" style={{ color: P.text }}>{ev.label}</div>
                    <div className="flex items-center gap-2 text-xs mt-0.5" style={{ color: P.textMuted }}>
                      <span>{ev.type === "atrialBurden" ? "Atrial Burden" : ev.type}</span>
                      {ev.alarm && <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${ALARM_COLORS[ev.alarm]}22`, color: ALARM_COLORS[ev.alarm] }}>{ALARM_LABELS[ev.alarm]}</span>}
                      {ev.acknowledgedBy && <span>✓ {ev.acknowledgedBy}</span>}
                    </div>
                  </div>
                </div>
              ))}
              {calendarData[calendarDialog.dateStr].ecgs.map((ecg, i) => (
                <div key={`ecg-${i}`}
                  className="p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ backgroundColor: P.bgInput }}
                  onClick={() => { setCalendarDialog(null); setEcgDrawer(ecg); }}>
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: ecg.alarm ? ALARM_COLORS[ecg.alarm] : P.ecg }} />
                    <div className="flex-1">
                      <div className="text-sm font-medium" style={{ color: P.text }}>IEGM-Aufzeichnung · {ecg.time}</div>
                      <div className="text-xs mt-0.5" style={{ color: P.textMuted }}>
                        {ecg.duration}s{ecg.atrialBurden ? ` · Atrial Burden: ${ecg.atrialBurden}%` : ""}
                        {ecg.trigger && <span className="ml-2">Auslöser: {ecg.trigger}</span>}
                        {ecg.alarm && <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: `${ALARM_COLORS[ecg.alarm]}22`, color: ALARM_COLORS[ecg.alarm] }}>{ALARM_LABELS[ecg.alarm]}</span>}
                        {ecg.acknowledgedBy && <span className="ml-2">✓ {ecg.acknowledgedBy}</span>}
                      </div>
                    </div>
                  </div>
                  {ecg.waveform && (
                    <svg width="100%" height={40} viewBox="0 0 280 40" preserveAspectRatio="xMidYMid meet" className="mt-2">
                      <path d={ecg.waveform.slice(0, 700).map((v, j) => `${j === 0 ? "M" : "L"}${j * 0.4},${20 - v * 15}`).join(" ")} fill="none" stroke={P.ecg} strokeWidth={1.2} />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="px-5 pb-3 flex items-center gap-4 flex-wrap text-xs" style={{ color: P.textMuted }}>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.alarmRed }} /> Kritischer Alarm</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.alarmYellow }} /> Warnung</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.alarmBlue }} /> Info</span>
        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.ecg }} /> IEGM</span>
      </div>
      {/* end calendarOpen */}
      </>}
    </div>
  );

  /* ─── Tooltip ─── */
  const tooltip = hoverInfo && (
    <div ref={tooltipRef} className="fixed z-[100] pointer-events-none rounded-lg px-5 py-3 shadow-2xl"
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
                        style={{ backgroundColor: dayBp.outlierValidated ? "rgba(59,130,246,0.15)" : P.bgInput, color: dayBp.outlierValidated ? P.good : P.textSecondary }}>
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
                        style={{ backgroundColor: dayHr.outlierValidated ? "rgba(59,130,246,0.15)" : P.bgInput, color: dayHr.outlierValidated ? P.good : P.textSecondary }}>
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
                        style={{ backgroundColor: dayW.outlierValidated ? "rgba(59,130,246,0.15)" : P.bgInput, color: dayW.outlierValidated ? P.good : P.textSecondary }}>
                        {dayW.outlierValidated ? <><RotateCcw size={12} className="inline mr-1" />Revidieren</> : <><CheckCircle size={12} className="inline mr-1" />Messpunkt valide</>}
                      </button>
                    </div>
                  )}
                </div>
              )}
              {dayM && (
                <div className="rounded-lg p-4" style={{ backgroundColor: P.bgCardHover }}>
                  <div className="flex items-center gap-2"><Smile size={16} color={P.mood} /><span className="text-base font-medium" style={{ color: P.text }}>Befinden</span></div>
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
                  <div className="text-sm font-medium uppercase tracking-wider" style={{ color: P.textMuted }}>IEGM-Aufzeichnungen</div>
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

  const ecgGridColor = theme === "dark" ? "rgba(129,140,248,0.08)" : "rgba(99,102,241,0.08)";
  const ecgGridStrongColor = theme === "dark" ? "rgba(129,140,248,0.18)" : "rgba(99,102,241,0.18)";
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
          <span className="text-lg font-semibold tracking-tight" style={{ color: P.text }}>IEGM — {ecgDrawer.date} {ecgDrawer.time}</span>
          {ecgDrawer.alarm && <span className="text-sm px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: ALARM_COLORS[ecgDrawer.alarm], color: "white" }}>{ALARM_LABELS[ecgDrawer.alarm]}</span>}
          {ecgDrawer.atrialBurden !== undefined && ecgDrawer.atrialBurden > 0 && (
            <span className="text-sm font-semibold" style={{ color: ecgDrawer.atrialBurden > 15 ? P.atrialHigh : P.atrialMod }}>AF: {ecgDrawer.atrialBurden}%</span>
          )}
          {ecgDrawer.trigger && (
            <span className="text-sm px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: `${P.bpSystolic}22`, color: P.bpSystolic }}>Auslöser: {ecgDrawer.trigger}</span>
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
    <div className="rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
        <span className="text-base font-semibold tracking-tight" style={{ color: P.text }}>Tabellenansicht</span>
        <div className="flex gap-2">
          <button onClick={() => {
            const rows = [["Datum", "Sys (mmHg)", "Dia (mmHg)", "HR (bpm)", "Gewicht (kg)", "Befinden", "Messungen", "Alarm"]];
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
              <th className="text-right px-4 py-3 font-medium" style={{ color: P.textMuted }}>Befinden</th>
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
    { key: "Esc", label: "Schließen" },
  ];

  /* ── Timeline slider — derives position from chartOffset + range ── */
  const TIMELINE_DAYS = Math.ceil((NOW.getTime() - DATA_START.getTime()) / (1000 * 60 * 60 * 24));

  useEffect(() => {
    if (!isDraggingTimeline) return;
    const bar = timelineRef.current;
    if (!bar) return;

    const handleMove = (e: MouseEvent) => {
      const rect = bar.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const startRef = dragStartRef.current;

      if (isDraggingTimeline === "pan") {
        // Pan: move the window, keep width same
        const thumbW = startRef.range / TIMELINE_DAYS;
        // Right edge of thumb = x position mapped to day offset
        const rightEdge = Math.min(1, Math.max(thumbW, x + thumbW / 2));
        const newOffset = Math.max(0, Math.round((1 - rightEdge) * TIMELINE_DAYS));
        setChartOffset(newOffset);
      } else if (isDraggingTimeline === "left") {
        // Resize left edge: changes range (zoom)
        const rightEdge = 1 - startRef.offset / TIMELINE_DAYS;
        const leftEdge = Math.max(0, Math.min(rightEdge - 7 / TIMELINE_DAYS, x));
        const newRange = Math.round((rightEdge - leftEdge) * TIMELINE_DAYS);
        const clamped = newRange <= 14 ? 14 : newRange <= 30 ? 30 : newRange <= 60 ? 60 : 90;
        setRange(clamped);
      } else if (isDraggingTimeline === "right") {
        // Resize right edge: changes range + offset
        const leftEdge = 1 - (startRef.offset + startRef.range) / TIMELINE_DAYS;
        const rightEdge = Math.max(leftEdge + 7 / TIMELINE_DAYS, Math.min(1, x));
        const newRange = Math.round((rightEdge - leftEdge) * TIMELINE_DAYS);
        const clamped = newRange <= 14 ? 14 : newRange <= 30 ? 30 : newRange <= 60 ? 60 : 90;
        const newOffset = Math.max(0, Math.round((1 - rightEdge) * TIMELINE_DAYS));
        setRange(clamped);
        setChartOffset(newOffset);
      }
    };

    const handleUp = () => setIsDraggingTimeline(null);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [isDraggingTimeline]);

  useEffect(() => {
    const maxOffset = TIMELINE_DAYS - range;
    if (chartOffset >= maxOffset && !hasShownConfettiRef.current) {
      hasShownConfettiRef.current = true;
      setShowConfetti(true);
      setShowBeeToast(true);
      setTimeout(() => setShowConfetti(false), 5000);
      setTimeout(() => setShowBeeToast(false), 6000);
    }
  }, [chartOffset, range, TIMELINE_DAYS]);

  const shortcutBar = (() => {
    // Thumb derived from chartOffset + range
    const thumbWidth = Math.max(0.04, range / TIMELINE_DAYS);
    const thumbRight = 1 - chartOffset / TIMELINE_DAYS;
    const thumbLeft = Math.max(0, thumbRight - thumbWidth);

    // Current view date range for label
    const viewEndDate = new Date(NOW);
    viewEndDate.setDate(viewEndDate.getDate() - chartOffset);
    const viewStartDate = new Date(viewEndDate);
    viewStartDate.setDate(viewStartDate.getDate() - range);
    const viewCenterDate = new Date((viewStartDate.getTime() + viewEndDate.getTime()) / 2);
    const dragLabel = viewCenterDate.toLocaleDateString("de-DE", { month: "long", year: "numeric" });
    const thumbCenter = thumbLeft + (thumbRight - thumbLeft) / 2;

    // Month labels
    const totalMs = NOW.getTime() - DATA_START.getTime();
    const months: { label: string; pos: number }[] = [];
    const mc = new Date(DATA_START);
    mc.setDate(1);
    mc.setMonth(mc.getMonth() + 1);
    while (mc <= NOW) {
      months.push({
        label: mc.toLocaleDateString("de-DE", { month: "short" }) + (mc.getMonth() === 0 ? " " + mc.getFullYear() : ""),
        pos: (mc.getTime() - DATA_START.getTime()) / totalMs
      });
      mc.setMonth(mc.getMonth() + 1);
    }

    const startDrag = (e: React.MouseEvent, mode: "pan" | "left" | "right") => {
      e.preventDefault();
      e.stopPropagation();
      dragStartRef.current = { x: e.clientX, offset: chartOffset, range };
      setIsDraggingTimeline(mode);
    };

    const handleTrackClick = (e: React.MouseEvent) => {
      if (isDraggingTimeline) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      // Move thumb center to click position
      const newRight = Math.min(1, Math.max(thumbWidth, x + thumbWidth / 2));
      setChartOffset(Math.max(0, Math.round((1 - newRight) * TIMELINE_DAYS)));
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 z-40 px-6 pb-2 pt-1"
        style={{ backgroundColor: P.shortcutBg, borderTop: `1px solid ${P.border}`, backdropFilter: "blur(8px)" }}>
        {/* Timeline slider */}
        <div className="relative mb-1.5">
          {/* Drag label - shows month/year while dragging (centered above slider track) */}
          <div className="relative h-3" style={{ marginLeft: 240, marginRight: 8 }}>
            {months.map((m, i) => (
              <span key={i} className="absolute text-[9px] font-mono" style={{ left: `${m.pos * 100}%`, color: P.textMuted, transform: "translateX(-50%)" }}>{m.label}</span>
            ))}
          </div>
          <div ref={timelineRef} className="relative h-6 rounded-md cursor-pointer"
            style={{ backgroundColor: theme === "dark" ? "rgba(63,63,70,0.3)" : "rgba(228,228,231,0.5)", marginLeft: 240, marginRight: 8 }}
            onClick={handleTrackClick}
          >
            {months.map((m, i) => (
              <div key={i} className="absolute top-0 bottom-0 w-px" style={{ left: `${m.pos * 100}%`, backgroundColor: P.border, opacity: 0.3 }} />
            ))}
            {/* Drag label - centered above slider */}
            {isDraggingTimeline && (
              <div className="absolute text-xs font-semibold px-2.5 py-1 rounded-md pointer-events-none"
                style={{
                  left: `${thumbCenter * 100}%`,
                  top: -28,
                  transform: "translateX(-50%)",
                  backgroundColor: theme === "dark" ? "rgba(99,102,241,0.9)" : "rgba(99,102,241,0.85)",
                  color: "#fff",
                  zIndex: 50,
                  whiteSpace: "nowrap",
                }}>
                {dragLabel}
              </div>
            )}
            {/* Thumb */}
            <div
              className="absolute top-0 bottom-0 rounded-md"
              style={{
                left: `${thumbLeft * 100}%`,
                width: `${Math.max(0.04, thumbWidth) * 100}%`,
                backgroundColor: theme === "dark" ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)",
                border: `1.5px solid ${theme === "dark" ? "rgba(129,140,248,0.6)" : "rgba(99,102,241,0.5)"}`,
                cursor: isDraggingTimeline === "pan" ? "grabbing" : "grab",
                minWidth: 24,
              }}
              onMouseDown={(e) => startDrag(e, "pan")}
            >
              <div className="absolute left-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-indigo-400/20 rounded-l-md"
                onMouseDown={(e) => startDrag(e, "left")} />
              <div className="absolute right-0 top-0 bottom-0 w-2 cursor-ew-resize hover:bg-indigo-400/20 rounded-r-md"
                onMouseDown={(e) => startDrag(e, "right")} />
              <div className="flex items-center justify-center h-full text-[10px] font-mono select-none pointer-events-none"
                style={{ color: theme === "dark" ? "rgba(165,180,252,0.9)" : "rgba(79,70,229,0.8)" }}>
                {range}T
              </div>
            </div>
          </div>
        </div>
        {/* Shortcuts row */}
        <div className="flex items-center justify-center gap-4">
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
      </div>
    );
  })();

  /* ═══════════════════════════════════════════════════════════════════════════════
     PATIENT DATA (static demo)
     ═══════════════════════════════════════════════════════════════════════════════ */
  const patient = {
    name: "Max Mustermann",
    dob: "12.05.1967",
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
      batteryMOS: "MOS 1" as string,
      lastTransmission: "2026-03-05T08:14:00",
      detailLink: "#implant-detail",
      transmissionListLink: "#transmission-list-implant",
      // Pacemaker programming data (from Patientenausweis)
      indication: "AV-Block II ohne Angaben",
      electrodes: [
        { type: "RA", manufacturer: "Guidant", serial: "21206NK", implantDate: "1997-01-01" },
      ],
      programming: {
        mode: "VDD",
        lowerRate: null as number | null,
        upperRate: null as number | null,
        maxSensorRate: null as number | null,
        hysteresisRate: null as number | null,
        modeSwitchMode: "VDI",
        modeSwitchDetRate: null as number | null,
        stimAVTime: 180,
        sensedAVTime: 180,
        raAmplitude: null as number | null,
        rvAmplitude: 2.5,
        raPulseDuration: null as number | null,
        rvPulseDuration: 0.4,
        raSensitivity: "0.15Fixe" as string,
        rvSensitivity: "2.5Fixed" as string,
      },
      lastMeasurement: {
        date: "2026-01-15",
        electrodeImpedance: { ra: 3000, rv: 414 },
        batteryCapacity: null as number | null,
        remainingLifetime: null as number | null,
        batteryVoltageDetail: null as number | null,
        batteryStatusDetail: "BOS",
      },
      stimulationStats: {
        stimRA: null as number | null,
        stimRV: null as number | null,
        asVS: null as number | null,
        asVP: null as number | null,
        apVS: null as number | null,
        apVP: null as number | null,
      },
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
     THRESHOLD SETTINGS HELPERS
     ═══════════════════════════════════════════════════════════════════════════════ */
  const handleTemplateChange = (templateId: string) => {
    const tmpl = templates.find(t => t.id === templateId);
    if (tmpl) {
      setActiveTemplateId(templateId);
      setThresholdParams(JSON.parse(JSON.stringify(tmpl.params)));
      setThresholdModified(false);
    }
  };

  const handleParamChange = (paramId: string, level: "yellow" | "red", field: string, value: any) => {
    const prevParams = JSON.parse(JSON.stringify(thresholdParams));
    const param = thresholdParams.find(p => p.id === paramId);
    const levelLabel = level === "yellow" ? "Warnung" : "Kritisch";
    let msg = "";
    if (field === "enabled") {
      msg = `${param?.label}: ${levelLabel} ${value ? "aktiviert" : "deaktiviert"}`;
    } else if (field === "emailNotify") {
      msg = `${param?.label}: E-Mail ${levelLabel} ${value ? "aktiviert" : "deaktiviert"}`;
    }
    setThresholdParams(prev => prev.map(p => {
      if (p.id !== paramId) return p;
      const lvl = { ...p[level] };
      if (field === "enabled") lvl.enabled = value;
      else if (field === "emailNotify") lvl.emailNotify = value;
      return { ...p, [level]: lvl };
    }));
    setThresholdModified(true);
    if (msg) pushToast(msg, prevParams);
  };

  const handleRuleValueChange = (paramId: string, level: "yellow" | "red", ruleId: string, field: "value" | "secondValue", newVal: number) => {
    const prevParams = JSON.parse(JSON.stringify(thresholdParams));
    setThresholdParams(prev => prev.map(p => {
      if (p.id !== paramId) return p;

      // Get the rule being changed
      const changedRuleIndex = p[level].rules.findIndex(r => r.id === ruleId);
      if (changedRuleIndex === -1) return p;

      const changedRule = p[level].rules[changedRuleIndex];
      const otherLevel = level === "yellow" ? "red" : "yellow";
      const correspondingRule = p[otherLevel].rules[changedRuleIndex];

      // If no corresponding rule in other level, just update normally
      if (!correspondingRule) {
        const lvl = { ...p[level], rules: p[level].rules.map(r => r.id === ruleId ? { ...r, [field]: newVal } : r) };
        return { ...p, [level]: lvl };
      }

      // Validation logic: ensure red is stricter than yellow
      let newYellow = { ...p.yellow };
      let newRed = { ...p.red };

      if (level === "yellow") {
        // User changed yellow value
        const updatedRule = { ...changedRule, [field]: newVal };

        // For ">" or "≥" (upper thresholds): red must be >= yellow
        if (changedRule.operator === ">" || changedRule.operator === "≥") {
          if (field === "value" && correspondingRule.value < newVal) {
            // Auto-adjust red up to match yellow
            setAutoCorrectFlash(`${paramId}-${otherLevel}`);
            newRed = { ...p.red, rules: p.red.rules.map((r, idx) => idx === changedRuleIndex ? { ...r, value: newVal } : r) };
          }
        }
        // For "<" or "≤" (lower thresholds): red must be <= yellow
        else if (changedRule.operator === "<" || changedRule.operator === "≤") {
          if (field === "value" && correspondingRule.value > newVal) {
            // Auto-adjust red down to match yellow
            setAutoCorrectFlash(`${paramId}-${otherLevel}`);
            newRed = { ...p.red, rules: p.red.rules.map((r, idx) => idx === changedRuleIndex ? { ...r, value: newVal } : r) };
          }
        }
        newYellow = { ...p.yellow, rules: p.yellow.rules.map(r => r.id === ruleId ? updatedRule : r) };
      } else {
        // User changed red value
        const updatedRule = { ...changedRule, [field]: newVal };

        // For ">" or "≥" (upper thresholds): red must be >= yellow
        if (changedRule.operator === ">" || changedRule.operator === "≥") {
          if (field === "value" && correspondingRule.value > newVal) {
            // Auto-adjust yellow down to match red
            setAutoCorrectFlash(`${paramId}-yellow`);
            newYellow = { ...p.yellow, rules: p.yellow.rules.map((r, idx) => idx === changedRuleIndex ? { ...r, value: newVal } : r) };
          }
        }
        // For "<" or "≤" (lower thresholds): red must be <= yellow
        else if (changedRule.operator === "<" || changedRule.operator === "≤") {
          if (field === "value" && correspondingRule.value < newVal) {
            // Auto-adjust yellow up to match red
            setAutoCorrectFlash(`${paramId}-yellow`);
            newYellow = { ...p.yellow, rules: p.yellow.rules.map((r, idx) => idx === changedRuleIndex ? { ...r, value: newVal } : r) };
          }
        }
        newRed = { ...p.red, rules: p.red.rules.map(r => r.id === ruleId ? updatedRule : r) };
      }

      setTimeout(() => setAutoCorrectFlash(null), 600);
      return { ...p, yellow: newYellow, red: newRed };
    }));
    setThresholdModified(true);
    const param = thresholdParams.find(p => p.id === paramId);
    const rule = param?.[level].rules.find(r => r.id === ruleId);
    const levelLabel = level === "yellow" ? "Warnung" : "Kritisch";
    if (param && rule) pushToast(`${param.label}: ${levelLabel} ${rule.operator} ${newVal} ${rule.suffix || ""}`, prevParams);
  };

  const handleSaveAsTemplate = () => {
    if (!saveTemplateName.trim()) return;
    const newId = `custom-${Date.now()}`;
    const newTemplate: ThresholdTemplate = {
      id: newId,
      name: saveTemplateName.trim(),
      isDefault: false,
      params: JSON.parse(JSON.stringify(thresholdParams)),
    };
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplateId(newId);
    setThresholdModified(false);
    setShowSaveDialog(false);
    setSaveTemplateName("");
  };

  const handleOverwriteTemplate = () => {
    if (!activeTemplate || activeTemplate.isDefault) return;
    setTemplates(prev => prev.map(t => t.id === activeTemplateId ? { ...t, params: JSON.parse(JSON.stringify(thresholdParams)) } : t));
    setThresholdModified(false);
  };

  const handleDeleteTemplate = (templateId: string) => {
    const tmpl = templates.find(t => t.id === templateId);
    if (!tmpl || tmpl.isDefault) return;
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    if (activeTemplateId === templateId) {
      handleTemplateChange("standard");
    }
  };

  /* ── Icon mapping for threshold parameters ── */
  const paramIconMap: Record<string, React.ReactNode> = {
    pulse: <Heart size={18} />,
    bp: <Activity size={18} />,
    weight: <Weight size={18} />,
    spo2: <Activity size={18} />,
    mood: <Smile size={18} />,
    nodata: <Clock size={18} />,
    ecg_received: <FileHeart size={18} />,
    ecg_findings: <FileHeart size={18} />,
    implant_template: <Cpu size={18} />,
  };

  /* ── Threshold Settings Page ── */
  const thresholdSettingsPage = (
    <div className="space-y-5">
      {/* Back + Title */}
      <div className="flex items-center gap-4">
        <button onClick={() => setPage("dashboard")} className="p-2 rounded-lg transition-colors" style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
          <ArrowBack size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight" style={{ color: P.text }}>Grenzwert-Einstellungen</h2>
          <p className="text-sm" style={{ color: P.textMuted }}>Alarm-Schwellwerte und Benachrichtigungen konfigurieren</p>
        </div>
      </div>

      {/* Template selector + actions */}
      <div className="rounded-md overflow-hidden shadow-sm" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}` }}>
        <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: P.textMuted }}>Vorlage:</span>
            <select
              value={activeTemplateId}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="px-3 py-2 rounded-lg text-sm font-medium border-0 outline-none cursor-pointer"
              style={{ backgroundColor: P.bgInput, color: P.text }}>
              {templates.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {thresholdModified && (
              <span className="text-sm px-2.5 py-1 rounded-full font-medium"
                style={{ backgroundColor: "rgba(234,179,8,0.15)", color: P.warning }}>
                Geändert
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {thresholdModified && activeTemplate && !activeTemplate.isDefault && (
              <button onClick={handleOverwriteTemplate}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: P.bgInput, color: P.text }}>
                <Save size={15} /> Speichern
              </button>
            )}
            <button onClick={() => { setSaveTemplateName(""); setShowSaveDialog(true); }}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.text }}>
              <Copy size={15} /> Als neue Vorlage speichern
            </button>
            {activeTemplate && !activeTemplate.isDefault && (
              <button onClick={() => handleDeleteTemplate(activeTemplateId)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: "rgba(239,68,68,0.1)", color: P.danger }}>
                <Trash size={15} /> Löschen
              </button>
            )}
            {thresholdModified && (
              <button onClick={() => { if (activeTemplate) handleTemplateChange(activeTemplateId); }}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{ backgroundColor: P.bgInput, color: P.textMuted }}>
                <RotateCcw size={15} /> Zurücksetzen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Save dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="rounded-md p-6 shadow-2xl w-full max-w-md space-y-4" style={{ backgroundColor: P.bgPanel, border: `1px solid ${P.border}` }}>
            <h3 className="text-lg font-semibold" style={{ color: P.text }}>Neue Vorlage speichern</h3>
            <input
              type="text" placeholder="Name der Vorlage..."
              value={saveTemplateName} onChange={(e) => setSaveTemplateName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-sm outline-none border-0"
              style={{ backgroundColor: P.bgInput, color: P.text }}
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleSaveAsTemplate()}
            />
            <div className="flex items-center gap-2 justify-end">
              <button onClick={() => setShowSaveDialog(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium" style={{ color: P.textMuted }}>
                Abbrechen
              </button>
              <button onClick={handleSaveAsTemplate}
                className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                style={{ backgroundColor: P.bpSystolic, color: "white" }}>
                Speichern
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Accordion parameter cards */}
      <div className="space-y-3">
        {thresholdParams.map((param) => {
          const isOpen = openThresholdParams.has(param.id);
          const hasYellowAlarm = param.yellow.enabled;
          const hasRedAlarm = param.red.enabled;
          const icon = paramIconMap[param.id] || <Activity size={18} />;

          return (
            <div key={param.id} className="rounded-lg overflow-hidden shadow-sm transition-all"
              style={{
                backgroundColor: P.bgCard,
                border: `1px solid ${P.border}`,
              }}>
              {/* Accordion Header */}
              <button
                onClick={() => setOpenThresholdParams(prev => { const next = new Set(prev); if (next.has(param.id)) next.delete(param.id); else next.add(param.id); return next; })}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:opacity-75"
                style={{ backgroundColor: isOpen ? P.bgInput : "transparent" }}>
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div style={{ color: P.textSecondary, flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold" style={{ color: P.text }}>{param.label}</div>
                    {param.unit && <div className="text-xs" style={{ color: P.textMuted }}>{param.unit}</div>}
                  </div>
                </div>

                {/* Status badges */}
                <div className="flex items-center gap-2 flex-wrap justify-end">
                  {hasYellowAlarm && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${P.alarmYellow}22`, color: P.alarmYellow }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.alarmYellow }} />
                      Warnung
                    </span>
                  )}
                  {hasRedAlarm && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${P.alarmRed}22`, color: P.alarmRed }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.alarmRed }} />
                      Kritisch
                    </span>
                  )}
                  {!hasYellowAlarm && !hasRedAlarm && (
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: `${P.textMuted}22`, color: P.textMuted }}>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: P.textMuted }} />
                      Inaktiv
                    </span>
                  )}
                </div>

                {/* Chevron */}
                <div style={{ color: P.textMuted, flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <ChevronRight size={18} />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 py-4" style={{ borderTop: `1px solid ${P.border}`, backgroundColor: P.bgInput }}>
                  {/* Bento grid layout: [Yellow Rules | Yellow Toggle] | [Red Rules | Red Toggle] */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    {/* Yellow section */}
                    <div style={{ padding: "12px 16px", borderRadius: "6px", backgroundColor: P.bgCard, border: `1px solid ${P.border}`, display: "flex", flexDirection: "column" }}>
                      {/* Header with label and controls on far right */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: P.alarmYellow, flexShrink: 0 }} />
                          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: P.alarmYellow }}>Warnung</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                          {/* iOS Toggle for yellow */}
                          <div onClick={() => handleParamChange(param.id, "yellow", "enabled", !param.yellow.enabled)}
                            style={{
                              width: 32,
                              height: 18,
                              borderRadius: 9,
                              position: "relative",
                              cursor: "pointer",
                              backgroundColor: param.yellow.enabled ? "#2CC990" : "#3f3f46",
                              transition: "background-color 0.2s"
                            }}>
                            <div style={{
                              position: "absolute",
                              top: 1.5,
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: "white",
                              transition: "left 0.2s",
                              left: param.yellow.enabled ? 16 : 2,
                            }} />
                          </div>
                          {/* Email toggle for yellow */}
                          <button onClick={() => handleParamChange(param.id, "yellow", "emailNotify", !param.yellow.emailNotify)}
                            style={{
                              padding: "4px",
                              borderRadius: "4px",
                              border: "none",
                              backgroundColor: param.yellow.emailNotify ? `${P.alarmYellow}22` : "transparent",
                              color: param.yellow.emailNotify ? P.alarmYellow : P.textMuted,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}>
                            <Mail size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Rules - compact inline display */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", opacity: param.yellow.enabled ? 1 : 0.5, transition: "opacity 0.2s" }}>
                        {param.yellow.rules.length > 0 ? (
                          param.yellow.rules.map((rule, ruleIdx) => (
                            <div key={rule.id} style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "2px",
                              fontSize: "11px",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              backgroundColor: autoCorrectFlash === `${param.id}-yellow` && ruleIdx === 0 ? `${P.alarmYellow}33` : P.bgInput,
                              transition: "background-color 0.3s",
                              border: `0.5px solid ${P.border}`
                            }}>
                              <span style={{ color: P.textMuted, fontWeight: 700, fontSize: "10px" }}>{rule.operator}</span>
                              <input
                                type="number"
                                value={rule.value}
                                onChange={(e) => handleRuleValueChange(param.id, "yellow", rule.id, "value", parseFloat(e.target.value) || 0)}
                                style={{
                                  width: "44px",
                                  padding: "1px 3px",
                                  borderRadius: "2px",
                                  fontSize: "10px",
                                  textAlign: "center",
                                  fontFamily: "monospace",
                                  fontWeight: 600,
                                  outline: "none",
                                  border: "none",
                                  backgroundColor: P.bgPanel,
                                  color: P.text
                                }}
                                step={rule.suffix?.includes("kg") ? 0.5 : 1}
                              />
                              {rule.suffix && <span style={{ fontSize: "9px", color: P.textMuted }}>{rule.suffix}</span>}
                              {rule.secondValue !== undefined && (
                                <>
                                  <input
                                    type="number"
                                    value={rule.secondValue}
                                    onChange={(e) => handleRuleValueChange(param.id, "yellow", rule.id, "secondValue", parseInt(e.target.value) || 0)}
                                    style={{
                                      width: "36px",
                                      padding: "1px 3px",
                                      borderRadius: "2px",
                                      fontSize: "10px",
                                      textAlign: "center",
                                      fontFamily: "monospace",
                                      fontWeight: 600,
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: P.bgPanel,
                                      color: P.text
                                    }}
                                  />
                                  {rule.secondSuffix && <span style={{ fontSize: "9px", color: P.textMuted }}>{rule.secondSuffix}</span>}
                                </>
                              )}
                            </div>
                          ))
                        ) : (
                          <span style={{ fontSize: "11px", color: P.textMuted }}>—</span>
                        )}
                      </div>
                    </div>

                    {/* Red section */}
                    <div style={{ padding: "12px 16px", borderRadius: "6px", backgroundColor: P.bgCard, border: `1px solid ${P.border}`, display: "flex", flexDirection: "column" }}>
                      {/* Header with label and controls on far right */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: P.alarmRed, flexShrink: 0 }} />
                          <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: P.alarmRed }}>Kritisch</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "4px", flexShrink: 0 }}>
                          {/* iOS Toggle for red */}
                          <div onClick={() => handleParamChange(param.id, "red", "enabled", !param.red.enabled)}
                            style={{
                              width: 32,
                              height: 18,
                              borderRadius: 9,
                              position: "relative",
                              cursor: "pointer",
                              backgroundColor: param.red.enabled ? "#2CC990" : "#3f3f46",
                              transition: "background-color 0.2s"
                            }}>
                            <div style={{
                              position: "absolute",
                              top: 1.5,
                              width: 14,
                              height: 14,
                              borderRadius: "50%",
                              backgroundColor: "white",
                              transition: "left 0.2s",
                              left: param.red.enabled ? 16 : 2,
                            }} />
                          </div>
                          {/* Email toggle for red */}
                          <button onClick={() => handleParamChange(param.id, "red", "emailNotify", !param.red.emailNotify)}
                            style={{
                              padding: "4px",
                              borderRadius: "4px",
                              border: "none",
                              backgroundColor: param.red.emailNotify ? `${P.alarmRed}22` : "transparent",
                              color: param.red.emailNotify ? P.alarmRed : P.textMuted,
                              cursor: "pointer",
                              transition: "all 0.2s"
                            }}>
                            <Mail size={14} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Rules - compact inline display */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", opacity: param.red.enabled ? 1 : 0.5, transition: "opacity 0.2s" }}>
                        {param.red.rules.length > 0 ? (
                          param.red.rules.map((rule, ruleIdx) => (
                            <div key={rule.id} style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "2px",
                              fontSize: "11px",
                              padding: "2px 6px",
                              borderRadius: "3px",
                              backgroundColor: autoCorrectFlash === `${param.id}-red` && ruleIdx === 0 ? `${P.alarmRed}33` : P.bgInput,
                              transition: "background-color 0.3s",
                              border: `0.5px solid ${P.border}`
                            }}>
                              <span style={{ color: P.textMuted, fontWeight: 700, fontSize: "10px" }}>{rule.operator}</span>
                              <input
                                type="number"
                                value={rule.value}
                                onChange={(e) => handleRuleValueChange(param.id, "red", rule.id, "value", parseFloat(e.target.value) || 0)}
                                style={{
                                  width: "44px",
                                  padding: "1px 3px",
                                  borderRadius: "2px",
                                  fontSize: "10px",
                                  textAlign: "center",
                                  fontFamily: "monospace",
                                  fontWeight: 600,
                                  outline: "none",
                                  border: "none",
                                  backgroundColor: P.bgPanel,
                                  color: P.text
                                }}
                                step={rule.suffix?.includes("kg") ? 0.5 : 1}
                              />
                              {rule.suffix && <span style={{ fontSize: "9px", color: P.textMuted }}>{rule.suffix}</span>}
                              {rule.secondValue !== undefined && (
                                <>
                                  <input
                                    type="number"
                                    value={rule.secondValue}
                                    onChange={(e) => handleRuleValueChange(param.id, "red", rule.id, "secondValue", parseInt(e.target.value) || 0)}
                                    style={{
                                      width: "36px",
                                      padding: "1px 3px",
                                      borderRadius: "2px",
                                      fontSize: "10px",
                                      textAlign: "center",
                                      fontFamily: "monospace",
                                      fontWeight: 600,
                                      outline: "none",
                                      border: "none",
                                      backgroundColor: P.bgPanel,
                                      color: P.text
                                    }}
                                  />
                                  {rule.secondSuffix && <span style={{ fontSize: "9px", color: P.textMuted }}>{rule.secondSuffix}</span>}
                                </>
                              )}
                            </div>
                          ))
                        ) : (
                          <span style={{ fontSize: "11px", color: P.textMuted }}>—</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info hint */}
      <div className="flex items-start gap-3 px-4 py-3 rounded-md text-sm" style={{ backgroundColor: P.bgInput, color: P.textSecondary }}>
        <Info size={16} className="mt-0.5 shrink-0" />
        <div>
          <strong style={{ color: P.text }}>Hinweis:</strong> Kritische Schwellwerte (rot) werden automatisch strenger als Warn-Schwellwerte (gelb) gehalten.
          Bei aktivierter E-Mail-Benachrichtigung wird der zuständige Arzt per Mail informiert.
        </div>
      </div>
    

      {/* Toast notifications */}
      {toasts.length > 0 && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 100, display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
          {toasts.map(toast => (
            <div key={toast.id}
              style={{
                backgroundColor: P.bgPanel,
                border: `1px solid ${P.border}`,
                borderRadius: 8,
                padding: "10px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                animation: "slideIn 0.2s ease-out",
              }}>
              <div style={{ flex: 1, fontSize: 13, color: P.text }}>{toast.message}</div>
              <button
                onClick={() => handleToastUndo(toast)}
                style={{
                  backgroundColor: "transparent",
                  border: `1px solid ${P.border}`,
                  color: P.bpSystolic,
                  padding: "4px 10px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  fontFamily: "inherit",
                }}>
                Undo
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════════════
     MOCK PATIENT DATA
     ═══════════════════════════════════════════════════════════════════════════════ */
  const mockPatients = [
    { id: "XZ12345678", name: "Müller, Anna", gender: "♀", dob: "15.04.92", active: false },
    { id: "CD54321678", name: "Meier, Laura", gender: "—", dob: "30.08.78", active: false },
    { id: "EF87654321", name: "Schneider, Jonas", gender: "♂", dob: "01.11.90", active: false },
    { id: "GH65432109", name: "Fischer, Sophie", gender: "♀", dob: "05.02.89", active: false },
    { id: "IJ32109876", name: "Weber, Noah", gender: "♂", dob: "12.03.84", active: false },
    { id: "KL21098765", name: "Hoffmann, Lena", gender: "♀", dob: "18.07.91", active: false },
    { id: "MN09876543", name: "Klein, Finn", gender: "♂", dob: "25.09.83", active: false },
    { id: "AB98765432", name: "Schmidt, Lukas", gender: "♂", dob: "22.06.85", active: false },
  ];

  const episodeSidebarEl = episodeSidebar && (
    <div className="fixed top-0 right-0 bottom-10 w-96 z-[60] shadow-2xl overflow-y-auto"
      style={{ backgroundColor: P.bgPanel, borderLeft: `1px solid ${P.borderStrong}` }}>
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: `1px solid ${P.border}` }}>
        <div>
          <div className="text-base font-semibold" style={{ color: P.text }}>Episoden</div>
          <div className="text-xs" style={{ color: P.textMuted }}>KW ab {new Date(episodeSidebar.date).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}</div>
        </div>
        <button onClick={() => setEpisodeSidebar(null)} className="p-1.5 rounded-md" style={{ color: P.textMuted }}><X size={16} /></button>
      </div>
      <div className="divide-y" style={{ borderColor: P.border }}>
        {episodeSidebar.episodes.map((ep: any, i: number) => (
          <div key={i}
            className="px-5 py-3 cursor-pointer transition-colors hover:opacity-80"
            style={{ backgroundColor: i % 2 === 0 ? "transparent" : P.bgInput }}
            onClick={() => { if (ep.waveform) { setEcgDrawer(ep); setEpisodeSidebar(null); } }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded" style={{ backgroundColor: `${EPISODE_COLORS[ep.episodeType] || P.alarmGray}22`, color: EPISODE_COLORS[ep.episodeType] || P.alarmGray }}>{ep.episodeType}</span>
                <span className="text-sm font-semibold" style={{ color: P.text }}>{ep.date} {ep.time}</span>
              </div>
              <span className="text-xs" style={{ color: P.textMuted }}>{ep.duration ? `${Math.floor(ep.duration / 60)}:${String(ep.duration % 60).padStart(2, "0")}` : "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: P.textMuted }}>
              <span>{ep.therapy || "Monitoring only"}</span>
              {ep.result && ep.result !== "-" && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                  style={{ backgroundColor: ep.result === "Successful" ? `${P.good}22` : `${P.danger}22`, color: ep.result === "Successful" ? P.good : P.danger }}>
                  {ep.result}
                </span>
              )}
            </div>
            {ep.atrialBurden > 0 && (
              <div className="text-xs mt-1" style={{ color: ep.atrialBurden > 15 ? P.danger : P.warning }}>AF: {ep.atrialBurden}%</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  /* ═══════════════════════════════════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="flex h-screen" style={{ backgroundColor: P.bg, color: P.text }}>
      {/* ═══════════════════════════════════════════════════════════════════════════════
          1. ICON SIDEBAR (48px)
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <aside
        className="flex flex-col items-center border-r"
        style={{
          width: 48,
          backgroundColor: P.bg,
          borderRightColor: P.border,
        }}
      >
        {/* Logo area */}
        <div className="p-2 flex items-center justify-center mt-2">
          <div
            className="flex items-center justify-center rounded-lg flex-shrink-0"
            style={{
              width: 36,
              height: 36,
              backgroundColor: P.bgInput,
            }}
          >
            <Heart size={18} style={{ color: P.accent }} />
          </div>
        </div>

        {/* Navigation icons */}
        <nav className="flex-1 flex flex-col items-center gap-1 py-4">
          {/* Patients - active */}
          <button
            onClick={() => setPatientTab("dashboard")}
            className="p-2 rounded-lg transition-colors flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              backgroundColor: P.accent,
              color: "#ffffff",
            }}
            title="Patienten"
          >
            <FileHeart size={18} />
          </button>

          {/* Documents */}
          <button
            className="p-2 rounded-lg transition-colors flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              backgroundColor: "transparent",
              color: P.textMuted,
            }}
            title="Dokumente"
          >
            <Table2 size={18} />
          </button>

          {/* Contacts */}
          <button
            className="p-2 rounded-lg transition-colors flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              backgroundColor: "transparent",
              color: P.textMuted,
            }}
            title="Kontakte"
          >
            <User size={18} />
          </button>

          {/* Settings */}
          <button
            className="p-2 rounded-lg transition-colors flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              backgroundColor: "transparent",
              color: P.textMuted,
            }}
            title="Einstellungen"
          >
            <Settings size={18} />
          </button>
        </nav>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          2. PATIENT LIST (300px)
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <aside
        className="flex flex-col border-r overflow-hidden"
        style={{
          width: 300,
          backgroundColor: P.bgCard,
          borderRightColor: P.border,
        }}
      >
        {/* Search header */}
        <div className="px-3 py-3 border-b" style={{ borderBottomColor: P.border }}>
          <input
            type="text"
            placeholder={tr.searchPlaceholder}
            className="w-full px-3 py-2 rounded-md text-sm"
            style={{
              backgroundColor: P.bgInput,
              color: P.text,
              border: `1px solid ${P.border}`,
            }}
          />
        </div>

        {/* Patient list */}
        <div className="flex-1 overflow-y-auto">
          {mockPatients.map((p, idx) => (
            <div
              key={idx}
              className="px-3 py-2.5 border-b cursor-pointer transition-colors"
              style={{
                borderBottomColor: P.border,
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = P.bgInput;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <div className="font-medium text-sm" style={{ color: P.text }}>
                {p.name} {p.gender}
              </div>
              <div className="text-xs" style={{ color: P.textMuted }}>
                📅 {p.dob}  #{p.id}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════════════════
          3. MAIN CONTENT (Patientenakte)
          ═══════════════════════════════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col overflow-hidden" style={{ backgroundColor: P.bg }}>
        {/* Breadcrumb bar */}
        <div
          className="flex items-center justify-between px-6 py-3 border-b"
          style={{ borderBottomColor: P.border }}
        >
          <div className="flex items-center gap-2">
            <span style={{ color: P.textMuted }}>{tr.patients}</span>
            <span style={{ color: P.textMuted }}>&gt;</span>
            <span style={{ color: P.text, fontWeight: 500 }}>{patient.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 rounded transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
              title="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="p-1.5 rounded transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
              title="Next"
            >
              <ChevronRight size={16} />
            </button>
            <div className="w-px h-6 mx-1" style={{ backgroundColor: P.border }} />
            <button
              className="px-3 py-1.5 rounded text-sm transition-colors"
              style={{ backgroundColor: "transparent", color: P.textSecondary, border: `1px solid ${P.border}` }}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 rounded text-sm transition-colors"
              style={{ backgroundColor: P.text, color: P.bg }}
            >
              Save
            </button>
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="p-1.5 rounded transition-colors flex items-center gap-1.5"
                style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
                title="Language"
              >
                <span style={{ fontSize: "14px" }}>🌐</span>
                <span className="text-xs font-semibold uppercase" style={{ color: P.text }}>{lang}</span>
                <ChevronDown size={14} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 rounded-md shadow-lg p-2 z-50" style={{ backgroundColor: P.bgCard, border: `1px solid ${P.border}`, minWidth: "140px" }}>
                  {["de", "en", "hu", "mk", "uk"].map((langCode) => (
                    <button
                      key={langCode}
                      onClick={() => {
                        setLang(langCode as "de" | "en" | "hu" | "mk" | "uk");
                        setLangOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center gap-2"
                      style={{
                        backgroundColor: lang === langCode ? P.bgInput : "transparent",
                        color: P.text,
                      }}
                    >
                      {langCode === "de" && "Deutsch"}
                      {langCode === "en" && "English"}
                      {langCode === "hu" && "Magyar"}
                      {langCode === "mk" && "Македонски"}
                      {langCode === "uk" && "Українська"}
                      {lang === langCode && <span style={{ color: P.bpSystolic }}>✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => setTheme(t => (t === "dark" ? "light" : "dark"))}
              className="p-1.5 rounded transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
              title="Dark/Light Mode"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              className="p-1.5 rounded transition-colors"
              style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
            >
              ⋮
            </button>
          </div>
        </div>

        {/* Patient header */}
        <div className="px-6 py-4 border-b" style={{ borderBottomColor: P.border }}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ backgroundColor: "rgba(22,163,74,0.15)", color: "#16A34A" }}>
                  {tr.monitoring}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold" style={{ color: P.text }}>{patient.name}</h1>
                <div className="relative" ref={notesRef}>
                  <button
                    onClick={() => setNotesOpen(!notesOpen)}
                    className="px-2 py-1 rounded text-xs cursor-pointer truncate max-w-[200px] inline-block align-middle text-left"
                    style={{ backgroundColor: "#fef9c3", color: "#713f12", border: "1px solid #fde68a" }}
                  >
                    📝 {notesText.slice(0, 30)}{notesText.length > 30 ? "…" : ""}
                  </button>
                  {notesOpen && (
                    <div className="absolute left-0 top-full mt-1 z-50">
                      <div className="rounded-lg shadow-lg p-3 w-[320px]" style={{ backgroundColor: "#fef9c3", color: "#713f12", border: "1px solid #fde68a" }}>
                        <textarea
                          className="w-full text-sm resize-none bg-transparent border-none outline-none"
                          style={{ color: "#713f12", minHeight: 80, fontFamily: "'IBM Plex Sans', sans-serif" }}
                          value={notesText}
                          onChange={(e) => setNotesText(e.target.value)}
                          placeholder="Notizen zum Patienten..."
                          autoFocus
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: P.bgInput, color: P.text }}>{patient.age} {tr.years}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: P.bgInput, color: P.text }}>{patient.gender === "Männlich" ? tr.male : tr.female}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: P.bgInput, color: P.text }}>NYHA {patient.nyha}</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: P.bgInput, color: patient.lvef < 40 ? P.danger : patient.lvef < 50 ? P.warning : P.text }}>LVEF {patient.lvef}%</span>
                <span className="text-xs font-semibold px-2 py-1 rounded-md" style={{ backgroundColor: P.bgInput, color: patient.anticoag ? P.text : P.textMuted }}>{tr.anticoagulation}: {patient.anticoag ? tr.yes : tr.no}</span>
                <span className="mx-0.5 text-sm" style={{ color: P.border }}>|</span>
                {patient.icd10.map((d, i) => {
                  const icdText = (tr as any).icd10Texts?.[d.code] || d.text;
                  return (
                    <span key={i} className="text-xs font-mono font-semibold px-2 py-1 rounded-md cursor-default" style={{ backgroundColor: P.bgInput, color: P.text }} title={icdText}>
                      {d.code}
                    </span>
                  );
                })}
              </div>
            </div>
            {/* Device chips - right side */}
            <div className="flex items-center gap-2">
              <button onClick={() => setDevicesOpen(!devicesOpen)} className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors" style={{ backgroundColor: P.bgInput, border: `1px solid ${P.border}` }}>
                <Cpu size={14} color={P.textSecondary} />
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium" style={{ color: P.textSecondary }}>
                  <ImplantIcon size={10} color={P.textSecondary} />
                  {patient.implant.type.split(" ")[0]}
                </span>
                {patient.externalDevices.map((dev, i) => (
                  <span key={i} className="text-[11px] font-medium" style={{ color: P.textSecondary }}>
                    {dev.type}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="px-6 border-b" style={{ borderBottomColor: P.border }}>
          <div className="flex gap-0">
            {[
              { key: "dashboard", label: tr.dashboard },
              { key: "patient-info", label: tr.patientInfo },
              { key: "telemonitoring", label: tr.telemonitoring },
              { key: "insurance", label: tr.insurance },
              { key: "documents", label: tr.documents },
              { key: "app", label: tr.app },
              { key: "contact-persons", label: tr.contactPersons },
              { key: "settings", label: "Einstellungen" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setPatientTab(tab.key as TabKey)}
                className="px-4 py-2.5 text-sm transition-colors"
                style={{
                  backgroundColor: "transparent",
                  color: patientTab === tab.key ? P.text : P.textMuted,
                  borderBottom:
                    patientTab === tab.key
                      ? `2px solid ${P.text}`
                      : "2px solid transparent",
                  fontWeight: patientTab === tab.key ? 500 : 400,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content area - scrollable */}
        <div className="flex-1 overflow-y-auto px-6" style={{ paddingBottom: 90 }}>
          {tooltip}
          {sidePanelEl}
          {ecgDrawerEl}
          {episodeSidebarEl}

          {/* Device Sidebar */}
          {devicesOpen && (
            <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setDevicesOpen(false)}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative w-[420px] h-full overflow-y-auto shadow-2xl" style={{ backgroundColor: P.bgPanel }} onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderBottomColor: P.border }}>
                  <div className="flex items-center gap-2">
                    <Cpu size={18} color={P.text} />
                    <span className="text-base font-semibold" style={{ color: P.text }}>{tr.devices}</span>
                  </div>
                  <button onClick={() => setDevicesOpen(false)} className="p-1.5 rounded-lg" style={{ color: P.textMuted }}><X size={18} /></button>
                </div>
                <div className="p-4 space-y-3">
                  {/* Implant */}
                  <div
                    className="rounded-lg p-4"
                    style={{ backgroundColor: P.bgInput, border: `1px solid ${P.border}` }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ImplantIcon size={16} color={P.heartRate} />
                        <span className="text-sm font-semibold" style={{ color: P.text }}>
                          {tr.implant}
                        </span>
                      </div>
                      <a
                        href={patient.implant.detailLink}
                        className="inline-flex items-center gap-1 text-xs font-medium rounded-md px-2 py-1 transition-colors"
                        style={{
                          color: P.bpSystolic,
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(74,158,222,0.1)"
                              : "rgba(37,99,235,0.1)",
                        }}
                      >
                        {tr.details} <ExternalLink size={11} />
                      </a>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold" style={{ color: P.text }}>
                        {patient.implant.manufacturer} {patient.implant.model}
                      </div>
                      <div className="text-xs" style={{ color: P.textMuted }}>
                        {patient.implant.type}
                      </div>
                      <div className="text-xs" style={{ color: P.textMuted }}>
                        Implantiert: {new Date(patient.implant.implantDate).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: P.textSecondary }}
                        >
                          <Battery size={13} />
                          <span
                            className="font-mono font-semibold"
                            style={{
                              color:
                                patient.implant.batteryVoltage > 2.8
                                  ? P.good
                                  : P.warning,
                            }}
                          >
                            {patient.implant.batteryVoltage} V ({patient.implant.batteryMOS})
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs"
                          style={{ color: P.textSecondary }}
                        >
                          <Radio size={13} />
                          <span>{timeSince(patient.implant.lastTransmission)}</span>
                        </div>
                      </div>
                      <a
                        href={patient.implant.transmissionListLink}
                        className="inline-flex items-center gap-1 text-xs mt-1 transition-colors"
                        style={{ color: P.bpSystolic }}
                      >
                        <span title="Übertragungsverlauf"><Radio size={14} /></span>
                      </a>
                      <button
                        onClick={() => setImplantDetailOpen(!implantDetailOpen)}
                        className="text-xs mt-2 flex items-center gap-1 transition-colors"
                        style={{ color: P.bpSystolic }}
                      >
                        <span style={{ transform: implantDetailOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
                          <ChevronRight size={12} />
                        </span>
                        Programmierung & Messwerte
                      </button>
                      {implantDetailOpen && (
                        <div className="mt-3 space-y-3 text-xs" style={{ color: P.textSecondary }}>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: P.text }}>Indikation</div>
                            <div>{patient.implant.indication}</div>
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: P.text }}>Elektroden</div>
                            {patient.implant.electrodes.map((el: any, i: number) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="font-mono font-semibold" style={{ color: P.text }}>{el.type}</span>
                                <span>{el.manufacturer}</span>
                                <span className="font-mono">{el.serial}</span>
                              </div>
                            ))}
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: P.text }}>Aktuelle Programmierung</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                              <span>Betriebsart:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.mode}</span>
                              <span>Mode Switch Modus:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.modeSwitchMode}</span>
                              <span>Stim. AV-Zeit:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.stimAVTime} ms</span>
                              <span>Wahrg. AV-Zeit:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.sensedAVTime} ms</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: P.text }}>Programmierte Werte (RA / RV)</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                              <span>Amplitude [V]:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.raAmplitude ?? "—"} / {patient.implant.programming.rvAmplitude}</span>
                              <span>Impulsdauer [ms]:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.raPulseDuration ?? "—"} / {patient.implant.programming.rvPulseDuration}</span>
                              <span>Empfindlichkeit:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.programming.raSensitivity} / {patient.implant.programming.rvSensitivity}</span>
                            </div>
                          </div>
                          <div>
                            <div className="font-semibold mb-1" style={{ color: P.text }}>Letzte Messung ({patient.implant.lastMeasurement.date})</div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                              <span>Impedanz RA/RV [Ohm]:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.lastMeasurement.electrodeImpedance.ra} / {patient.implant.lastMeasurement.electrodeImpedance.rv}</span>
                              <span>Batteriestatus:</span><span className="font-semibold" style={{ color: P.text }}>{patient.implant.lastMeasurement.batteryStatusDetail}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* External devices */}
                  {patient.externalDevices.map((dev, i) => (
                    <div
                      key={i}
                      className="rounded-lg p-4"
                      style={{ backgroundColor: P.bgInput, border: `1px solid ${P.border}` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {dev.type === "Waage" ? (
                            <Weight size={16} color={P.weight} />
                          ) : (
                            <Activity size={16} color={P.bpSystolic} />
                          )}
                          <span className="text-sm font-semibold" style={{ color: P.text }}>
                            {dev.type}
                          </span>
                        </div>
                        <Bluetooth size={14} style={{ color: P.bpSystolic }} />
                      </div>
                      <div className="space-y-1">
                        <div className="text-sm font-semibold" style={{ color: P.text }}>
                          {dev.manufacturer} {dev.model}
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-xs mt-2"
                          style={{ color: P.textSecondary }}
                        >
                          <Wifi size={13} />
                          <span>
                            Letzte Übertragung:{" "}
                            <span className="font-medium" style={{ color: P.text }}>
                              {timeSince(dev.lastTransmission)}
                            </span>
                          </span>
                        </div>
                        <a
                          href={dev.transmissionListLink}
                          className="inline-flex items-center gap-1 text-xs mt-1 transition-colors"
                          style={{ color: P.bpSystolic }}
                        >
                          <span title="Übertragungsverlauf"><Radio size={14} /></span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {patientTab === "dashboard" && (
            <div className="space-y-5 pt-4">

                {/* ── Time range selector (segmented control) ── */}
                <div className="sticky top-0 z-20 flex items-center gap-3 py-2 -mx-6 px-6" style={{ backgroundColor: theme === "dark" ? "rgba(24,24,27,0.75)" : "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
                  <div className="inline-flex items-center rounded-lg p-1" style={{ backgroundColor: theme === "dark" ? "rgba(39,39,42,0.6)" : "rgba(244,244,245,0.8)" }}>
                    {RANGES.map((r) => {
                      const isActive = range === r && !customDateRange;
                      return (
                        <button
                          key={r}
                          onClick={() => { setRange(r); setChartOffset(0); }}
                          className="relative px-3.5 py-1.5 rounded-md text-sm font-semibold transition-all"
                          style={{
                            backgroundColor: isActive
                              ? theme === "dark" ? "rgba(63,63,70,1)" : "#fff"
                              : "transparent",
                            color: isActive ? P.text : P.textMuted,
                            boxShadow: isActive ? (theme === "dark" ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)") : "none",
                          }}
                        >
                          {r}
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs font-medium" style={{ color: P.textMuted }}>{tr.daysLabel}</span>
                </div>

                {/* ── Episoden-Zeitleiste (always shown) ── */}
                {episodeTimelineChart}

                  {/* ── Toggles + View mode ── */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="text-sm uppercase tracking-wider font-semibold mr-1"
                      style={{ color: P.textMuted }}
                    >
                      {tr.display.toUpperCase()}:
                    </span>
                    <ToggleBtn
                      label={tr.thresholds}
                      active={vis.thresholds}
                      onToggle={() => setVis(v => ({ ...v, thresholds: !v.thresholds }))}
                      shortcut="G"
                    />
                    <div className="w-px h-6 mx-1" style={{ backgroundColor: P.borderStrong }} />
                    <button
                      onClick={() => setViewMode(viewMode === "chart" ? "table" : "chart")}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all"
                      style={{ backgroundColor: P.bgInput, color: P.textSecondary }}
                    >
                      {viewMode === "chart" ? <Table2 size={14} /> : <LineChart size={14} />}
                      {viewMode === "chart" ? tr.table : tr.charts}
                    </button>
                  </div>

                  {/* ── Legend ── */}
                  <div className="flex items-center gap-5 text-sm flex-wrap" style={{ color: P.textSecondary }}>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-transparent"
                        style={{ borderBottomColor: P.bpSystolic }}
                      />
                      {tr.sys}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-0 h-0 border-l-[5px] border-r-[5px] border-t-[8px] border-transparent"
                        style={{ borderTopColor: P.bpDiastolic }}
                      />
                      {tr.dia}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-3 h-3 rotate-45"
                        style={{ backgroundColor: P.heartRate }}
                      />
                      {tr.hr}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-3 h-3 rounded-full"
                        style={{ backgroundColor: P.weight }}
                      />
                      {tr.weight}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{ backgroundColor: P.mood }}
                      />
                      {tr.mood}
                    </span>
                    <span style={{ color: P.textDim }}>|</span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border-2 border-dashed"
                        style={{ borderColor: P.outlier }}
                      />
                      {tr.outlier}
                    </span>
                  </div>

                  {/* ── Charts / Table ── */}
                  {viewMode === "chart" ? (
                    <div ref={chartContainerRef} className="flex flex-col gap-3">
                      {overviewChart}
                      {bpChart}
                      {hrChart}
                      {weightChart}
                      {moodChart}
                    </div>
                  ) : (
                    tableView
                  )}
            </div>
          )}

          {patientTab === "settings" && thresholdSettingsPage}

          {patientTab !== "dashboard" && patientTab !== "settings" && (
            <div className="text-center py-12" style={{ color: P.textMuted }}>
              <span className="capitalize">{patientTab.replace("-", " ")} — Inhalt folgt</span>
            </div>
          )}
        </div>

        {/* Shortcut Bar - always visible */}
        {shortcutBar}

        {/* Bottom status bar */}
        <div
          className="flex items-center justify-center gap-6 px-6 py-2 border-t"
          style={{ borderTopColor: P.border }}
        >
          <button className="text-sm transition-colors" style={{ color: P.textSecondary }}>
            <Checklist size={14} className="inline mr-1" />
            Tasks 7
          </button>
          <button className="text-sm transition-colors" style={{ color: P.textSecondary }}>
            <Bluetooth size={14} className="inline mr-1" />
            Devices 2
          </button>
          <button className="text-sm transition-colors" style={{ color: P.textSecondary }}>
            <BarChart3 size={14} className="inline mr-1" />
            Statistics 85
          </button>
          <button className="text-sm transition-colors" style={{ color: P.textSecondary }}>
            <Edit size={14} className="inline mr-1" />
            Notes 4
          </button>
        </div>
      </main>

      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {Array.from({ length: 80 }).map((_, i) => (
            <div key={i} className="absolute" style={{
              left: `${Math.random() * 100}%`,
              top: -20,
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              backgroundColor: ['#f59e0b', '#ef4444', '#3b82f6', '#818cf8', '#8b5cf6', '#ec4899', '#f97316'][i % 7],
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              animation: `confetti-fall ${2 + Math.random() * 3}s ease-in ${Math.random() * 1}s forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }} />
          ))}
          <style>{`
            @keyframes confetti-fall {
              0% { transform: translateY(0) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {/* Bee toast */}
      {showBeeToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[110] animate-bounce">
          <div className="relative px-8 py-6 rounded-2xl shadow-2xl text-center max-w-sm"
            style={{ backgroundColor: theme === "dark" ? "rgba(30,30,30,0.95)" : "rgba(255,255,255,0.97)", border: `2px solid #f59e0b` }}>
            <div className="text-4xl mb-3">🐝</div>
            <p className="text-base font-bold mb-1" style={{ color: P.text }}>{tr.beeToast}</p>
            {/* Flying bees */}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="absolute text-2xl" style={{
                animation: `bee-fly-${i % 3} ${2 + Math.random()}s ease-in-out infinite`,
                top: `${20 + Math.random() * 60}%`,
                left: `${10 + Math.random() * 80}%`,
              }}>🐝</span>
            ))}
            <style>{`
              @keyframes bee-fly-0 { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(30px,-20px) rotate(10deg); } 50% { transform: translate(-20px,-40px) rotate(-5deg); } 75% { transform: translate(40px,-10px) rotate(8deg); } }
              @keyframes bee-fly-1 { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(-40px,-15px) rotate(-8deg); } 50% { transform: translate(25px,-35px) rotate(12deg); } 75% { transform: translate(-15px,-45px) rotate(-3deg); } }
              @keyframes bee-fly-2 { 0%,100% { transform: translate(0,0) rotate(0deg); } 25% { transform: translate(20px,10px) rotate(5deg); } 50% { transform: translate(-30px,-25px) rotate(-10deg); } 75% { transform: translate(35px,-30px) rotate(7deg); } }
            `}</style>
          </div>
        </div>
      )}
    </div>
  );
}
