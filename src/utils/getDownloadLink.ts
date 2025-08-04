export function getDownloadLink(text: string, type = 'text/plain'): string {
  const blob = new Blob([text], { type });
  return URL.createObjectURL(blob);
}
