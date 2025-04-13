const convertDate = (_date: string) => {
  const date = new Date(_date);
  const now = new Date();

  const hour = date.getHours();
  let hour_str;
  if (hour < 10) {
    hour_str = "0" + hour;
  } else {
    hour_str = "" + hour;
  }

  const minute = date.getMinutes();
  let minute_str;
  if (minute < 10) {
    minute_str = "0" + minute;
  } else {
    minute_str = "" + minute;
  }

  const dayDiffrance = now.getDay() - date.getDay();
  if (dayDiffrance === 0) {
    return "امروز، " + hour_str + ":" + minute_str;
  } else if (dayDiffrance === 1) {
    return "دیروز، " + hour_str + ":" + minute_str;
  } else {
    return (
      date.toLocaleDateString("fa-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) +
      "، " +
      hour_str +
      ":" +
      minute_str
    );
  }
};
const useConvertDate = () => {
  return convertDate;
};

export { useConvertDate };
