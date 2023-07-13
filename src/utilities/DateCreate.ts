export function dateCreate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("en-US", { month: "long" });
  const date = currentDate.getDate();
  let hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  const period = hour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hour = hour % 12 || 12;

  const formattedDate = `${year},${month} ${date} ${hour}:${minute} ${period}`;

  return formattedDate;
}
