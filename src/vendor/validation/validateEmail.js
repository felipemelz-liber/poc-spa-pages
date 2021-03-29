export default function validateEmail(email) {
  if (email === undefined) return false;
  const re = /^([a-zA-Z0-9_.-])+(\+([a-zA-Z0-9_-])+)?@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return re.test(email.toLowerCase());
}
