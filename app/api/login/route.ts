import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET;

export async function POST(req: Request) {
  if (!SECRET_KEY) {
    return NextResponse.json(
      { message: "JWT secret is not set" },
      { status: 500 }
    );
  }

  const { email, password } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !user.isAdmin) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const token = jwt.sign(
    { userId: user.id, isAdmin: user.isAdmin },
    SECRET_KEY,
    { expiresIn: "1h" }
  );

  const response = NextResponse.json({ message: "Login successful", token });

  return response;
}
