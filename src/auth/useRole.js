import { useUser } from "@clerk/react";
import { getRole } from "./roles";

export function useRole() {
  const { isLoaded, user } = useUser();
  return {
    isLoaded,
    user,
    role: getRole(user),
    claimRole,
  };
}

export async function claimRole(user, role) {
  if (!user) {
    throw new Error("claimRole requires a signed-in user");
  }
  if (role !== "elder" && role !== "caregiver") {
    throw new Error(`Unknown role: ${role}`);
  }
  await user.updateMetadata({ unsafeMetadata: { role } });
  return role;
}