import { NextResponse } from "next/server";
import { species } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(species);
}
