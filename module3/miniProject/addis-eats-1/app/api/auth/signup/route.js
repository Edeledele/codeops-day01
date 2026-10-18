import { registerUser, setSession, validateNextUrl } from "../../../lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, phone, address, next } = body;

    if (!name || !email || !password) {
      return Response.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        { error: "Password must be at least 6 characters long." },
        { status: 400 }
      );
    }

    const newUser = registerUser({ name, email, password, phone, address });

    // Automatically set active session cookie for the new user
    await setSession(newUser);

    const safeRedirectUrl = validateNextUrl(next, "/account");

    return Response.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      redirectUrl: safeRedirectUrl,
    });
  } catch (error) {
    return Response.json(
      { error: error.message || "Failed to create account." },
      { status: 400 }
    );
  }
}
