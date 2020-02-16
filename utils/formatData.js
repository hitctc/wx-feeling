const formatData = () => {
  let time, YYYYMMDDnorm, YYYYMMDD;
  let now = new Date();
  console.log(now)
  let year = now.getFullYear();       //年
  let month = now.getMonth() + 1;     //月
  let day = now.getDate();            //日
  let hh = now.getHours();            //时
  let mm = now.getMinutes();          //分
  let ss = now.getSeconds();           //秒
  time = year + "-";
  YYYYMMDDnorm = year + "-";
  if (month < 10) {
    time += "0";
    time += month + "-";
    YYYYMMDDnorm += "0";
    YYYYMMDDnorm += month + "-";
  } else {
    time += month + "-";
    YYYYMMDDnorm += month + "-";
  }
  if (day < 10) {
    time += "0";
    time += day + " ";
    YYYYMMDDnorm += "0";
    YYYYMMDDnorm += day;
  } else {
    time += day + " ";
    YYYYMMDDnorm += day;
  }
  if (hh < 10) {
    time += "0";
    time += hh + ":";
  } else {
    time += hh + ":";
  }
  if (mm < 10) {
    time += '0';
    time += mm + ":";
  } else {
    time += mm + ":";
  }
  if (ss < 10) {
    time += '0';
    time += ss;
  } else {
    time += ss;
  }
  YYYYMMDD = YYYYMMDDnorm.split('-').join('')
  console.log(time)
  console.log(YYYYMMDD)
  return { time, YYYYMMDDnorm, YYYYMMDD}
}

export {
  formatData
}
