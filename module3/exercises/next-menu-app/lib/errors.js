// The one error shape every API route returns:
// { error: { status, code, message, fieldErrors? } }
const CODES = {
  400: "BAD_REQUEST",
  401: "UNAUTHORIZED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  409: "CONFLICT",
  422: "VALIDATION_FAILED",
};

export function errorBody(status, message, fieldErrors) {
  return {
    error: {
      status,
      code: CODES[status] ?? "ERROR",
      message,
      ...(fieldErrors ? { fieldErrors } : {}),
    },
  };
}

export function errorResponse(status, message, fieldErrors) {
  return Response.json(errorBody(status, message, fieldErrors), { status });
}