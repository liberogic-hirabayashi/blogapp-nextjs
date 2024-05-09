import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export default async function createClient() {
  try {
    await prisma.$connect();
    return prisma
  } catch (err) {
    return null
  }

}