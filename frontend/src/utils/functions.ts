export function parseForm(formEl: HTMLFormElement) {
  const formData = new FormData(formEl);
  const form = Object.fromEntries(formData.entries());
  return form;
}

export function authHeader(token: string) {
  return `Bearer ${token}`;
}
