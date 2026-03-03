"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Lang = "en" | "es";
type PackageKey = "base" | "standard" | "premium";

const DISPLAY_PHONE = "(727) 492-3881";
const WHATSAPP_PHONE_DIGITS = "17274923881"; // 1 + area + number

// Local detection (your rule)
const LOCAL_MIN = 35; // reference band start
const LOCAL_MAX = 45; // hard cap local

const EXTRA_MILE_PRICE = 3; // $ per mile after included miles
const DEPOSIT_RATE = 0.3; // 30%

// Pricing knobs (simple + predictable; you can tune later)
const BEDROOM_ADD = 150; // per extra bedroom after 1
const STAIRS_FEE_PER_FLIGHT = 50; // only if no elevator

// Long-distance estimator (rough, but automated)
const LD_MIN = 3500;
const LD_MAX = 7000;
// We map miles 46..300 to 3500..7000, clamp.
function estimateLongDistance(miles: number) {
  const m = Math.max(46, Math.min(300, miles));
  const t = (m - 46) / (300 - 46);
  const est = LD_MIN + t * (LD_MAX - LD_MIN);
  return Math.round(est / 25) * 25; // round to nearest $25
}

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const TEXT = {
  en: {
    brandLine:
      "Premium moving services across Tampa and beyond. Structured pricing. Fully insured. Built for precision and reliability.",
    areasLine: "Tampa • Brandon • Clearwater • St. Petersburg • Wesley Chapel",
    nowServing: "Also serving Orlando & Miami (and surrounding areas) from Tampa.",
    choose: "Choose Your Experience",
    packages: "Packages",
    tapToOpen: "Tap a package to see details",
    extrasTitle: "Extras (optional)",
    extrasNote:
      "Extras apply to any package. Recommended for Essential when you need flexibility.",
    calculatorTitle: "Instant Estimate",
    calcNote:
      "Final price may vary after confirming inventory, access and distance. Everything is confirmed via WhatsApp.",
    longTitle: "Long-distance (Florida)",
    longNote:
      "Long-distance moves require reservation 5–7 days in advance. Price depends on inventory, stairs/elevator access and destination area.",
    localDetect: "Local distance detection",
    localYes: "Local move (≤ 45 miles)",
    localBand: "Your local band is 35–45 miles.",
    localNo: "Long-distance detected (> 45 miles)",
    fields: {
      lang: "Language",
      bedrooms: "Size (bedrooms)",
      stairs: "Stairs (no elevator)",
      elevator: "Elevator available",
      miles: "Total miles (approx.)",
      pickup: "Pickup address",
      dropoff: "Delivery address",
      day: "Preferred day",
      time: "Preferred time",
    },
    buttons: {
      whatsapp: "Request quote via WhatsApp",
      call: "Call now",
      openDetails: "View details",
      close: "Close",
    },
    labels: {
      estimatedTotal: "Estimated total",
      deposit: "Deposit",
      extraMiles: "Extra miles",
      includedMiles: "Included miles",
      stairsFee: "Stairs fee",
      bedroomAdd: "Bedrooms add",
      longDistanceEstimate: "Estimated long-distance",
    },
  },
  es: {
    brandLine:
      "Servicios de mudanza premium desde Tampa y hacia afuera. Precios estructurados. Asegurados. Precisión y confiabilidad.",
    areasLine: "Tampa • Brandon • Clearwater • St. Petersburg • Wesley Chapel",
    nowServing: "También abrimos Orlando y Miami (y zonas aledañas) desde Tampa.",
    choose: "Elige tu experiencia",
    packages: "Paquetes",
    tapToOpen: "Toca un paquete para ver detalles",
    extrasTitle: "Extras (opcional)",
    extrasNote:
      "Los extras aplican a cualquier paquete. Recomendado para Esencial si necesitas flexibilidad.",
    calculatorTitle: "Estimado al instante",
    calcNote:
      "El precio final puede variar tras confirmar inventario, acceso y distancia. Todo se confirma por WhatsApp.",
    longTitle: "Viajes largos (Florida)",
    longNote:
      "Los viajes largos requieren reserva 5–7 días antes. El precio depende del inventario, escaleras/elevador y el área de destino.",
    localDetect: "Detección de área local",
    localYes: "Mudanza local (≤ 45 millas)",
    localBand: "Tu banda local es 35–45 millas.",
    localNo: "Se detectó viaje largo (> 45 millas)",
    fields: {
      lang: "Idioma",
      bedrooms: "Tamaño (habitaciones)",
      stairs: "Escaleras (sin elevador)",
      elevator: "Hay elevador",
      miles: "Millas totales (aprox.)",
      pickup: "Dirección de recogida",
      dropoff: "Dirección de entrega",
      day: "Día preferido",
      time: "Hora preferida",
    },
    buttons: {
      whatsapp: "Pedir cotización por WhatsApp",
      call: "Llama ahora",
      openDetails: "Ver detalles",
      close: "Cerrar",
    },
    labels: {
      estimatedTotal: "Total estimado",
      deposit: "Depósito",
      extraMiles: "Millas extra",
      includedMiles: "Millas incluidas",
      stairsFee: "Cargo por escaleras",
      bedroomAdd: "Cargo por habitaciones",
      longDistanceEstimate: "Estimado viaje largo",
    },
  },
} satisfies Record<Lang, any>;

const PACKAGES: Record<
  PackageKey,
  {
    price: number;
    includedMiles: number;
    label: { en: string; es: string };
    short: { en: string; es: string };
    includes: { en: string[]; es: string[] };
    excludes: { en: string[]; es: string[] };
  }
> = {
  base: {
    price: 1050,
    includedMiles: 20,
    label: { en: "Essential Move", es: "Mudanza Esencial" },
    short: { en: "Simple, clear and efficient.", es: "Simple, clara y eficiente." },
    includes: {
      en: ["Truck + 3 movers", "Standard furniture protection", "Up to 20 miles included"],
      es: ["Camión + 3 trabajadores", "Protección estándar de muebles", "Hasta 20 millas incluidas"],
    },
    excludes: {
      en: [
        "Full packing (kitchen / fragile) — add-on",
        "Extra boxes beyond included amount",
        "TV wall installation (Standard = removal only)",
        "Stairs / no-elevator heavy carries may affect final quote",
        "Long-distance route pricing (separate section)",
      ],
      es: [
        "Empaque completo (cocina / frágiles) — adicional",
        "Cajas extra por encima de lo incluido",
        "Instalación de TV en pared (Standard = solo desmontaje)",
        "Escaleras / sin elevador puede cambiar el estimado",
        "Viajes largos por ruta (sección aparte)",
      ],
    },
  },
  standard: {
    price: 1275,
    includedMiles: 25,
    label: { en: "Professional Move", es: "Mudanza Profesional" },
    short: { en: "Best balance of protection and value.", es: "Balance ideal entre protección y valor." },
    includes: {
      en: [
        "Everything in Essential",
        "Partial packing (kitchen & fragile — limited)",
        "Extra protection materials",
        "Up to 25 miles included",
      ],
      es: [
        "Todo lo incluido en Esencial",
        "Empaque parcial (cocina y frágiles — limitado)",
        "Material adicional de protección",
        "Hasta 25 millas incluidas",
      ],
    },
    excludes: {
      en: [
        "Full packing (kitchen / fragile) — add-on",
        "Extra boxes beyond included amount",
        "TV wall installation (Standard = removal only)",
        "Stairs / no-elevator heavy carries may affect final quote",
        "Long-distance route pricing (separate section)",
      ],
      es: [
        "Empaque completo (cocina / frágiles) — adicional",
        "Cajas extra por encima de lo incluido",
        "Instalación de TV en pared (Standard = solo desmontaje)",
        "Escaleras / sin elevador puede cambiar el estimado",
        "Viajes largos por ruta (sección aparte)",
      ],
    },
  },
  premium: {
    price: 1550,
    includedMiles: 30,
    label: { en: "Premium Move", es: "Mudanza Premium" },
    short: { en: "Priority scheduling + premium care.", es: "Prioridad en agenda + cuidado premium." },
    includes: {
      en: [
        "Everything in Professional",
        "Priority scheduling",
        "Premium protection materials",
        "Furniture organization at destination",
        "TV wall installation (if approved in advance)",
        "Up to 30 miles included",
      ],
      es: [
        "Todo lo incluido en Profesional",
        "Prioridad en agenda",
        "Materiales premium de protección",
        "Organización avanzada de muebles en destino",
        "Instalación de TV en pared (si se aprueba antes)",
        "Hasta 30 millas incluidas",
      ],
    },
    excludes: {
      en: [
        "Full packing (kitchen / fragile) — add-on",
        "Extra boxes beyond included amount",
        "Stairs / no-elevator heavy carries may affect final quote",
        "Long-distance route pricing (separate section)",
      ],
      es: [
        "Empaque completo (cocina / frágiles) — adicional",
        "Cajas extra por encima de lo incluido",
        "Escaleras / sin elevador puede cambiar el estimado",
        "Viajes largos por ruta (sección aparte)",
      ],
    },
  },
};

type Extra = {
  key: string;
  price: number;
  type: "qty" | "toggle";
  en: string;
  es: string;
};

const EXTRAS: Extra[] = [
  { key: "boxMedium", price: 6, type: "qty", en: "Medium box", es: "Caja mediana" },
  { key: "boxLarge", price: 8, type: "qty", en: "Large box", es: "Caja grande" },
  { key: "boxReinforced", price: 14, type: "qty", en: "Reinforced box", es: "Caja reforzada" },
  { key: "stretchWrap", price: 75, type: "toggle", en: "Stretch wrap roll", es: "Rollo de stretch wrap" },
  { key: "tvBox", price: 65, type: "toggle", en: "Extra TV box", es: "Caja TV adicional" },
  { key: "extraStop", price: 175, type: "toggle", en: "Extra stop", es: "Parada adicional" },
  { key: "extraHourAfter8", price: 150, type: "toggle", en: "Extra hour (after 8h)", es: "Hora adicional (después 8h)" },
];

export default function Page() {
  const [lang, setLang] = useState<Lang>("en");
  const t = TEXT[lang];

  const [selected, setSelected] = useState<PackageKey>("premium");
  const [openDetails, setOpenDetails] = useState<PackageKey | null>(null);

  const [bedrooms, setBedrooms] = useState<number>(1);
  const [stairs, setStairs] = useState<number>(0);
  const [elevator, setElevator] = useState<boolean>(false);
  const [miles, setMiles] = useState<number>(35);

  const [day, setDay] = useState<string>("");
  const [time, setTime] = useState<string>("08:00");
  const [pickup, setPickup] = useState<string>("");
  const [dropoff, setDropoff] = useState<string>("");

  const [extraQty, setExtraQty] = useState<Record<string, number>>({
    boxMedium: 0,
    boxLarge: 0,
    boxReinforced: 0,
  });
  const [extraToggle, setExtraToggle] = useState<Record<string, boolean>>({
    stretchWrap: false,
    tvBox: false,
    extraStop: false,
    extraHourAfter8: false,
  });

  const pkg = PACKAGES[selected];

  const isLocal = miles <= LOCAL_MAX;

  const extrasTotal = useMemo(() => {
    let total = 0;
    for (const ex of EXTRAS) {
      if (ex.type === "qty") total += (extraQty[ex.key] || 0) * ex.price;
      if (ex.type === "toggle" && extraToggle[ex.key]) total += ex.price;
    }
    return total;
  }, [extraQty, extraToggle]);

  const extraMiles = Math.max(0, miles - pkg.includedMiles);
  const extraMilesCost = extraMiles * EXTRA_MILE_PRICE;

  const bedroomAddCost = Math.max(0, bedrooms - 1) * BEDROOM_ADD;

  const stairsFee = !elevator && stairs > 0 ? stairs * STAIRS_FEE_PER_FLIGHT : 0;

  const localEstimate = pkg.price + extrasTotal + extraMilesCost + bedroomAddCost + stairsFee;

  const longDistanceEstimate = useMemo(() => estimateLongDistance(miles), [miles]);

  const finalEstimate = isLocal ? localEstimate : longDistanceEstimate;

  const deposit = Math.round(finalEstimate * DEPOSIT_RATE);

  const includedMilesLine = `${t.labels.includedMiles}: ${pkg.includedMiles}`;
  const extraMilesLine = `${t.labels.extraMiles}: ${extraMiles} × $${EXTRA_MILE_PRICE} = ${money(extraMilesCost)}`;
  const bedroomLine = `${t.labels.bedroomAdd}: ${Math.max(0, bedrooms - 1)} × ${money(BEDROOM_ADD)} = ${money(
    bedroomAddCost
  )}`;
  const stairsLine = `${t.labels.stairsFee}: ${stairs} × ${money(STAIRS_FEE_PER_FLIGHT)} = ${money(stairsFee)}`;

  const extrasLines = EXTRAS.map((ex) => {
    if (ex.type === "qty") {
      const q = extraQty[ex.key] || 0;
      if (!q) return null;
      return `• ${(lang === "en" ? ex.en : ex.es)}: ${q} × ${money(ex.price)} = ${money(q * ex.price)}`;
    }
    const on = !!extraToggle[ex.key];
    if (!on) return null;
    return `• ${(lang === "en" ? ex.en : ex.es)}: ${money(ex.price)}`;
  }).filter(Boolean) as string[];

  const waText = useMemo(() => {
    const lines: string[] = [];
    lines.push(`A&K All Services, Inc.`);
    lines.push(lang === "en" ? `Requesting a quote:` : `Pidiendo cotización:`);
    lines.push(`— ${lang === "en" ? "Package" : "Paquete"}: ${pkg.label[lang]} (${money(pkg.price)})`);
    lines.push(`— ${t.fields.bedrooms}: ${bedrooms}`);
    lines.push(`— ${t.fields.miles}: ${miles}`);
    lines.push(`— ${t.fields.stairs}: ${stairs}`);
    lines.push(`— ${t.fields.elevator}: ${elevator ? "Yes" : "No"}`);
    if (day) lines.push(`— ${t.fields.day}: ${day}`);
    if (time) lines.push(`— ${t.fields.time}: ${time}`);
    if (pickup) lines.push(`— ${t.fields.pickup}: ${pickup}`);
    if (dropoff) lines.push(`— ${t.fields.dropoff}: ${dropoff}`);

    lines.push("");
    lines.push(lang === "en" ? "Breakdown:" : "Desglose:");
    lines.push(`• ${includedMilesLine}`);
    lines.push(`• ${extraMilesLine}`);
    lines.push(`• ${bedroomLine}`);
    if (stairsFee > 0) lines.push(`• ${stairsLine}`);
    if (extrasLines.length) {
      lines.push(lang === "en" ? "• Extras:" : "• Extras:");
      lines.push(...extrasLines);
    }

    lines.push("");
    if (isLocal) {
      lines.push(`${t.labels.estimatedTotal}: ${money(localEstimate)}`);
    } else {
      lines.push(`${t.labels.longDistanceEstimate}: ${money(longDistanceEstimate)}`);
      lines.push(lang === "en" ? "Reservation required 5–7 days in advance." : "Reserva requerida 5–7 días antes.");
    }
    lines.push(`${t.labels.deposit} (30%): ${money(deposit)}`);
    lines.push("");
    lines.push(lang === "en" ? "Please confirm inventory details by WhatsApp." : "Confirma inventario por WhatsApp, por favor.");

    return lines.join("\n");
  }, [
    lang,
    pkg,
    bedrooms,
    miles,
    stairs,
    elevator,
    day,
    time,
    pickup,
    dropoff,
    includedMilesLine,
    extraMilesLine,
    bedroomLine,
    stairsLine,
    stairsFee,
    extrasLines,
    isLocal,
    localEstimate,
    longDistanceEstimate,
    deposit,
    t,
  ]);

  const waHref = `https://wa.me/${WHATSAPP_PHONE_DIGITS}?text=${encodeURIComponent(waText)}`;
  const telHref = `tel:${WHATSAPP_PHONE_DIGITS}`;

  return (
  <main className="bg-red-500 text-white p-10">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
              <Image
                src="/elephant.png"
                alt="A&K logo"
                width={44}
                height={44}
                className="rounded-full bg-white p-1"
                priority
              />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">A&K All Services, Inc.</div>
              <div className="text-xs text-zinc-500">{DISPLAY_PHONE}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">{t.fields.lang}</span>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as Lang)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm"
            >
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-zinc-200 bg-gradient-to-b from-zinc-50 to-white p-8 shadow-sm">
          <div className="flex flex-col items-center text-center">
            <Image src="/elephant.png" alt="A&K logo" width={96} height={96} className="rounded-full bg-white p-2 shadow-sm ring-1 ring-black/10" />
            <h1 className="mt-5 text-3xl font-semibold tracking-tight">A&K All Services, Inc.</h1>
            <p className="mt-3 max-w-2xl text-sm text-zinc-600">{t.brandLine}</p>
            <p className="mt-2 text-xs text-zinc-500">{t.areasLine}</p>
            <p className="mt-1 text-xs text-zinc-500">{t.nowServing}</p>

            <div className="mt-7 w-full border-t border-zinc-200 pt-6">
              <h2 className="text-xl font-semibold">{t.choose}</h2>
              <p className="mt-1 text-sm text-zinc-600">{t.tapToOpen}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {(["base", "standard", "premium"] as PackageKey[]).map((k) => {
            const p = PACKAGES[k];
            const active = selected === k;
            return (
              <button
                key={k}
                onClick={() => setSelected(k)}
                className={[
                  "rounded-3xl border p-5 text-left shadow-sm transition",
                  active ? "border-amber-300 ring-2 ring-amber-200 bg-amber-50/40" : "border-zinc-200 bg-white hover:bg-zinc-50",
                ].join(" ")}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-lg font-semibold">{p.label[lang]}</div>
                    <div className="mt-1 text-sm text-zinc-600">{p.short[lang]}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-semibold text-amber-600">{money(p.price)}</div>
                    <div className="text-xs text-zinc-500">{p.includedMiles} mi incl.</div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                    {k === "base" ? (lang === "en" ? "Essential" : "Esencial") : k === "standard" ? (lang === "en" ? "Pro" : "Pro") : "Premium"}
                  </span>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs text-zinc-700">
                    {lang === "en" ? "Tap for details" : "Toca para detalles"}
                  </span>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenDetails(openDetails === k ? null : k);
                    }}
                    className="text-sm font-medium text-zinc-900 underline underline-offset-4"
                  >
                    {openDetails === k ? t.buttons.close : t.buttons.openDetails}
                  </button>

                  {openDetails === k && (
                    <div className="mt-4 grid gap-4 rounded-2xl border border-zinc-200 bg-white p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm font-semibold">{lang === "en" ? "Includes" : "Incluye"}</div>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                            {p.includes[lang].map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{lang === "en" ? "Does not include" : "No incluye"}</div>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-700">
                            {p.excludes[lang].map((it) => (
                              <li key={it}>{it}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* EXTRAS + LOCAL DETECTION */}
      <section className="mx-auto max-w-5xl px-4 pb-10">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t.extrasTitle}</h3>
            <p className="mt-1 text-sm text-zinc-600">{t.extrasNote}</p>

            <div className="mt-5 grid gap-3">
              {/* qty extras */}
              {EXTRAS.filter((x) => x.type === "qty").map((ex) => (
                <div key={ex.key} className="flex items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div>
                    <div className="text-sm font-semibold">{lang === "en" ? ex.en : ex.es}</div>
                    <div className="text-xs text-zinc-600">{money(ex.price)} / {lang === "en" ? "each" : "c/u"}</div>
                  </div>
                  <input
                    type="number"
                    min={0}
                    value={extraQty[ex.key] || 0}
                    onChange={(e) => setExtraQty((s) => ({ ...s, [ex.key]: Number(e.target.value || 0) }))}
                    className="w-24 rounded-xl border border-zinc-200 bg-white px-3 py-2 text-right"
                  />
                </div>
              ))}

              {/* toggle extras */}
              {EXTRAS.filter((x) => x.type === "toggle").map((ex) => (
                <label key={ex.key} className="flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                  <div>
                    <div className="text-sm font-semibold">{lang === "en" ? ex.en : ex.es}</div>
                    <div className="text-xs text-zinc-600">{money(ex.price)}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={!!extraToggle[ex.key]}
                    onChange={(e) => setExtraToggle((s) => ({ ...s, [ex.key]: e.target.checked }))}
                    className="h-5 w-5 accent-amber-600"
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold">{t.localDetect}</h3>
            <p className="mt-1 text-sm text-zinc-600">{t.localBand}</p>

            <div className="mt-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
              <div className="text-sm font-semibold">{isLocal ? t.localYes : t.localNo}</div>
              <div className="mt-2 text-sm text-zinc-700">
                {lang === "en"
                  ? `Local cap is ${LOCAL_MAX} miles. If miles are above ${LOCAL_MAX}, we switch to long-distance estimator.`
                  : `El tope local es ${LOCAL_MAX} millas. Si pasa de ${LOCAL_MAX}, cambia a estimado de viaje largo.`}
              </div>
              <div className="mt-2 text-xs text-zinc-600">
                {lang === "en"
                  ? `Tip: keep most “local” jobs between ${LOCAL_MIN}–${LOCAL_MAX} miles for clean pricing.`
                  : `Tip: mantén lo “local” entre ${LOCAL_MIN}–${LOCAL_MAX} millas para precio limpio.`}
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-4">
              <h4 className="text-sm font-semibold">{t.longTitle}</h4>
              <p className="mt-1 text-sm text-zinc-600">{t.longNote}</p>
              <div className="mt-3 text-sm">
                <span className="font-semibold">{lang === "en" ? "Range:" : "Rango:"}</span>{" "}
                {money(LD_MIN)} – {money(LD_MAX)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">{t.calculatorTitle}</h3>
          <p className="mt-1 text-sm text-zinc-600">{t.calcNote}</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.bedrooms}</label>
                <input
                  type="number"
                  min={1}
                  value={bedrooms}
                  onChange={(e) => setBedrooms(Math.max(1, Number(e.target.value || 1)))}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.stairs}</label>
                <input
                  type="number"
                  min={0}
                  value={stairs}
                  onChange={(e) => setStairs(Math.max(0, Number(e.target.value || 0)))}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                <input
                  type="checkbox"
                  checked={elevator}
                  onChange={(e) => setElevator(e.target.checked)}
                  className="h-5 w-5 accent-amber-600"
                />
                <span className="text-sm text-zinc-800">{t.fields.elevator}</span>
              </label>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.miles}</label>
                <input
                  type="number"
                  min={1}
                  value={miles}
                  onChange={(e) => setMiles(Math.max(1, Number(e.target.value || 1)))}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
                <div className="text-xs text-zinc-600">
                  {lang === "en"
                    ? `Included: ${pkg.includedMiles} mi. Extra miles: $${EXTRA_MILE_PRICE}/mi.`
                    : `Incluye: ${pkg.includedMiles} mi. Millas extra: $${EXTRA_MILE_PRICE}/milla.`}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.day}</label>
                <input
                  type="date"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.time}</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.pickup}</label>
                <input
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder={lang === "en" ? "Street, City, ZIP" : "Calle, Ciudad, ZIP"}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm text-zinc-700">{t.fields.dropoff}</label>
                <input
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  placeholder={lang === "en" ? "Street, City, ZIP" : "Calle, Ciudad, ZIP"}
                  className="rounded-2xl border border-zinc-200 bg-white px-4 py-3"
                />
              </div>
            </div>
          </div>

          {/* SUMMARY */}
          <div className="mt-7 rounded-3xl border border-amber-200 bg-amber-50/40 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-sm text-zinc-700">{t.labels.estimatedTotal}</div>
                <div className="mt-1 text-4xl font-semibold text-zinc-900">{money(finalEstimate)}</div>
                <div className="mt-2 text-sm text-zinc-700">
                  {lang === "en"
                    ? `Deposit (30%) to reserve: ${money(deposit)}`
                    : `Depósito (30%) para reservar: ${money(deposit)}`}
                </div>

                <div className="mt-3 text-xs text-zinc-600 space-y-1">
                  {isLocal ? (
                    <>
                      <div>• {includedMilesLine}</div>
                      <div>• {extraMilesLine}</div>
                      <div>• {bedroomLine}</div>
                      {stairsFee > 0 && <div>• {stairsLine}</div>}
                      {extrasTotal > 0 && <div>• Extras: {money(extrasTotal)}</div>}
                    </>
                  ) : (
                    <>
                      <div>• {t.labels.longDistanceEstimate}: {money(longDistanceEstimate)}</div>
                      <div>• {lang === "en" ? "Reservation required 5–7 days in advance." : "Reserva requerida 5–7 días antes."}</div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-2xl bg-zinc-900 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-zinc-800"
                >
                  {t.buttons.whatsapp}
                </a>
                <a
                  href={telHref}
                  className="rounded-2xl border border-zinc-300 bg-white px-5 py-3 text-center text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                >
                  {t.buttons.call}
                </a>
              </div>
            </div>

            <div className="mt-4 text-xs text-zinc-600">
              {t.calcNote}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-8 text-xs text-zinc-500">
          © 2026 A&K All Services, Inc.
        </div>
      </footer>
    </main>
  );
}