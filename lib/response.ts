import { NextResponse } from "next/server";

const successResponse = (data: unknown, status: number) => {
  return NextResponse.json(
    {
      data,
      message: "Success",
    },
    { status },
  );
};

const errorResponse = (error: unknown, status: number) => {
  return NextResponse.json(
    {
      message: error instanceof Error ? error.message : "Something went wrong!",
    },
    { status },
  );
};

export { successResponse, errorResponse };
