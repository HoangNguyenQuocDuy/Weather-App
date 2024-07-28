import classNames from "classnames/bind";

import styles from "./weather.module.scss";

const cx = classNames.bind(styles);
function Weather({ data }) {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("main")}>
        <p className={cx("temperate")}>
          {data && Math.round(data.main.temp / 10)}°C
        </p>
        <div className={cx("box-img")}>
          <img src={data && require(`../../assets/imgs/${data.weather[0].icon}.png`)} alt="weather" />
        </div>
      </div>
      <ul className={cx("sub")}>
        <li className={cx("item")}>
          <p className={cx("title")}>Feels like</p>
          <p className={cx('quantitation')}>{Math.round(data && data.main.feels_like / 10)}°C</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("title")}>Wind</p>
          <p className={cx('quantitation')}>{Math.round(data && data.wind.speed)} m/s</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("title")}>Pressure</p>
          <p className={cx('quantitation')}>{Math.round(data && data.main.pressure)} hPa</p>
        </li>
        <li className={cx("item")}>
          <p className={cx("title")}>Humidity</p>
          <p className={cx('quantitation')}>{Math.round(data && data.main.humidity)}%</p>
        </li>
      </ul>
    </div>
  );
}

export default Weather;
