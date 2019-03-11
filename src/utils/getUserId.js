export default function getUserId(user) {
  return `${user.id.name}-${user.id.value}`;
};