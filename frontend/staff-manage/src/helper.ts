export function getFormatDateAndTime(date: Date) {
  var ms = date.getMonth() + 1 + "";
  if (date.getMonth() + 1 < 10) ms = "0" + ms;

  var ds = date.getDate() + "";
  if (date.getDate() < 10) ds = "0" + ds;

  var hs = date.getHours() + "";
  if (date.getHours() < 10) hs = "0" + hs;

  var minutes = date.getMinutes() + "";
  if (date.getMinutes() < 10) minutes = "0" + minutes;

  var secs = date.getSeconds() + "";
  if (date.getSeconds() < 10) secs = "0" + secs;
  var str =
    date.getFullYear() +
    "-" +
    ms +
    "-" +
    ds +
    " " +
    hs +
    ":" +
    minutes +
    ":" +
    secs;

  return str;
}

export const getFormattedDate = (date: Date) => {
  var ms = date.getMonth() + 1 + "";
  if (date.getMonth() + 1 < 10) ms = "0" + ms;

  var ds = date.getDate() + "";
  if (date.getDate() < 10) ds = "0" + ds;
  return date.getFullYear() + "-" + ms + "-" + ds;
};
