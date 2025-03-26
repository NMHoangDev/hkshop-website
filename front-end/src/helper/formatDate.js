export default function formatDate(dateTimeString) {
  const dateTime = new Date(dateTimeString.replace(" ", "T") + "Z"); // Thay thế khoảng trắng bằng 'T' và thêm 'Z' để đảm bảo định dạng đúng

  // Lấy các phần của ngày giờ
  const day = String(dateTime.getUTCDate()).padStart(2, "0"); // Ngày
  const month = String(dateTime.getUTCMonth() + 1).padStart(2, "0"); // Tháng (cộng 1 vì tháng bắt đầu từ 0)
  const year = dateTime.getUTCFullYear(); // Năm
  const hours = String(dateTime.getUTCHours()).padStart(2, "0"); // Giờ
  const minutes = String(dateTime.getUTCMinutes()).padStart(2, "0"); // Phút

  // Định dạng theo kiểu ngày giờ Việt Nam
  const formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes}`;

  return formattedDateTime;
}
