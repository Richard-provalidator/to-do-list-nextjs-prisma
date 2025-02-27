import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "사용자를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error: "비밀번호가 일치하지 않습니다.",
        },
        { status: 401 }
      );
    }

    const { password: _ignored, ...userData } = user;
    console.log(user);
    console.log(userData);

    return NextResponse.json({
      success: true,
      data: userData,
    });
    // @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "로그인에 실패했습니다." },
      { status: 500 }
    );
  }
}
