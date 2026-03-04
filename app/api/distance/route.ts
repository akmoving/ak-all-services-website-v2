
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true, route: "/api/distance" });
}

export async function POST(req: Request) {
  try {
    const { origin, destination } = await req.json();

    if (!origin || !destination) {
      return NextResponse.json(
        { ok: false, error: "Missing origin/destination" },
        { status: 400 }
      );
    }

    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
      return NextResponse.json(
        { ok: false, error: "Missing GOOGLE_MAPS_API_KEY in env" },
        { status: 500 }
      );
    }

    const url =
      "https://maps.googleapis.com/maps/api/distancematrix/json" +
      `?origins=${encodeURIComponent(origin)}` +
      `&destinations=${encodeURIComponent(destination)}` +
      `&units=imperial&key=${encodeURIComponent(key)}`;

    const r = await fetch(url, { cache: "no-store" });
    const data = await r.json();

    if (data.status !== "OK") {
      return NextResponse.json({ ok: false, data }, { status: 500 });
    }

    const element = data.rows?.[0]?.elements?.[0];
    if (!element || element.status !== "OK") {
      return NextResponse.json({ ok: false, data }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      distanceText: element.distance.text,
      distanceValue: element.distance.value, // meters
      durationText: element.duration.text,
      durationValue: element.duration.value, // seconds
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}