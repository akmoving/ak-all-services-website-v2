"use client";

import { useMemo, useState } from "react";

type Lang = "en" | "es";
type ComboKey = "base" | "standard" | "premium";
type Bedrooms = 1 | 2 | 3 | 4;
type FloorNoElev = 0 | 2 | 3 | 4;

const COMPANY = "A&K All Services, Inc.";
const PHONE_E164 = "17274923881"; // sin +, con 1 delante
const LOCAL_MILES_CAP = 45;
const EXTRA_MILE_PRICE = 3;
const DEPOSIT_RATE = 0.3;

// Precios oficiales (PDF 2026)
const COMBOS: Record<
  ComboKey,
  {
    title_es: string;
    title_en: string;
    tagline_es: string;
    tagline_en: string;
    priceByBedrooms: Record<Bedrooms, number>;
    includedMiles: number;
    includes_es: string[];
    includes_en: string[];
  }
> = {
  base: {
    title_es: "Combo Base",
    title_en: "Base Combo",
    tagline_es: "Mudanza profesional, directo al grano.",
    tagline_en: "Professional move, straight to the point.",
    priceByBedrooms: { 1: 1050, 2: 1350, 3: 1750, 4: 2150 },
    includedMiles: 20,
    includes_es: [
      "Camión incluido",
      "3 trabajadores profesionales",
      "Equipo completo + mantas",
      "Seguro liability",
      "Carga y descarga",
      "Montaje/desmontaje básico de camas",
      "Protección básica con mantas",
      "Stretch wrap (protección limitada)",
    ],
    includes_en: [
      "Truck included",
      "3 professional movers",
      "Full equipment + blankets",
      "Liability insurance",
      "Load & unload",
      "Basic bed disassembly/assembly",
      "Basic blanket protection",
      "Stretch wrap (limited protection)",
    ],
  },
  standard: {
    title_es: "Combo Standard",
    title_en: "Standard Combo",
    tagline_es: "Recomendado: más protección y más valor.",
    tagline_en: "Recommended: more protection & better value.",
    priceByBedrooms: { 1: 1275, 2: 1575, 3: 1975, 4: 2375 },
    includedMiles: 25,
    includes_es: [
      "Todo lo del Combo Base",
      "Empaque parcial (cocina y frágiles)",
      "25 cajas incluidas",
      "Tape incluido",
      "1 TV: desmontaje + instalación",
      "Protección extendida",
    ],
    includes_en: [
      "Everything in Base",
      "Partial packing (kitchen & fragile)",
      "25 boxes included",
      "Tape included",
      "1 TV: dismount + install",
      "Extended protection",
    ],
  },
  premium: {
    title_es: "Combo Premium",
    title_en: "Premium Combo",
    tagline_es: "Servicio completo: el más popular.",
    tagline_en: "Full service: most popular.",
    priceByBedrooms: { 1: 1475, 2: 1875, 3: 2375, 4: 2975 },
    includedMiles: 30,
    includes_es: [
      "Todo lo del Combo Standard",
      "Empaque completo",
      "50 cajas incluidas",
      "Bubble wrap (protección completa)",
      "Protección de pisos y puertas",
      "Desmontaje complejo",
      "1 caja profesional para TV incluida",
    ],
    includes_en: [
      "Everything in Standard",
      "Full packing",
      "50 boxes included",
      "Bubble wrap (full protection)",
      "Floor & door protection",
      "Complex disassembly",
      "1 professional TV box included",
    ],
  },
};

const FLOORS_FEES: Record<FloorNoElev, number> = {
  0: 0,
  2: 150,
  3: 250,
  4: 350,
};

const EXTRAS = {
  boxMedium: 6,
  boxLarge: 8,
  boxReinforced: 14,
  stretchWrapRoll: 75,
  tvBox: 65,
  extraStop: 175,
  extraHourAfter8: 150,
};
const ADDONS = [
  {
    title: "Protección industrial anti-rayones",
    desc: "Film de grado profesional para asegurar puertas, gavetas y superficies delicadas. Reduce golpes, marcas y reclamaciones durante carga y descarga.",
    price: EXTRAS.stretchWrapRoll,
    suffix: "por rollo",
  },
  {
    title: "Sistema estructural de protección para TV",
    desc: "Protección rígida diseñada para pantallas planas. Minimiza presión y riesgo de impacto en tránsito.",
    price: EXTRAS.tvBox,
    suffix: "por TV",
  },
  {
    title: "Parada logística adicional",
    desc: "Incluye tiempo operativo, descarga parcial y reorganización de ruta.",
    price: EXTRAS.extraStop,
    suffix: "por parada",
  },
  {
    title: "Bloque adicional de tiempo operativo",
    desc: "Extensión del servicio cuando la carga requiere más tiempo. Confirmado antes de continuar.",
    price: EXTRAS.extraHourAfter8,
    suffix: "por hora",
  },
];
type RouteKey = "local" | "tampa_orlando" | "tampa_miami" | "other_long";

function fmtUSD(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
const handleSendWhatsApp = () => {
  const text = encodeURIComponent(msg);
  window.open(`https://wa.me/${PHONE_E164}?text=${text}`, "_blank");
};
  const t = useMemo(() => {
    const ES = {
      brandLine:
        "Mudanzas premium, limpias y seguras. Servicio local en Tampa Bay y rutas largas bajo confirmación.",
      citiesTitle: "Áreas locales (Tampa Bay)",
      cities:
        "Tampa • Brandon • Clearwater • Wesley Chapel • St. Petersburg",
      coreTitle: "Lo esencial (siempre incluido)",
      coreBullets: [
        "Camión + equipo completo",
        "3 trabajadores profesionales",
        "Seguro liability",
        "Protección con mantas",
      ],
      combosTitle: "Combos",
      tapHint: "Toca un combo para ver lo que incluye.",
      extrasTitle: "Protección & Ajustes Operativos",
extrasNote:
  "Estos ajustes reflejan tiempo real de trabajo, protección profesional y coordinación logística. Se confirman antes de continuar. Sin cargos sorpresa.",
      quoteTitle: "Cotización inteligente",
      quoteNote:
        "Rellena esto y te lo mandamos a WhatsApp listo (con tu resumen).",
      longTitle: "Rutas largas (desde Tampa)",
      longNote:
        "Reservas: 5–7 días antes. Rango típico: $3,500–$7,000 según carga, distancia y accesos.",
      depositTitle: "Depósito",
      depositText:
        "Depósito del 30% para reservar. OJO: el depósito se descuenta del total (no es un cargo extra). El resto se paga el día del servicio.",
      payNote:
        "El depósito se coordina por Zelle/Cash App (por WhatsApp).",
      previewTitle: "Mensaje que se va a enviar",
      confirm:
        "Confirmo que este resumen está correcto y quiero enviarlo a WhatsApp",
      sendWA: "Enviar a WhatsApp",
      langBtn: "ES",
      routeLocal: "Local (≤ 45 millas)",
      routeOrlando: "Tampa → Orlando (área)",
      routeMiami: "Tampa → Miami (área)",
      routeOther: "Otra ruta larga",
      labels: {
        combo: "Combo",
        bedrooms: "Tamaño (habitaciones)",
        floor: "Piso (sin elevador)",
        miles: "Millas estimadas (pickup → delivery)",
        pickup: "Dirección de pickup",
        dropoff: "Dirección de delivery",
        date: "Fecha (preferida)",
        name: "Nombre",
        phone: "Teléfono",
        notes: "Notas (opcional)",
      },
      floor0: "0 / casa / con elevador",
      floor2: "2do piso (+$150)",
      floor3: "3er piso (+$250)",
      floor4: "4to piso (+$350)",
      est: "Estimado",
      includesMiles: "Millas incluidas",
      extraMiles: "Millas extra",
      subtotal: "Subtotal",
      deposit: "Depósito (30%)",
      remaining: "Resto al completar",
      disclaimer:
        "Nota: Esto es un estimado. Confirmamos precio final por WhatsApp según inventario, accesos y horario.",
      show: "Ver",
      hide: "Cerrar",
    };

    const EN = {
      brandLine:
        "Premium, clean and safe moving. Local Tampa Bay service and long-distance routes by confirmation.",
      citiesTitle: "Local service area (Tampa Bay)",
      cities:
        "Tampa • Brandon • Clearwater • Wesley Chapel • St. Petersburg",
      coreTitle: "Always included",
      coreBullets: [
        "Truck + full equipment",
        "3 professional movers",
        "Liability insurance",
        "Blanket protection",
      ],
      combosTitle: "Combos",
      tapHint: "Tap a combo to see what’s included.",
      extrasTitle: "Protection & Operational Adjustments",
extrasNote:
  "These adjustments reflect real labor time, professional protection and route coordination. Confirmed before proceeding. No surprise charges.",
      quoteTitle: "Smart quote",
      quoteNote:
        "Fill this out and we’ll send it to WhatsApp ready (with your summary).",
      longTitle: "Long-distance (from Tampa)",
      longNote:
        "Booking: 5–7 days in advance. Typical range: $3,500–$7,000 based on load, distance and access.",
      depositTitle: "Deposit",
      depositText:
        "30% deposit to reserve. IMPORTANT: deposit is applied to the total (not an extra fee). Remaining balance is due on service day.",
      payNote:
        "Deposit is coordinated via Zelle/Cash App (on WhatsApp).",
      previewTitle: "Message that will be sent",
      confirm:
        "I confirm this summary is correct and I want to send it to WhatsApp",
      sendWA: "Send to WhatsApp",
      langBtn: "EN",
      routeLocal: "Local (≤ 45 miles)",
      routeOrlando: "Tampa → Orlando (area)",
      routeMiami: "Tampa → Miami (area)",
      routeOther: "Other long route",
      labels: {
        combo: "Combo",
        bedrooms: "Size (bedrooms)",
        floor: "Floor (no elevator)",
        miles: "Estimated miles (pickup → delivery)",
        pickup: "Pickup address",
        dropoff: "Delivery address",
        date: "Preferred date",
        name: "Name",
        phone: "Phone",
        notes: "Notes (optional)",
      },
      floor0: "0 / house / elevator",
      floor2: "2nd floor (+$150)",
      floor3: "3rd floor (+$250)",
      floor4: "4th floor (+$350)",
      est: "Estimate",
      includesMiles: "Included miles",
      extraMiles: "Extra miles",
      subtotal: "Subtotal",
      deposit: "Deposit (30%)",
      remaining: "Remaining due",
      disclaimer:
        "Note: This is an estimate. Final price confirmed on WhatsApp based on inventory, access and schedule.",
      show: "Open",
      hide: "Close",
    };

    return lang === "es" ? ES : EN;
  }, [lang]);

  const [combo, setCombo] = useState<ComboKey>("standard");
  const [bedrooms, setBedrooms] = useState<Bedrooms>(2);
  const [floorNoElev, setFloorNoElev] = useState<FloorNoElev>(0);

  const [miles, setMiles] = useState<number>(10);
  const [route, setRoute] = useState<RouteKey>("local");

  const [exBoxM, setExBoxM] = useState<number>(0);
  const [exBoxL, setExBoxL] = useState<number>(0);
  const [exBoxR, setExBoxR] = useState<number>(0);
  const [exWrap, setExWrap] = useState<number>(0);
  const [exTvBox, setExTvBox] = useState<number>(0);
  const [exStop, setExStop] = useState<number>(0);
  const [exHours, setExHours] = useState<number>(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const [openCombo, setOpenCombo] = useState<ComboKey | null>("standard");
  const [confirmSend, setConfirmSend] = useState(false);

  // Auto-cambia a “ruta larga” si pasan de 45 millas
  const computedRoute: RouteKey = useMemo(() => {
    const m = Number.isFinite(miles) ? miles : 0;
    if (m <= LOCAL_MILES_CAP) return "local";
    return route === "local" ? "other_long" : route;
  }, [miles, route]);

  const estimate = useMemo(() => {
    const c = COMBOS[combo];
    const base = c.priceByBedrooms[bedrooms];

    const stairsFee = FLOORS_FEES[floorNoElev] ?? 0;

    // Extras
    const extrasTotal =
      exBoxM * EXTRAS.boxMedium +
      exBoxL * EXTRAS.boxLarge +
      exBoxR * EXTRAS.boxReinforced +
      exWrap * EXTRAS.stretchWrapRoll +
      exTvBox * EXTRAS.tvBox +
      exStop * EXTRAS.extraStop +
      exHours * EXTRAS.extraHourAfter8;

    // Local miles
    const includedMiles = c.includedMiles;
    const extraMilesLocal =
      computedRoute === "local" ? Math.max(0, miles - includedMiles) : 0;
    const milesFee = extraMilesLocal * EXTRA_MILE_PRICE;

    // Long distance “smart range”
    // Base por ruta + ajuste por tamaño + ajuste por accesos.
    let longBase = 0;
    if (computedRoute !== "local") {
      if (computedRoute === "tampa_orlando") longBase = 3500;
      else if (computedRoute === "tampa_miami") longBase = 4000;
      else longBase = 4500;

      const sizeAdj = [0, 400, 900, 1400][bedrooms - 1] ?? 0; // escala simple
      const accessAdj = stairsFee; // mismo fee por accesos
      // millas como factor suave (si el usuario pone más)
      const milesAdj = Math.max(0, miles - LOCAL_MILES_CAP) * 6;

      // En rutas largas NO sumamos “$3/milla” como local (para no confundir).
      // Solo usamos ajuste suave por distancia.
      longBase = longBase + sizeAdj + accessAdj + milesAdj;
    }

    const subtotal =
      computedRoute === "local" ? base + stairsFee + milesFee + extrasTotal : longBase + extrasTotal;

    const deposit = subtotal * DEPOSIT_RATE;
    const remaining = subtotal - deposit;

    return {
      subtotal,
      deposit,
      remaining,
      includedMiles,
      extraMilesLocal,
      milesFee,
      stairsFee,
      extrasTotal,
      base,
      longBase,
    };
  }, [
    combo,
    bedrooms,
    floorNoElev,
    miles,
    computedRoute,
    route,
    exBoxM,
    exBoxL,
    exBoxR,
    exWrap,
    exTvBox,
    exStop,
    exHours,
  ]);

  const comboLabel = (k: ComboKey) =>
    lang === "es" ? COMBOS[k].title_es : COMBOS[k].title_en;

  const routeLabel = (k: RouteKey) => {
    if (k === "local") return t.routeLocal;
    if (k === "tampa_orlando") return t.routeOrlando;
    if (k === "tampa_miami") return t.routeMiami;
    return t.routeOther;
  };

  const msg = useMemo(() => {
    const lines: string[] = [];
    lines.push(`${COMPANY}`);
    lines.push("");
    lines.push(
  lang === "es"
     ? "Estimado Profesional de Mudanza"
     : "Professional Moving Estimate"
   ); 
    lines.push("");
    if (name.trim()) lines.push(`${t.labels.name}: ${name.trim()}`);
    if (phone.trim()) lines.push(`${t.labels.phone}: ${phone.trim()}`);
    if (date.trim()) lines.push(`${t.labels.date}: ${date.trim()}`);
    if (pickup.trim()) lines.push(`${t.labels.pickup}: ${pickup.trim()}`);
    if (dropoff.trim()) lines.push(`${t.labels.dropoff}: ${dropoff.trim()}`);
    lines.push("");
    lines.push(`${t.labels.combo}: ${comboLabel(combo)}`);
    lines.push(`${t.labels.bedrooms}: ${bedrooms}`);
    lines.push(`${t.labels.floor}: ${floorNoElev === 0 ? (lang === "es" ? "0 / casa / con elevador" : "0 / house / elevator") : floorNoElev}`);
    lines.push(`${t.labels.miles}: ${miles}`);
    lines.push(`${lang === "es" ? "Ruta" : "Route"}: ${routeLabel(computedRoute)}`);
    lines.push("");

    // Extras
    const ex: string[] = [];
    if (exBoxM) ex.push(`${lang === "es" ? "Cajas medianas" : "Medium boxes"}: ${exBoxM}`);
    if (exBoxL) ex.push(`${lang === "es" ? "Cajas grandes" : "Large boxes"}: ${exBoxL}`);
    if (exBoxR) ex.push(`${lang === "es" ? "Cajas reforzadas" : "Reinforced boxes"}: ${exBoxR}`);
    if (exWrap) ex.push(`${lang === "es" ? "Rollo stretch wrap" : "Stretch wrap roll"}: ${exWrap}`);
    if (exTvBox) ex.push(`${lang === "es" ? "Caja TV adicional" : "Extra TV box"}: ${exTvBox}`);
    if (exStop) ex.push(`${lang === "es" ? "Parada adicional" : "Extra stop"}: ${exStop}`);
    if (exHours) ex.push(`${lang === "es" ? "Horas extra (después 8h)" : "Extra hours (after 8h)"}: ${exHours}`);
    if (ex.length) {
      lines.push(lang === "es" ? "Extras:" : "Extras:");
      lines.push(...ex.map((x) => "• " + x));
      lines.push("");
    }

    // Totales (claros)
    lines.push(`${t.subtotal}: ${fmtUSD(estimate.subtotal)}`);
    lines.push(`${t.deposit}: ${fmtUSD(estimate.deposit)} (${Math.round(DEPOSIT_RATE * 100)}%)`);
    lines.push(`${t.remaining}: ${fmtUSD(estimate.remaining)}`);
    lines.push("");
  lines.push(
  lang === "es"
    ? "Este estimado se basa en la información proporcionada. La confirmación final se realiza por WhatsApp."
    : "This estimate is based on the provided details. Final confirmation is completed via WhatsApp."
   );
    return lines.join("\n");
  }, [
    lang,
    t,
    name,
    phone,
    date,
    pickup,
    dropoff,
    combo,
    bedrooms,
    floorNoElev,
    miles,
    computedRoute,
    exBoxM,
    exBoxL,
    exBoxR,
    exWrap,
    exTvBox,
    exStop,
    exHours,
    estimate.subtotal,
    estimate.deposit,
    estimate.remaining,
  ]);

  const waLink = useMemo(() => {
    return "https://wa.me/" + PHONE_E164 + "?text=" + encodeURIComponent(msg);
  }, [msg]);

  return (
    <main className="wrap">
      <style jsx global>{`
        :root{
          --bg: #f6f5f2;
          --card: rgba(255,255,255,0.78);
          --text: #0e0e10;
          --muted: rgba(14,14,16,0.68);
          --line: rgba(14,14,16,0.10);
          --gold: #b8953a;
          --gold2: #8a6a1e;
          --shadow: 0 14px 40px rgba(0,0,0,.10);
          --radius: 18px;
        }
        .premiumHeader{
  padding: 28px 20px;
  background: linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.6));
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(184,149,58,0.15);
}

.headerInner{
  max-width: 1200px;
  margin: 0 auto;
  display:flex;
  justify-content: space-between;
  align-items:center;
}

.brandBlock{
  display:flex;
  align-items:center;
  gap:14px;
}

.logo{
  width:48px;
  height:48px;
  object-fit:contain;
  filter: drop-shadow(0 8px 18px rgba(184,149,58,.35));
  transition:.3s ease;
}

.logo:hover{
  transform: scale(1.05);
}
.brandTitle{
  margin:0;
  font-size:20px;
  letter-spacing:.4px;
  font-weight:600;
}

.brandSub{
  margin:2px 0 0 0;
  font-size:13px;
  color:rgba(0,0,0,0.55);
}

.langSwitch{
  background:transparent;
  border:1px solid rgba(184,149,58,0.35);
  padding:6px 14px;
  border-radius:20px;
  cursor:pointer;
  transition:.25s ease;
}

.langSwitch:hover{
  background:rgba(184,149,58,0.08);
}
        *{ box-sizing:border-box; }
        html,body{ height:100%; }
        body{
          margin:0;
          background: radial-gradient(900px 400px at 20% 0%, rgba(184,149,58,.10), transparent 60%),
                      radial-gradient(900px 500px at 80% 10%, rgba(138,106,30,.10), transparent 60%),
                      var(--bg);
          color: var(--text);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Apple Color Emoji","Segoe UI Emoji";
        }
        a{ color: inherit; }
        .wrap{
          max-width: 1120px;
          margin: 0 auto;
          padding: 22px 16px 60px;
        }
        .topbar{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          margin-bottom: 14px;
        }
        .pill{
          display:inline-flex;
          align-items:center;
          gap:10px;
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.6);
          border-radius: 999px;
          padding: 8px 12px;
          box-shadow: 0 10px 26px rgba(0,0,0,.06);
        }
        .langbtn{
          border: 1px solid var(--line);
          background: rgba(255,255,255,0.75);
          padding: 8px 12px;
          border-radius: 999px;
          font-weight: 800;
          cursor:pointer;
        }
        .hero{
          display:grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 16px;
          align-items: stretch;
        }
        @media (max-width: 900px){
          .hero{ grid-template-columns: 1fr; }
        }
        .card{
          background: var(--card);
          border: 1px solid var(--line);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          backdrop-filter: blur(10px);
        }
        .heroLeft{ padding: 18px; }
        .brandRow{
          display:flex;
          align-items:center;
          gap: 14px;
        }
        .logoWrap{
          width: 68px;
          height: 68px;
          border-radius: 999px;
          border: 1px solid rgba(184,149,58,.35);
          box-shadow: 0 14px 34px rgba(184,149,58,.18);
          overflow:hidden;
          background: #000;
          flex: 0 0 auto;
        }
        .logoWrap img{
          width:100%;
          height:100%;
          object-fit: cover;
          display:block;
        }
        .brandName{
          font-size: 28px;
          line-height: 1.05;
          margin: 0;
          letter-spacing: -0.6px;
        }
        .sub{
          margin: 8px 0 0;
          color: var(--muted);
          font-size: 14.5px;
          max-width: 64ch;
        }
        .miniGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 14px;
        }
        @media (max-width: 560px){
          .miniGrid{ grid-template-columns: 1fr; }
        }
        .mini{
          padding: 14px;
        }
        .mini h3{
          margin:0 0 8px;
          font-size: 14px;
          letter-spacing: .2px;
        }
        .mini p{
          margin:0;
          color: var(--muted);
          font-size: 13.5px;
          line-height: 1.35;
        }
        .bullets{
          margin: 10px 0 0;
          padding-left: 18px;
          color: var(--muted);
          font-size: 13.5px;
          line-height: 1.35;
        }
        .heroRight{ padding: 18px; }
        .sectionTitle{
          margin: 0 0 6px;
          font-size: 16px;
          letter-spacing: .2px;
        }
        .hint{
          margin: 0 0 12px;
          color: var(--muted);
          font-size: 13px;
        }
        .comboList{
          display:grid;
          gap: 10px;
        }
        .comboItem{
          border-radius: 16px;
          border: 1px solid rgba(184,149,58,.24);
          background: rgba(255,255,255,0.72);
          overflow:hidden;
        }
        .comboHead{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:10px;
          padding: 12px 12px;
          cursor:pointer;
        }
        .comboHead strong{
          display:block;
          font-size: 14px;
        }
        .comboHead span{
          display:block;
          color: var(--muted);
          font-size: 12.5px;
          margin-top: 2px;
        }
        .tag{
          font-weight: 900;
          padding: 7px 10px;
          border-radius: 999px;
          border: 1px solid rgba(14,14,16,.10);
          background: linear-gradient(180deg, rgba(184,149,58,.20), rgba(184,149,58,.06));
        }
        .comboBody{
          border-top: 1px solid rgba(14,14,16,.08);
          padding: 12px 12px 14px;
          display:grid;
          gap: 10px;
        }
        .pricesRow{
          display:grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
        }
        @media (max-width: 520px){
          .pricesRow{ grid-template-columns: 1fr 1fr; }
        }
        .priceChip{
          padding: 10px;
          border-radius: 14px;
          border: 1px solid rgba(14,14,16,.10);
          background: rgba(255,255,255,0.75);
        }
        .priceChip div:first-child{
          color: var(--muted);
          font-size: 12px;
        }
        .priceChip div:last-child{
          font-weight: 900;
          margin-top: 4px;
        }
        .incl{
          margin:0;
          padding-left: 18px;
          color: var(--muted);
          font-size: 13px;
          line-height: 1.35;
        }
        .grid2{
  display: grid;
  grid-template-columns: 1fr;   /* 1 columna SIEMPRE */
  gap: 14px;
  margin-top: 16px;
  max-width: 820px;            /* look premium, no “tabla” */
  margin-left: auto;
  margin-right: auto;
}
        .pad{ padding: 18px; }
        .extrasGrid{
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 10px;
        }
        @media (max-width: 520px){
          .extrasGrid{ grid-template-columns: 1fr; }
        }
        .field{
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        label{
          font-size: 12.5px;
          color: var(--muted);
        }
        input, select, textarea{
          width:100%;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(14,14,16,.12);
          background: rgba(255,255,255,0.88);
          outline:none;
          font-size: 14px;
        }
        .previewBox{
  width:100%;
  padding:16px 18px;
  border-radius:16px;

  border:1px solid rgba(212,175,55,.35);
  background: linear-gradient(
    180deg,
    rgba(255,255,255,.96),
    rgba(255,255,255,.88)
  );

  box-shadow: 0 18px 40px rgba(0,0,0,.06);

  font-size:14px;
  line-height:1.45;

  white-space:pre-wrap;
  word-break:break-word;
  overflow:visible;
}
        .numbersRow{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 680px){
          .numbersRow{ grid-template-columns: 1fr; }
        }
        .totals{
          margin-top: 12px;
          border-top: 1px solid rgba(14,14,16,.10);
          padding-top: 12px;
          display:grid;
          gap: 6px;
        }
        .totalsLine{
          display:flex;
          justify-content:space-between;
          gap:10px;
          color: var(--muted);
          font-size: 13px;
        }
        .totalsLine strong{
          color: var(--text);
        }
        .big{
          display:flex;
          align-items:flex-end;
          justify-content:space-between;
          gap:10px;
          margin-top: 10px;
        }
        .big .n{
          font-size: 34px;
          font-weight: 950;
          letter-spacing: -0.7px;
        }
        .big .label{
          color: var(--muted);
          font-size: 12.5px;
          margin-bottom: 6px;
        }
        .ctaRow{
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          align-items:center;
          margin-top: 12px;
        }
        .btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:10px;
          padding: 14px 16px;
          border-radius: 16px;
          border: 1px solid rgba(14,14,16,.12);
          background: rgba(255,255,255,0.85);
          cursor:pointer;
          font-weight: 900;
          text-decoration:none;
        }
        .btnGold{
          background: linear-gradient(180deg, rgba(184,149,58,0.95), rgba(138,106,30,0.92));
          color: #111;
          border: 1px solid rgba(0,0,0,.10);
        }
        .btnGold[aria-disabled="true"]{
          opacity: .45;
          cursor: not-allowed;
        }
        .note{
          color: var(--muted);
          font-size: 12.8px;
          line-height: 1.35;
          margin: 10px 0 0;
        }
        .divider{
          height: 1px;
          background: rgba(14,14,16,.10);
          margin: 14px 0;
        }
        .checkbox{
          display:flex;
          gap:10px;
          align-items:flex-start;
          margin-top: 10px;
        }
        .checkbox input{ width:auto; margin-top: 2px; }
        .footerBlock{
          margin-top: 14px;
          padding: 14px;
          border-radius: 16px;
          border: 1px solid rgba(184,149,58,.20);
          background: rgba(255,255,255,0.72);
        }
        .footerBlock h3{ margin:0 0 6px; font-size: 14px; }
        .footerBlock p{ margin:0; color: var(--muted); font-size: 13px; line-height: 1.35; }
      /* WhatsApp Button Block */

.waButtonWrap{
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.waCheckbox{
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
}

.waButton{
  width: 100%;
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(184,149,58,.35);
  background: linear-gradient(135deg,#b8953a,#d4af37);
  color: #111;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  transition: all .2s ease;
  box-shadow: 0 10px 30px rgba(184,149,58,.25);
}

.waButton:hover{
  transform: translateY(-2px);
  box-shadow: 0 14px 40px rgba(184,149,58,.35);
}

.waButton:disabled{
  opacity: .5;
  cursor: not-allowed;
  box-shadow: none;
}
 `}</style>

      {/* PREMIUM HEADER */}
<header className="premiumHeader">
  <div className="headerInner">
    <div className="brandBlock">
      <img src="/elephant.png" className="logo" alt="A&K logo" />
      <div>
        <h1 className="brandTitle">{COMPANY}</h1>
        <p className="brandSub">
  {lang === "es"
    ? "Servicio estructurado • Protección real • Cero improvisación"
    : "Structured service • Real protection • Zero improvisation"}
</p>

<p className="brandAuthority">
  {lang === "es"
    ? "Tampa Bay • Servicio premium con planificación profesional"
    : "Tampa Bay • Premium moving with professional planning"}
</p>
      </div>
    </div>

    <button
      className="langSwitch"
      onClick={() => setLang((p) => (p === "en" ? "es" : "en"))}
    >
      {lang === "en" ? "ES" : "EN"}
    </button>
  </div>
</header>

      {/* HERO */}
      <section className="hero">
        <div className="card heroLeft">
          <div className="brandRow">
            <div className="logoWrap" aria-label="logo">
              {/* Pon tu logo aquí: /public/elephant.png */}
              <img src="/elephant.png" alt="A&K logo" />
            </div>
            <div>
              <h1 className="brandName">{COMPANY}</h1>
              <p className="sub">{t.brandLine}</p>
            </div>
          </div>

          <div className="miniGrid">
            <div className="card mini">
              <h3>{t.citiesTitle}</h3>
              <p>{t.cities}</p>
            </div>

            <div className="card mini">
              <h3>{t.coreTitle}</h3>
              <ul className="bullets">
                {t.coreBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          <p className="note" style={{ marginTop: 12 }}>
            {t.disclaimer}
          </p>
        </div>

        {/* COMBOS */}
        <div className="card heroRight">
          <h2 className="sectionTitle">{t.combosTitle}</h2>
          <p className="hint">{t.tapHint}</p>

          <div className="comboList">
            {(["base", "standard", "premium"] as ComboKey[]).map((k) => {

             const isOpen = openCombo === k;
              const title = lang === "es" ? COMBOS[k].title_es : COMBOS[k].title_en;
              const tag = lang === "es" ? (k === "premium" ? "Popular" : k === "standard" ? "Recomendado" : "Base") : (k === "premium" ? "Popular" : k === "standard" ? "Recommended" : "Base");
              const tagline = lang === "es" ? COMBOS[k].tagline_es : COMBOS[k].tagline_en;
              const includes = lang === "es" ? COMBOS[k].includes_es : COMBOS[k].includes_en;

              return (
                <div className="comboItem" key={k}>
                  <div
                    className="comboHead"
                    onClick={() => setOpenCombo((p) => (p === k ? null : k))}
                    role="button"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <strong>{title}</strong>
                      <span>{tagline}</span>
                    </div>
                    <span className="tag">{isOpen ? t.hide : t.show} • {tag}</span>
                  </div>

                  {isOpen && (
                    <div className="comboBody">
                      <div className="pricesRow">
                        {([1, 2, 3, 4] as Bedrooms[]).map((b) => (
                          <div className="priceChip" key={b}>
                            <div>{lang === "es" ? `${b} Hab` : `${b} BR`}</div>
                            <div>{fmtUSD(COMBOS[k].priceByBedrooms[b])}</div>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, color: "rgba(14,14,16,.70)", fontSize: 13 }}>
                        <span>{t.includesMiles}: <strong>{COMBOS[k].includedMiles}</strong></span>
                        <span>{lang === "es" ? "Millaje extra" : "Extra mileage"}: <strong>{fmtUSD(EXTRA_MILE_PRICE)}/mi</strong></span>
                      </div>

                      <ul className="incl">
                        {includes.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>

                      <button
                        className="btn"
                        onClick={() => {
                          setCombo(k);
                          setOpenCombo(k);
                        }}
                        style={{ alignSelf: "start" }}
                      >
                        {lang === "es" ? "Seleccionar este combo" : "Select this combo"}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* EXTRAS + QUOTE */}
      <section className="grid2">
        {/* EXTRAS */}
        <div className="card pad">
          <h2 className="sectionTitle">{t.extrasTitle}</h2>
          <p className="hint">{t.extrasNote}</p>

          <div className="extrasGrid">
  {ADDONS.map((a) => (
    <div key={a.title} className="addonCard">
      <div className="addonTop">
        <div className="addonTitle">{a.title}</div>
        <div className="addonPrice">
          {fmtUSD(a.price)}{a.suffix ? ` ${a.suffix}` : ""}
        </div>
      </div>
      <div className="addonDesc">{a.desc}</div>
    </div>
  ))}
</div>5
   <div className="divider" />

          <div className="footerBlock">
            <h3>{t.longTitle}</h3>
            <p>{t.longNote}</p>
          </div>
        </div>

        {/* QUOTE */}
        <div className="card pad">
          <h2 className="sectionTitle">{t.quoteTitle}</h2>
          <p className="hint">{t.quoteNote}</p>

          <div className="numbersRow">
            <div className="field">
              <label>{t.labels.combo}</label>
              <select value={combo} onChange={(e) => setCombo(e.target.value as ComboKey)}>
                <option value="base">{comboLabel("base")}</option>
                <option value="standard">{comboLabel("standard")}</option>
                <option value="premium">{comboLabel("premium")}</option>
              </select>
            </div>

            <div className="field">
              <label>{t.labels.bedrooms}</label>
              <select value={bedrooms} onChange={(e) => setBedrooms(Number(e.target.value) as Bedrooms)}>
                <option value={1}>{lang === "es" ? "1 Habitación" : "1 Bedroom"}</option>
                <option value={2}>{lang === "es" ? "2 Habitaciones" : "2 Bedrooms"}</option>
                <option value={3}>{lang === "es" ? "3 Habitaciones" : "3 Bedrooms"}</option>
                <option value={4}>{lang === "es" ? "4 / Casa completa" : "4 / Full house"}</option>
              </select>
            </div>

            <div className="field">
              <label>{t.labels.floor}</label>
              <select value={floorNoElev} onChange={(e) => setFloorNoElev(Number(e.target.value) as FloorNoElev)}>
                <option value={0}>{t.floor0}</option>
                <option value={2}>{t.floor2}</option>
                <option value={3}>{t.floor3}</option>
                <option value={4}>{t.floor4}</option>
              </select>
            </div>
          </div>

          <div className="numbersRow" style={{ marginTop: 10 }}>
            <div className="field">
              <label>{t.labels.miles}</label>
              <input
                type="number"
                min={0}
                value={miles}
                onChange={(e) => setMiles(Number(e.target.value || 0))}
              />
              <div className="note">
                {computedRoute === "local"
                  ? (lang === "es"
                      ? `Local hasta ${LOCAL_MILES_CAP} millas. Después cambia a ruta larga.`
                      : `Local up to ${LOCAL_MILES_CAP} miles. After that it switches to long-distance.`)
                  : (lang === "es"
                      ? "Ruta larga: NO sumamos $3/milla como local. Se confirma por WhatsApp."
                      : "Long-distance: we do NOT add $3/mile like local. Confirmed on WhatsApp.")}
              </div>
            </div>

            <div className="field">
              <label>{lang === "es" ? "Tipo de ruta" : "Route type"}</label>
              <select
                value={computedRoute === "local" ? "local" : route}
                onChange={(e) => setRoute(e.target.value as RouteKey)}
                disabled={computedRoute === "local"}
              >
                <option value="local">{t.routeLocal}</option>
                <option value="tampa_orlando">{t.routeOrlando}</option>
                <option value="tampa_miami">{t.routeMiami}</option>
                <option value="other_long">{t.routeOther}</option>
              </select>
            </div>

            <div className="field">
              <label>{t.labels.date}</label>
              <input value={date} onChange={(e) => setDate(e.target.value)} placeholder={lang === "es" ? "Ej: 2026-03-15" : "Ex: 2026-03-15"} />
            </div>
          </div>

          <div className="numbersRow" style={{ marginTop: 10 }}>
            <div className="field">
              <label>{t.labels.name}</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder={lang === "es" ? "Tu nombre" : "Your name"} />
            </div>
            <div className="field">
              <label>{t.labels.phone}</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={lang === "es" ? "Tu número" : "Your phone"} />
            </div>
            <div className="field">
              <label>{t.labels.notes}</label>
              <input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder={lang === "es" ? "Detalles rápidos" : "Quick details"} />
            </div>
          </div>

          <div className="field" style={{ marginTop: 10 }}>
            <label>{t.labels.pickup}</label>
            <input value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder={lang === "es" ? "Dirección completa" : "Full address"} />
          </div>

          <div className="field" style={{ marginTop: 10 }}>
            <label>{t.labels.dropoff}</label>
            <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} placeholder={lang === "es" ? "Dirección completa" : "Full address"} />
          </div>

          {/* Totals */}
          <div className="big">
            <div>
              <div className="label">{t.est}</div>
              <div className="n">{fmtUSD(estimate.subtotal)}</div>
            </div>
            <div style={{ textAlign: "right", color: "rgba(14,14,16,.72)", fontSize: 13 }}>
              <div>{t.deposit}: <strong>{fmtUSD(estimate.deposit)}</strong></div>
              <div>{t.remaining}: <strong>{fmtUSD(estimate.remaining)}</strong></div>
            </div>
          </div>

          <div className="totals">
            {computedRoute === "local" && (
              <>
                <div className="totalsLine">
                  <span>{lang === "es" ? "Base del combo" : "Combo base"}</span>
                  <strong>{fmtUSD(estimate.base)}</strong>
                </div>
                <div className="totalsLine">
                  <span>{lang === "es" ? "Escaleras (sin elevador)" : "Stairs (no elevator)"}</span>
                  <strong>{fmtUSD(estimate.stairsFee)}</strong>
                </div>
                <div className="totalsLine">
                  <span>
                    {t.extraMiles}: {estimate.extraMilesLocal} × {fmtUSD(EXTRA_MILE_PRICE)}
                  </span>
                  <strong>{fmtUSD(estimate.milesFee)}</strong>
                </div>
              </>
            )}

            {computedRoute !== "local" && (
              <div className="totalsLine">
                <span>{lang === "es" ? "Ruta larga (estimado)" : "Long-distance (estimate)"}</span>
                <strong>{fmtUSD(estimate.longBase)}</strong>
              </div>
            )}

            <div className="totalsLine">
              <span>{lang === "es" ? "Extras" : "Extras"}</span>
              <strong>{fmtUSD(estimate.extrasTotal)}</strong>
            </div>
          </div>

          <div className="divider" />

          <div className="footerBlock">
            <h3>{t.depositTitle}</h3>
            <p>{t.depositText}</p>
            <p style={{ marginTop: 8 }}>{t.payNote}</p>
          </div>

          <div className="divider" />

          <h3 className="sectionTitle" style={{ marginTop: 0 }}>
            {t.previewTitle}
          </h3>
          <div className="previewBox">
  {msg.split("\n").map((line, i) => (
    <div key={i}>{line}</div>
  ))}
</div>

          <div className="waButtonWrap">
  <label className="waCheckbox">
    <input
      type="checkbox"
      checked={confirmSend}
      onChange={(e) => setConfirmSend(e.target.checked)}
    />
    <span>
      I confirm this summary is correct and I want to send it to WhatsApp
    </span>
  </label>

  <button
  className="waButton"
  disabled={!confirmSend}
  onClick={handleSendWhatsApp}
>
  Send to WhatsApp
</button>

</div>
</div>
</section>
</main>
  );
}