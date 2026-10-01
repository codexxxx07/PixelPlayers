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