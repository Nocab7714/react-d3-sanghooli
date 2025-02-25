//// 數字加入千分比符號
// 方法一：使用正規表達式
export function formatNumber(number){
  let parts = number.toString().split('.');  // 分割整數和小數部分
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 格式化整數部分
  return parts.length > 1 ? parts.join('.') : parts[0];  // 拼接小數部分
}