import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    // 해당 유저가 삭제를 시도하는지 (권한 체크)

    const todo = await prisma.todo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ success: true, todoId: todo.id });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "할 일 삭제에 실패했습니다.",
      },
      { status: 500 }
    );
  }
}

// export async function PATCH(
//   request: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = await params;
//   const { content, completed } = await request.json();

//   const exist = await prisma.todo.findUnique({ where: { id : Number(id) } });

//   try {
//       const todo = await prisma.todo.update({
//         data: {
//           id : Number(id),
//           content : content? content : exist.content,
//           completed : completed? completed : exist.completed,
//         },
//       });

//       return NextResponse.json({ success: true, data: todo });
//     } catch (error) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "할 일 추가에 실패했습니다.",
//         },
//         { status: 500 }
//       );
//     }

//   try {
//     // 해당 유저가 삭제를 시도하는지 (권한 체크)

//     const todo = await prisma.todo.delete({
//       where: { id: Number(id) },
//     });

//     return NextResponse.json({ success: true, todoId: todo.id });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         success: false,
//         error: "할 일 삭제에 실패했습니다.",
//       },
//       { status: 500 }
//     );
//   }
// }
