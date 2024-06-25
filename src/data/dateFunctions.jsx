export default function getHoursMinutesDifference(date1, date2) {
  // Get the time in milliseconds for each date
  const time1 = date1.getTime()
  const time2 = date2.getTime()

  // Calculate the difference in milliseconds
  const difference = Math.abs(time2 - time1)

  // Convert the difference to hours and minutes
  const totalMinutes = difference / (1000 * 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = Math.floor(totalMinutes % 60)

  return { hours, minutes }
}

export function getProductivePercentage(hours, minute) {
  const total = parseInt(hours * 60 + minute)
  let result = parseInt((total * 10) / 48)
  if (result >= 100) {
    result = 100
  }
  return result
}



export function extractTime(datetime) {
  const date = new Date(datetime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}