import { NextResponse } from "next/server";
import { campaigns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json(campaigns);
}
