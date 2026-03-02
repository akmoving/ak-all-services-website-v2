
"use client";

import React, { useEffect, useMemo, useState } from "react";

type Lang = "en" | "es";
type PackageKey = "base" | "standard" | "premium";

const PHONE_E164 = "17274923881"; // wa.me uses digits only (no +)
const DISPLAY_PHONE = "(727) 492-3881";

const INCLUDED_MILES = 20;
const EXTRA_MILE_PRICE = 3;

const PACKAGES: Record<
  PackageKey,
  {
    price: number;
    label: { en: string; es: string };
    short: { en: string; es: string };
    includes: { en: string[]; es: string[] };
  }
> = {
  base: {
    price: 1050,
    label: { en: "Base", es: "Base" },
    short: { en: "Clean + fast.", es: "Limpia + rápida." },
    includes: {
      en: ["Truck + 3 movers", "Protection-first handling", `${INCLUDED_MILES} miles included`],
      es: ["Camión + 3 trabajadores", "Manejo con protección primero", `${INCLUDED_MILES} millas incluidas`],
    },
  },
  standard: {
    price: 1275,
    label: { en: "Standard (Recommended)", es: "Standard (Recomendado)" },
    short: { en: "Most popular balance.", es: "El balance más popular." },
    includes: {
      en: [
        "Everything in Base",
        "Partial packing (kitchen + fragile)",
        "Tape included",
        "Extra protection level",
      ],
      es: ["Todo lo del Base", "Empaque parcial (cocina + frágiles)", "Tape incluido", "Protección extendida"],
    },
  },
  premium: {
    price: 1475,
    label: { en: "Premium (Most Popular)", es: "Premium (Más popular)" },
    short: { en: "Max protection + priority.", es: "Máxima protección + prioridad." },
    includes: {
      en: [
        "Everything in Standard",
        "Priority scheduling (when available)",
        "More protective materials",
        "More careful handling policy",
      ],
      es: ["Todo lo del Standard", "Prioridad de agenda (si hay disponibilidad)", "Más materiales de protección", "Política de manejo más cuidadosa"],
    },
  },
};

const EXTRAS = [
  { key: "boxMedium", en: "Medium box", es: "Caja mediana", price: 6, type: "qty" as const },
  { key: "boxLarge", en: "Large box", es: "Caja grande", price: 8, type: "qty" as const },
  { key: "boxReinforced", en: "Reinforced box", es: "Caja reforzada", price: 14, type: "qty" as const },
  { key: "stretchWrap", en: "Stretch wrap roll", es: "Rollo stretch wrap", price: 75, type: "qty" as const },
  { key: "tvBox", en: "Extra TV box", es: "Caja TV adicional", price: 65, type: "qty" as const },
  { key: "extraStop", en: "Extra stop", es: "Parada adicional", price: 175, type: "toggle" as const },
  { key: "extraHourAfter8", en: "Extra hour (after 8h)", es: "Hora adicional (después 8h)", price: 150, type: "toggle" as const },
];

const BLOCKED_ISO_DATES = new Set<string>([
  // Ejemplos: "2026-03-01", "2026-03-05"
]);

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function isSunday(isoDate: string) {
  if (!isoDate) return false;
  const d = new Date(isoDate + "T00:00:00");
  return d.getDay() === 0; // Sunday
}

function isPastDate(isoDate: string) {
  if (!isoDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(isoDate + "T00:00:00");
  return d < today;
}

function clampInt(v: string, min = 0, max = 999) {
  const n = Number(v);
  if (Number.isNaN(n)) return min;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("es");

  const [activePkg, setActivePkg] = useState<PackageKey>("standard");
  const [beds, setBeds] = useState<number>(1);

  const [stairs, setStairs] = useState<number>(0);
  const [hasElevator, setHasElevator] = useState<boolean>(false);

  const [totalMiles, setTotalMiles] = useState<number>(INCLUDED_MILES);

  const [dateISO, setDateISO] = useState<string>("");
  const [timeStr, setTimeStr] = useState<string>("08:00");

  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");

  const [extrasQty, setExtrasQty] = useState<Record<string, number>>({
    boxMedium: 0,
    boxLarge: 0,
    boxReinforced: 0,
    stretchWrap: 0,
    tvBox: 0,
  });

  const [extrasToggle, setExtrasToggle] = useState<Record<string, boolean>>({
    extraStop: false,
    extraHourAfter8: false,
  });

  // Responsive state
  const [isMobile, setIsMobile] = useState<boolean>(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const t = useMemo(() => {
    const dict = {
      en: {
        brandLine: "Premium Moving • Packing • Junk Removal",
        headline: "Instant Quote",
        subhead: "A clean estimate in seconds — polished experience, real service. No cheap vibes.",
        chip1: "Tampa Bay + surrounding",
        chip2: "Average response time: under 5 minutes.",
        chip3: "Secure your date today. Limited weekly availability.",
        getEstimate: "Get your estimate",
        package: "Package",
        beds: "Home size (bedrooms)",
        stairsAccess: "Stairs (no elevator)",
        elevator: "Elevator available",
        miles: "Total miles (approx.)",
        included: `Includes up to ${INCLUDED_MILES} miles`,
        extraMiles: "Extra miles",
        date: "Preferred date",
        time: "Preferred time",
        pickup: "Pickup address",
        dropoff: "Delivery address",
        extras: "Extras (optional)",
        summary: "Summary",
        total: "Estimated total",
        deposit: "Deposit",
        depositNote: "30% to reserve (Zelle). We send details via WhatsApp.",
        ctaWA: "Request quote on WhatsApp",
        ctaCall: "Call Now",
        notAvailable: "That date is not available. Please choose another.",
        noSunday: "We do not work Sundays.",
        note:
          "Note: Final price may change after confirming inventory, access and distance. Everything is confirmed via WhatsApp.",
        areasTitle: "Areas",
        areas: ["Tampa", "Brandon", "Clearwater", "St. Petersburg", "Wesley Chapel"],
        contactTitle: "Contact",
        whyTitle: "Why A&K feels premium",
        why: [
          "Fast response (minutes, not hours)",
          "Protection-first handling",
          "Transparent structure",
          "Professional communication",
        ],
        language: "Language",
      },
      es: {
        brandLine: "Mudanza Premium • Empaque • Junk Removal",
        headline: "Estimado al instante",
        subhead: "Estimado limpio en segundos — experiencia fina, servicio real. Sin reguero.",
        chip1: "Tampa Bay + alrededores",
        chip2: "Tiempo de respuesta promedio: menos de 5 min.",
        chip3: "Asegura tu fecha hoy. Cupos semanales limitados.",
        getEstimate: "Estima tu mudanza",
        package: "Paquete",
        beds: "Tamaño (habitaciones)",
        stairsAccess: "Escaleras (sin elevador)",
        elevator: "Hay elevador",
        miles: "Millas totales (aprox.)",
        included: `Incluye hasta ${INCLUDED_MILES} millas`,
        extraMiles: "Millas extra",
        date: "Día preferido",
        time: "Hora preferida",
        pickup: "Dirección de recogida",
        dropoff: "Dirección de entrega",
        extras: "Extras (opcional)",
        summary: "Resumen",
        total: "Total estimado",
        deposit: "Depósito",
        depositNote: "30% para reservar (Zelle). Te mandamos los datos por WhatsApp.",
        ctaWA: "Pedir cotización por WhatsApp",
        ctaCall: "Llama ahora",
        notAvailable: "Ese día no está disponible. Cambia la fecha.",
        noSunday: "No trabajamos domingo.",
        note:
          "Nota: El precio final puede variar tras confirmar inventario, acceso y distancia. Todo se confirma por WhatsApp.",
        areasTitle: "Áreas",
        areas: ["Tampa", "Brandon", "Clearwater", "St. Petersburg", "Wesley Chapel"],
        contactTitle: "Contacto",
        whyTitle: "Por qué A&K se siente premium",
        why: [
          "Respuesta rápida (minutos, no horas)",
          "Protección primero",
          "Estructura clara",
          "Comunicación profesional",
        ],
        language: "Idioma",
      },
    } as const;

    return dict[lang];
  }, [lang]);

  const extraMiles = Math.max(0, totalMiles - INCLUDED_MILES);
  const milesFee = extraMiles * EXTRA_MILE_PRICE;

  // Simple stairs fee model (tú lo ajustas luego si quieres)
  const stairsFee = useMemo(() => {
    if (hasElevator) return 0;
    // $75 por piso (0-4) ejemplo. Cambia si quieres.
    return stairs * 75;
  }, [stairs, hasElevator]);

  const extrasFee = useMemo(() => {
    let sum = 0;
    for (const item of EXTRAS) {
      if (item.type === "qty") sum += (extrasQty[item.key] || 0) * item.price;
      if (item.type === "toggle") sum += (extrasToggle[item.key] ? item.price : 0);
    }
    return sum;
  }, [extrasQty, extrasToggle]);

  const basePrice = PACKAGES[activePkg].price;

  const estimate = useMemo(() => {
    // Beds influence (ligero, para que no sea “solo una calculadora”)
    const bedsFactor = Math.max(0, beds - 1) * 80; // +80 por habitación extra
    return basePrice + bedsFactor + stairsFee + milesFee + extrasFee;
  }, [basePrice, beds, stairsFee, milesFee, extrasFee]);

  const deposit = Math.round(estimate * 0.3);

  const dateBlocked = dateISO ? BLOCKED_ISO_DATES.has(dateISO) : false;
  const dateInvalid = !!dateISO && (isPastDate(dateISO) || isSunday(dateISO) || dateBlocked);

  const extrasLines = useMemo(() => {
    const lines: string[] = [];
    for (const item of EXTRAS) {
      if (item.type === "qty") {
        const q = extrasQty[item.key] || 0;
        if (q > 0) lines.push(`${lang === "en" ? item.en : item.es}: ${q} x ${money(item.price)} = ${money(q * item.price)}`);
      } else {
        if (extrasToggle[item.key]) lines.push(`${lang === "en" ? item.en : item.es}: +${money(item.price)}`);
      }
    }
    return lines;
  }, [extrasQty, extrasToggle, lang]);

  const message = useMemo(() => {
    const pkg = PACKAGES[activePkg];
    const pkgName = lang === "en" ? pkg.label.en : pkg.label.es;

    const parts: string[] = [];
    parts.push(lang === "en" ? "Hello, I'd like to confirm availability for this move." : "Hola, quiero confirmar disponibilidad para esta mudanza.");
    parts.push("");
    parts.push(`${lang === "en" ? "Package" : "Paquete"}: ${pkgName}`);
    parts.push(`${lang === "en" ? "Bedrooms" : "Habitaciones"}: ${beds}`);
    parts.push(`${lang === "en" ? "Stairs (no elevator)" : "Escaleras (sin elevador)"}: ${hasElevator ? (lang === "en" ? "Elevator available" : "Hay elevador") : stairs}`);
    parts.push(`${lang === "en" ? "Miles (approx.)" : "Millas (aprox.)"}: ${totalMiles} (${lang === "en" ? "extra" : "extra"}: ${extraMiles})`);
    parts.push(`${lang === "en" ? "Preferred date" : "Día preferido"}: ${dateISO || "-"}`);
    parts.push(`${lang === "en" ? "Preferred time" : "Hora preferida"}: ${timeStr || "-"}`);
    parts.push(`${lang === "en" ? "Pickup" : "Recogida"}: ${pickup || "-"}`);
    parts.push(`${lang === "en" ? "Delivery" : "Entrega"}: ${dropoff || "-"}`);

    if (extrasLines.length) {
      parts.push("");
      parts.push(lang === "en" ? "Extras:" : "Extras:");
      extrasLines.forEach((l) => parts.push(`- ${l}`));
    }

    parts.push("");
    parts.push(`${lang === "en" ? "Estimated total" : "Total estimado"}: ${money(estimate)}`);
    parts.push(`${lang === "en" ? "Deposit (30%)" : "Depósito (30%)"}: ${money(deposit)} (${lang === "en" ? "Zelle" : "Zelle"})`);
    parts.push(lang === "en" ? "Deposit is via Zelle (details in WhatsApp)." : "El depósito es por Zelle (te mandamos los datos por WhatsApp).");

    return parts.join("\n");
  }, [activePkg, beds, hasElevator, stairs, totalMiles, extraMiles, dateISO, timeStr, pickup, dropoff, extrasLines, estimate, deposit, lang]);

  const whatsappLink = useMemo(() => {
    return `https://wa.me/${PHONE_E164}?text=${encodeURIComponent(message)}`;
  }, [message]);

  // Computed layout styles (NO functions inside styles object)
  const gridShellStyle: React.CSSProperties = useMemo(() => {
    return {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1.35fr .85fr",
      gap: 14,
      width: "min(1120px, 100%)",
    };
  }, [isMobile]);

  const pkgRowStyle: React.CSSProperties = useMemo(() => {
    return {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
      gap: 10,
    };
  }, [isMobile]);

  const styles: Record<string, React.CSSProperties> = {
    page: {
      minHeight: "100vh",
      padding: 18,
      display: "grid",
      placeItems: "center",
      background:
        "radial-gradient(1200px 700px at 20% 10%, rgba(255,215,0,.08), transparent 60%), radial-gradient(900px 500px at 80% 30%, rgba(255,200,80,.06), transparent 55%), #070707",
      color: "rgba(255,255,255,.92)",
      fontFamily:
        'ui-serif, "Times New Roman", Georgia, Cambria, "Playfair Display", serif',
    },
    card: {
      background: "rgba(12,12,12,.92)",
      border: "1px solid rgba(255,215,0,.18)",
      borderRadius: 18,
      padding: 18,
      boxShadow: "0 18px 60px rgba(0,0,0,.55)",
      backdropFilter: "blur(10px)",
    },
    topCard: {
      marginBottom: 14,
    },
    topRow: {
      display: "flex",
      gap: 14,
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    brand: { display: "flex", gap: 12, alignItems: "center", minWidth: 260 },
    logoBox: {
      width: 54,
      height: 54,
      borderRadius: 14,
      background: "rgba(255,215,0,.10)",
      border: "1px solid rgba(255,215,0,.22)",
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      flex: "0 0 auto",
    },
    logoImg: { width: 44, height: 44, objectFit: "contain" },
    brandText: { display: "grid", gap: 2 },
    company: { fontSize: 28, fontWeight: 800, letterSpacing: -0.2, lineHeight: 1.05 },
    sub: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', opacity: 0.88 },
    langWrap: { display: "grid", gap: 6, justifyItems: "end" },
    langLabel: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', opacity: 0.75, fontSize: 13 },
    select: {
      background: "rgba(15,15,18,.9)",
      color: "rgba(255,255,255,.92)",
      border: "1px solid rgba(255,215,0,.18)",
      borderRadius: 14,
      padding: "10px 12px",
      outline: "none",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
    },
    hero: { marginTop: 14, display: "grid", gap: 10 },
    headline: { fontSize: 52, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1.02 },
    subhead: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', fontSize: 16, opacity: 0.9, maxWidth: 720 },
    chips: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 8 },
    chip: {
      borderRadius: 999,
      border: "1px solid rgba(255,215,0,.16)",
      background: "rgba(255,255,255,.03)",
      padding: "10px 14px",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      fontSize: 14,
      opacity: 0.92,
    },
    sectionTitle: {
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      fontSize: 20,
      fontWeight: 900,
      margin: "6px 0 12px",
    },
    pkgCard: {
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      padding: 12,
      cursor: "pointer",
      transition: "transform .12s ease",
      userSelect: "none",
    },
    pkgName: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', fontWeight: 900, marginBottom: 4 },
    pkgPrice: { color: "rgba(255,215,0,.92)", fontWeight: 900, fontSize: 18 },
    fields: { marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 },
    field: { display: "grid", gap: 6 },
    label: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', opacity: 0.78, fontSize: 13 },
    input: {
      background: "rgba(15,15,18,.92)",
      border: "1px solid rgba(255,215,0,.18)",
      borderRadius: 14,
      padding: "12px 12px",
      outline: "none",
      color: "rgba(255,255,255,.92)",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      width: "100%",
    },
    hint: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', opacity: 0.55, fontSize: 12, marginTop: 2 },
    accessRow: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
    check: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      padding: "10px 12px",
      borderRadius: 14,
      border: "1px solid rgba(255,215,0,.18)",
      background: "rgba(255,255,255,.03)",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
    },
    extrasGrid: { marginTop: 12, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 },
    extraCard: {
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      padding: 12,
      display: "grid",
      gap: 8,
    },
    extraTop: { display: "flex", justifyContent: "space-between", gap: 10 },
    extraName: { fontWeight: 900 },
    extraPrice: { color: "rgba(255,215,0,.90)", fontWeight: 900 },
    totals: {
      marginTop: 14,
      borderRadius: 18,
      border: "1px solid rgba(255,215,0,.20)",
      background: "linear-gradient(180deg, rgba(255,215,0,.10), rgba(0,0,0,0))",
      padding: 14,
      display: "grid",
      gap: 10,
    },
    totalsRow: { display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" },
    bigMoney: { fontSize: 42, fontWeight: 900, letterSpacing: -0.6, color: "rgba(255,255,255,.95)" },
    depositMoney: { fontSize: 22, fontWeight: 900, color: "rgba(255,215,0,.92)" },
    ctaRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
    ctaWA: {
      background: "linear-gradient(90deg, rgba(255,215,0,.95), rgba(190,150,45,.95))",
      color: "#111",
      borderRadius: 16,
      padding: "14px 14px",
      fontWeight: 900,
      textDecoration: "none",
      textAlign: "center",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      border: "1px solid rgba(255,215,0,.25)",
    },
    ctaDisabled: {
      background: "rgba(255,255,255,.06)",
      color: "rgba(255,255,255,.55)",
      borderRadius: 16,
      padding: "14px 14px",
      fontWeight: 900,
      textDecoration: "none",
      textAlign: "center",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      border: "1px solid rgba(255,255,255,.10)",
    },
    ctaCall: {
      background: "rgba(255,255,255,.05)",
      color: "rgba(255,255,255,.92)",
      borderRadius: 16,
      padding: "14px 14px",
      fontWeight: 900,
      textDecoration: "none",
      textAlign: "center",
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
      border: "1px solid rgba(255,215,0,.18)",
    },
    note: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', opacity: 0.75, fontSize: 12, lineHeight: 1.35 },
    sideCard: {
      background: "rgba(12,12,12,.92)",
      border: "1px solid rgba(255,215,0,.16)",
      borderRadius: 18,
      padding: 16,
      display: "grid",
      gap: 12,
      alignContent: "start",
      height: "fit-content",
    },
    sideTitle: { fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', fontSize: 18, fontWeight: 900 },
    sideList: { margin: 0, paddingLeft: 18, opacity: 0.92, fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial' },
    contactBox: {
      borderRadius: 16,
      border: "1px solid rgba(255,255,255,.10)",
      background: "rgba(255,255,255,.03)",
      padding: 12,
      display: "grid",
      gap: 8,
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial',
    },
    link: { color: "rgba(120,190,255,.95)", textDecoration: "none", fontWeight: 800 },
    footer: { opacity: 0.5, fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial', fontSize: 12, marginTop: 14 },
  };

  // Active package styling (computed, not inside styles)
  function pkgStyle(key: PackageKey): React.CSSProperties {
    const active = key === activePkg;
    return {
      ...styles.pkgCard,
      border: active ? "1px solid rgba(255,215,0,.45)" : styles.pkgCard.border,
      background: active ? "rgba(255,215,0,.08)" : styles.pkgCard.background,
      transform: active ? "translateY(-1px)" : "none",
    };
  }

  // CTA enabled only if date valid + required fields
  const canSend = !!pickup.trim() && !!dropoff.trim() && !!dateISO && !dateInvalid;

  return (
    <main style={styles.page}>
      <div style={gridShellStyle}>
        {/* LEFT MAIN */}
        <div>
          <section style={{ ...styles.card, ...styles.topCard }}>
            <div style={styles.topRow}>
              <div style={styles.brand}>
                <div style={styles.logoBox}>
                  <img
                    src="/elephant.png"
                    alt="A&K"
                    style={styles.logoImg}
                    onError={(e) => ((e.currentTarget.style.display = "none"))}
                  />
                </div>
                <div style={styles.brandText}>
                  <div style={styles.company}>A&K All Services, Inc.</div>
                  <div style={styles.sub}>{t.brandLine}</div>
                </div>
              </div>

              <div style={styles.langWrap}>
                <div style={styles.langLabel}>{t.language}</div>
                <select value={lang} onChange={(e) => setLang(e.target.value as Lang)} style={styles.select} aria-label="language">
                  <option value="en">EN</option>
                  <option value="es">ES</option>
                </select>
              </div>
            </div>

            <div style={styles.hero}>
              <div style={styles.headline}>{t.headline}</div>
              <div style={styles.subhead}>{t.subhead}</div>

              <div style={styles.chips}>
                <div style={styles.chip}>{t.chip1}</div>
                <div style={styles.chip}>{t.chip2}</div>
                <div style={styles.chip}>{t.chip3}</div>
              </div>
            </div>
          </section>

          <section style={styles.card}>
            <div style={styles.sectionTitle}>{t.getEstimate}</div>

            {/* Package selector */}
            <div style={styles.label}>{t.package}</div>
            <div style={pkgRowStyle}>
              {(["base", "standard", "premium"] as PackageKey[]).map((k) => (
                <div key={k} style={pkgStyle(k)} onClick={() => setActivePkg(k)} role="button" aria-label={`package-${k}`}>
                  <div style={styles.pkgName}>{lang === "en" ? PACKAGES[k].label.en : PACKAGES[k].label.es}</div>
                  <div style={styles.pkgPrice}>{money(PACKAGES[k].price)}</div>
                  <div style={{ ...styles.hint, marginTop: 6 }}>{lang === "en" ? PACKAGES[k].short.en : PACKAGES[k].short.es}</div>
                </div>
              ))}
            </div>

            {/* Inputs */}
            <div style={styles.fields}>
              <div style={styles.field}>
                <div style={styles.label}>{t.beds}</div>
                <select
                  value={beds}
                  onChange={(e) => setBeds(clampInt(e.target.value, 1, 10))}
                  style={styles.input}
                  aria-label="bedrooms"
                >
                  {Array.from({ length: 10 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>{t.stairsAccess}</div>
                <select
                  value={stairs}
                  onChange={(e) => setStairs(clampInt(e.target.value, 0, 8))}
                  style={styles.input}
                  aria-label="stairs"
                  disabled={hasElevator}
                >
                  {Array.from({ length: 9 }).map((_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <div style={styles.hint}>
                  {hasElevator ? (lang === "en" ? "Disabled because elevator is on." : "Desactivado porque hay elevador.") : ""}
                </div>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>{t.miles}</div>
                <input
                  type="number"
                  min={0}
                  value={totalMiles}
                  onChange={(e) => setTotalMiles(clampInt(e.target.value, 0, 999))}
                  style={styles.input}
                  inputMode="numeric"
                />
                <div style={styles.hint}>
                  {t.included}. {extraMiles > 0 ? `${t.extraMiles}: ${extraMiles} x ${money(EXTRA_MILE_PRICE)} = ${money(milesFee)}` : `${t.extraMiles}: ${money(0)}`}
                </div>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>{t.elevator}</div>
                <label style={styles.check}>
                  <input
                    type="checkbox"
                    checked={hasElevator}
                    onChange={(e) => setHasElevator(e.target.checked)}
                  />
                  <span>{lang === "en" ? "Elevator OK" : "Hay elevador"}</span>
                </label>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>{t.date}</div>
                <input
                  type="date"
                  value={dateISO}
                  onChange={(e) => setDateISO(e.target.value)}
                  style={styles.input}
                />
                <div style={styles.hint}>
                  {dateISO && isSunday(dateISO) ? t.noSunday : dateISO && isPastDate(dateISO) ? (lang === "en" ? "Date must be today or later." : "La fecha debe ser hoy o después.") : dateBlocked ? t.notAvailable : ""}
                </div>
              </div>

              <div style={styles.field}>
                <div style={styles.label}>{t.time}</div>
                <select value={timeStr} onChange={(e) => setTimeStr(e.target.value)} style={styles.input} aria-label="time">
                  {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00"].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ ...styles.field, gridColumn: isMobile ? "auto" : "1 / -1" }}>
                <div style={styles.label}>{t.pickup}</div>
                <input value={pickup} onChange={(e) => setPickup(e.target.value)} style={styles.input} placeholder={lang === "en" ? "Street, City, ZIP" : "Calle, Ciudad, ZIP"} />
              </div>

              <div style={{ ...styles.field, gridColumn: isMobile ? "auto" : "1 / -1" }}>
                <div style={styles.label}>{t.dropoff}</div>
                <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} style={styles.input} placeholder={lang === "en" ? "Street, City, ZIP" : "Calle, Ciudad, ZIP"} />
              </div>
            </div>

            {/* Extras */}
            <div style={{ ...styles.sectionTitle, marginTop: 16 }}>{t.extras}</div>
            <div style={styles.extrasGrid}>
              {EXTRAS.map((item) => (
                <div key={item.key} style={styles.extraCard}>
                  <div style={styles.extraTop}>
                    <div style={styles.extraName}>{lang === "en" ? item.en : item.es}</div>
                    <div style={styles.extraPrice}>{money(item.price)}</div>
                  </div>

                  {item.type === "qty" ? (
                    <input
                      type="number"
                      min={0}
                      value={extrasQty[item.key] || 0}
                      onChange={(e) =>
                        setExtrasQty((p) => ({ ...p, [item.key]: clampInt(e.target.value, 0, 999) }))
                      }
                      style={styles.input}
                      inputMode="numeric"
                    />
                  ) : (
                    <label style={styles.check}>
                      <input
                        type="checkbox"
                        checked={!!extrasToggle[item.key]}
                        onChange={(e) => setExtrasToggle((p) => ({ ...p, [item.key]: e.target.checked }))}
                      />
                      <span>{lang === "en" ? "Add" : "Agregar"}</span>
                    </label>
                  )}
                </div>
              ))}
            </div>

            {/* Totals + CTA */}
            <div style={styles.totals}>
              <div style={styles.totalsRow}>
                <div>
                  <div style={styles.label}>{t.total}</div>
                  <div style={styles.bigMoney}>{money(estimate)}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={styles.label}>{t.deposit}</div>
                  <div style={styles.depositMoney}>{money(deposit)}</div>
                  <div style={styles.hint}>{t.depositNote}</div>
                </div>
              </div>

              <div style={styles.ctaRow}>
                <a
                  href={canSend ? whatsappLink : undefined}
                  style={canSend ? styles.ctaWA : styles.ctaDisabled}
                  onClick={(e) => {
                    if (!canSend) e.preventDefault();
                  }}
                >
                  {t.ctaWA}
                </a>
                <a href={`tel:${PHONE_E164}`} style={styles.ctaCall}>
                  {t.ctaCall}
                </a>
              </div>

              <div style={styles.note}>{t.note}</div>
            </div>
          </section>

          <div style={styles.footer}>© {new Date().getFullYear()} A&K All Services, Inc.</div>
        </div>

        {/* RIGHT SIDE */}
        <aside style={styles.sideCard}>
          <div>
            <div style={styles.sideTitle}>{t.whyTitle}</div>
            <ul style={styles.sideList}>
              {t.why.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <div style={styles.sideTitle}>{t.areasTitle}</div>
            <ul style={styles.sideList}>
              {t.areas.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>

          <div>
            <div style={styles.sideTitle}>{t.contactTitle}</div>
            <div style={styles.contactBox}>
              <div>
                WhatsApp:{" "}
                <a style={styles.link} href={`https://wa.me/${PHONE_E164}`}>
                  {DISPLAY_PHONE}
                </a>
              </div>
              <div style={{ opacity: 0.85 }}>
                {lang === "en"
                  ? "Deposit via Zelle (we send details on WhatsApp)."
                  : "Depósito por Zelle (te mandamos los datos por WhatsApp)."}
              </div>
              {dateInvalid && dateISO ? (
                <div style={{ color: "rgba(255,120,120,.95)", fontWeight: 800 }}>
                  {isSunday(dateISO) ? t.noSunday : t.notAvailable}
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}