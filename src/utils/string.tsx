export function isValidEmail(text: string): boolean {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailPattern.test(text)
}

export function isCharNumeric(text: string): boolean {
  if (text.length > 1) throw 'input is not a single character'
  return text >= '0' && text <= '9'
}

export function padNumber(text: string): string {
  return String(text).padStart(2, '0')
}
