import { NextResponse } from "next/server";
import { abioticFactors } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(abioticFactors);
}
