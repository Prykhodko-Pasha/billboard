export default function transformDateFormat(date) {
  const newDate = new Date(date);

  const appendZero = (n) => {
    if (n <= 9) {
      return "0" + n;
    }
    return n;
  };

  const formattedDate =
    appendZero(newDate.getDate()) +
    "." +
    appendZero(newDate.getMonth() + 1) +
    "." +
    newDate.getFullYear();

  return formattedDate;
}
