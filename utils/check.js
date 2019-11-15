// 驗證所有欄位必填
function checkRequired(data) {
  let values = Object.values(data);
  let valuesLength = values.length;
  let valuesFilterLength = values.filter(el => el.length > 0).length;
  return valuesLength === valuesFilterLength;
}

function checkImageUrl(url) {
  return /^http:\/\/|https:\/\//.test(url);
}

module.exports = {
  checkRequired,
  checkImageUrl
};
