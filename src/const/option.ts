import { Rank, UserType } from "types";

const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const weeks = [1, 2, 3, 4, 5];
const dates = [2, 3, 4, 5, 6, 7, "Chủ nhật"];
const ranks = [
  Rank.BinhNhi,
  Rank.BinhNhat,
  Rank.HaSi,
  Rank.TrungSi,
  Rank.ThuongSi,
  Rank.ThieuUyCN,
  Rank.TrungUyCN,
  Rank.ThuongUyCN,
  Rank.DaiUyCN,
  Rank.ThieuTaCN,
  Rank.TrungTaCN,
  Rank.ThuongTaCN,
  Rank.ThieuUy,
  Rank.TrungUy,
  Rank.ThuongUy,
  Rank.DaiUy,
  Rank.ThieuTa,
  Rank.TrungTa,
  Rank.ThuongTa,
  Rank.DaiTa,
  Rank.ThieuTuong,
  Rank.TrungTuong,
  Rank.ThuongTuong,
  Rank.DaiTuong,
];
const userTypes = [UserType.SQ, UserType.QNCN, UserType.CCQP, UserType.HQSCS];
export { months, weeks, dates, ranks, userTypes };
