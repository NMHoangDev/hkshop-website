function formatNumberWithCommas(number) {
  if (number === undefined || number === null) return "";
  const parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(",");
}

export default formatNumberWithCommas;
