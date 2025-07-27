export function getTitle(mainText: string, additional?: string | null) {
  return additional ? `${mainText} (${additional})` : mainText;
}
