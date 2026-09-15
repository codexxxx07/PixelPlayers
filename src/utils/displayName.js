export function getUserDisplayName(user) {
  if (!user) return "";
  return (
    user.firstName ||
    user.fullName ||
    user.username ||
    (user.primaryEmailAddress && user.primaryEmailAddress.emailAddress) ||
    (user.emailAddresses && user.emailAddresses[0] && user.emailAddresses[0].emailAddress) ||
    ""
  );
}