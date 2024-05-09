import { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import createClient from "../libs";

// const prisma = new PrismaClient();

// export default async function main(prisma: PrismaClient) {
//   try {
//     await prisma.$connect();
//   } catch (err) {
//     return Error("失敗しました");
//   }

// }

//ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
  let prisma;
  try {
    prisma = await createClient();
    if (prisma) {
      const posts = await prisma.post.findMany();
      return NextResponse.json({ message: "Success", posts }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};

//投稿用API
export const POST = async (req: Request, res: NextResponse) => {
  let prisma;
  try {
    const { title, description } = await req.json();
    prisma = await createClient();
    if (prisma) {
      const posts = await prisma.post.create({ data: { title, description } });
      return NextResponse.json({ message: "Success", posts }, { status: 201 });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};
