import classNames from "classnames/bind";

import styles from "./foreCast.module.scss";

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

function ForeCast({ data }) {
  const dateInMonth = new Date().getDate();
  const foreCastDate = weekDays
    .slice(dateInMonth % 7, weekDays.length)
    .concat(weekDays.slice(0, dateInMonth % 7));
    const hourDays =data.list[0].dt_txt
  console.log(hourDays.split(" ")[1].slice(0, 5));
  return (
    <ul className={cx("menu")}>
      {data.list.slice(0, 5).map((item, idx) => {
        return (
          <li key={idx} className={cx("item")}>
            <p className={cx("hour")}>{item.dt_txt.split(" ")[1].slice(0, 5)}</p>
            <img
              src={require(`../../assets/imgs/${item.weather[0].icon}.png`)}
              alt="weather"
            />
            <p className={cx('temperature')}>{Math.floor(item.main.temp / 10)}°C</p>
            <p className={cx("description")}>{item.weather[0].description}</p>
          </li>
        );
      })}
    </ul>
  );
}

export default ForeCast;
