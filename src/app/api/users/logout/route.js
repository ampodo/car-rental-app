import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json(
      { data: null, message: "You are logged out" },
      { status: 200 }
    );

  
    // clear cookie
    
    response.cookies.delete("token");

    return response;
 
  } catch (error) {
    return NextResponse.json(
      { data: null, message: error.message },
      { status: 500 }
    );
  }
}
