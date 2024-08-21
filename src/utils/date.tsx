export function timeFromDateTime(input: string): string {
  const match = input.match(/T(\d{2}:\d{2}:\d{2})/)
  if (match) {
    return match[1]
  } else {
    console.log('no time found in datetime')
    return '-1'
  }
}
