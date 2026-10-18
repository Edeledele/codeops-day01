import { verifyCredentials, setSession, validateNextUrl } from "../../../lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password, next, localAccounts } = body;

    const user = verifyCredentials(email, password, localAccounts);

    if (!user) {
      return Response.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // Set secure, httpOnly, sameSite session cookie
    await setSession(user);

    // Validate next parameter against open redirect attacks
    const defaultFallback = user.role === "staff" ? "/staff" : "/account";
    const safeRedirectUrl = validateNextUrl(next, defaultFallback);

    return Response.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      redirectUrl: safeRedirectUrl,
    });
  } catch (error) {
    return Response.json(
      { error: "Sign in failed.", details: error.message },
      { status: 500 }
    );
  }
}
