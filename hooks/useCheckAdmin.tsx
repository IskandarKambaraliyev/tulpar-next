import useVerifyJWT from "@/hooks/useVerifyJWT";
import { cookies } from "next/headers";

export default async function useCheckAdmin() {
  const cookieStore = await cookies();
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    return {
      error: "JWT secret key is not set",
      isOk: false,
    };
  }

  const token = cookieStore.get("tulparToken")?.value;

  if (!token) {
    return {
      error: "No token found",
      isOk: false,
    };
  }

  const decoded = await useVerifyJWT(token, SECRET_KEY);

  if (!decoded) {
    return {
      error: "Token verification failed",
      isOk: false,
    };
  }

  if (!decoded.isAdmin) {
    return {
      error: "User is not an admin",
      isOk: false,
    };
  }

  return {
    isOk: true,
    decoded,
  };
}
