export function formatTime(time) {
  const res = time?.split(":")
  return `${res?.[0]}:${res?.[1]}`
}
