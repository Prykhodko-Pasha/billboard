export default function isAllowedEditing(authorId, userId, role) {
  return userId === authorId || role === "Moderator" || role === "SUPERADMIN";
}
