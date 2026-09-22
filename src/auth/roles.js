// Canonical role representation for Pixel Players.
//
// The role lives on the real Clerk user object as metadata:
//   role: 'elder' | 'caregiver'
//
// Read precedence:
//   1. user.publicMetadata.role  — authoritative (Server-set via Clerk Dashboard / Backend API)
//   2. user.unsafeMetadata.role  — client-claimed staging value (persisted server-side on the user)
//
// There is no localStorage auth, no fake role state, no frontend-only security.
// Missing role => claim on /welcome. The value 'role' is stored as { role: 'elder' | 'caregiver' }.

export const ROLES = Object.freeze({
  ELDER: "elder",
  CAREGIVER: "caregiver",
});

export const ROLE_HOMES = Object.freeze({
  [ROLES.ELDER]: "/dashboard",
  [ROLES.CAREGIVER]: "/caregiver/dashboard",
});

export const isRole = (value) => value === ROLES.ELDER || value === ROLES.CAREGIVER;

/**
 * Returns the canonical role for a Clerk user, or null when the account has
 * not claimed a role yet. publicMetadata wins over unsafeMetadata.
 */
export function getRole(user) {
  if (!user) return null;
  const publicRole = user.publicMetadata?.role;
  if (isRole(publicRole)) return publicRole;
  const unsafeRole = user.unsafeMetadata?.role;
  if (isRole(unsafeRole)) return unsafeRole;
  return null;
}

/**
 * Returns the landing route for a role. Unknown roles fall back to the
 * elder dashboard so guards always keep users inside Pixel Players.
 */
export function getHomeForRole(role) {
  return ROLE_HOMES[role] || ROLE_HOMES[ROLES.ELDER];
}