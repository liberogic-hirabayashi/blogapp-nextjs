import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import createClient from "../../libs";

//ブログの詳細記事API
export const GET = async (req: Request, res: NextResponse) => {
  let prisma;
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    prisma = await createClient();
    if (prisma) {
      const post = await prisma.post.findFirst({ where: { id } });
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};

//ブログ記事の編集
export const PUT = async (req: Request, res: NextResponse) => {
  let prisma;
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    const { title, description } = await req.json();
    prisma = await createClient();
    if (prisma) {
      const post = await prisma.post.update({
        data: { title, description },
        where: { id },
      });
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};

//削除
export const DELETE = async (req: Request, res: NextResponse) => {
  let prisma;
  try {
    const id: number = parseInt(req.url.split("/blog/")[1]);
    prisma = await createClient();
    if (prisma) {
      const post = await prisma.post.delete({
        where: { id },
      });
      return NextResponse.json({ message: "Success", post }, { status: 200 });
    }
  } catch (err) {
    return NextResponse.json({ message: "error", err }, { status: 500 });
  } finally {
    if (prisma) {
      await prisma.$disconnect();
    }
  }
};
