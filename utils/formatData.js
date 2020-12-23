const formatData = () => {
  let time, YYYYMMDDnorm, YYYYMMDD, YYYY, MM, MMChinese, DD, HHMMSS;
  let now = new Date();
  let year = now.getFullYear();       //年
  let month = now.getMonth() + 1;     //月
  let day = now.getDate();            //日
  let hh = now.getHours();            //时
  let mm = now.getMinutes();          //分
  let ss = now.getSeconds();           //秒

  time = year + "-";
  YYYYMMDDnorm = year + "-";
  HHMMSS = "";
  MMChinese = ""
  YYYY = year;
  if (month < 10) {
    time += "0";
    time += month + "-";
    YYYYMMDDnorm += "0";
    YYYYMMDDnorm += month + "-";
    MM = "0" + month;
  } else {
    time += month + "-";
    YYYYMMDDnorm += month + "-";
    MM = month.toString();
  }
  if (day < 10) {
    time += "0";
    time += day + " ";
    YYYYMMDDnorm += "0";
    YYYYMMDDnorm += day;
    DD = "0" + day;
  } else {
    time += day + " ";
    YYYYMMDDnorm += day;
    DD = day;
  }
  if (hh < 10) {
    time += "0";
    time += hh + ":";
    HHMMSS += "0";
    HHMMSS += hh + ":";
  } else {
    time += hh + ":";
    HHMMSS += hh + ":";
  }
  if (mm < 10) {
    time += '0';
    time += mm + ":";
    HHMMSS += "0";
    HHMMSS += mm + ":";
  } else {
    time += mm + ":";
    HHMMSS += mm + ":";
  }
  if (ss < 10) {
    time += '0';
    time += ss;
    HHMMSS += "0";
    HHMMSS += ss;
  } else {
    time += ss;
    HHMMSS += ss;
  }
  console.log('🚀 ~ file: formatData.js ~ line 66 ~ MM', MM)
  switch (MM) {
    case "01":
      MMChinese = "一月"
      break
    case "02":
      MMChinese = "二月"
      break
    case "03":
      MMChinese = "三月"
      break
    case "04":
      MMChinese = "四月"
      break
    case "05":
      MMChinese = "五月"
      break
    case "06":
      MMChinese = "六月"
      break
    case "07":
      MMChinese = "七月"
      break
    case "08":
      MMChinese = "八月"
      break
    case "09":
      MMChinese = "九月"
      break
    case "10":
      MMChinese = "十月"
      break
    case "11":
      MMChinese = "十一"
      break
    case "12":
      MMChinese = "十二"
      break
    default:
      DDChinese = ""
  }

  YYYYMMDD = YYYYMMDDnorm.split('-').join('')
  console.log('🚀 ~ file: formatData.js ~ line 107 ~ YYYYMMDD', YYYYMMDD)
  return { time, YYYYMMDDnorm, YYYYMMDD, YYYY, MM, MMChinese, DD, HHMMSS }
}

const formatDataTime = (time) => {
  var timeF = (new Date(time.replace(/-/g, '/').valueOf()));
  let now = new Date(timeF);
  // console.log(new Date(strtime).getFullYear())
  // console.log(new Date(strtime).getMonth() + 1)
  // console.log(new Date(strtime).getDate())
  let year = now.getFullYear();       // 年
  let month = now.getMonth() + 1;     // 月
  let day = now.getDate();            // 日
  let hh = now.getHours();            // 时
  let mm = now.getMinutes();          // 分
  let ss = now.getSeconds();           // 秒

  if (month < 10) {
    month = "0" + month;
  } else {
    month = month;
  }
  if (day < 10) {
    day = "0" + day;
  } else {
    day = day;
  }
  if (hh < 10) {
    hh += "0";
  } else {
    hh = hh;
  }
  if (mm < 10) {
    mm += "0";
  } else {
    mm = mm;
  }
  if (ss < 10) {
    ss += "0";
  } else {
    ss = ss;
  }
  switch (month) {
    case "01":
      month = "一月"
      break
    case "02":
      month = "二月"
      break
    case "03":
      month = "三月"
      break
    case "04":
      month = "四月"
      break
    case "05":
      month = "五月"
      break
    case "06":
      month = "六月"
      break
    case "07":
      month = "七月"
      break
    case "08":
      month = "八月"
      break
    case "09":
      month = "九月"
      break
    case "10":
      month = "十月"
      break
    case "11":
      month = "十一"
      break
    case "12":
      month = "十二"
      break
    default:
      month = ""
  }

  return { year, month, day, hh, mm, ss}
}

export {
  formatData,
  formatDataTime
}
