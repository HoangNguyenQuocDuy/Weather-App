import classNames from "classnames/bind";
import styles from "./cityTime.module.scss";

const cx = classNames.bind(styles);
const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const monthInYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Body({ data, dayTime }) {
  const dateInMonth = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear()
  console.log(month);
  const forecastDate = weekDays
    .slice(dateInMonth % 7, weekDays.length)
    .concat(weekDays.slice(0, dateInMonth % 7));
  return (
    <div className={cx("wrapper")}>
      <h1 className={cx("city")}>
        {data ? `${data.city}, ${data.countryCode}` : "New York, US"}
      </h1>
      <p
        className={cx("date")}
      >{`${forecastDate[0]} ${dateInMonth}/${month + 1}/${year}`} </p>
    </div>
  );
}

export default Body;
