import { useState, useEffect, useRef, forwardRef } from "react";
import axios from "axios";
import classNames from "classnames/bind";

import useDeBounce from "../../hooks/useDeBounce";
import styles from "./input.module.scss";
import "../../assets/icons/vuesax-icon-main/style.css";
import { GEO_API_URL, geoApiOptions } from "../../utils/api";
import useStore from "../../hooks/useStore";
import { actions } from "../../store";
import { city } from "../../store/reducer";

const cx = classNames.bind(styles);

const Input = forwardRef(({ onClickSearch }, ref) =>  {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const [searchValue, dispatch] = useStore();
  const { value, label } = searchValue;

  const handleChangeLocation = (e) => {
    setSearch(e.target.value);
  };

  const debounced = useDeBounce(search, 200);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${search}`,
      headers: {
        "X-RapidAPI-Key": "cb79ccb535msh15d03b9a786348dp1601bejsnf7d333289616",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    axios
      .request(options)
      .then((res) => {
        setSearchResult(res.data.data);
        return res.data.data.map((city) => {
          setLoading(true);
          dispatch(
            actions.searchList({
              value: {
                lat: `${city.latitude}`,
                lon: `${city.longitude}`,
              },
              label: {
                city: city.city,
                countryCode: city.countryCode,
              },
            })
          );
        });
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  }, [debounced]);
  const setCity = (idx) => {
    const cityNew = searchResult[idx];
    dispatch(
      actions.searchList({
        value: {
          lat: `${cityNew.latitude}`,
          lon: `${cityNew.longitude}`,
        },
        label: {
          city: cityNew.city,
          countryCode: cityNew.countryCode,
        },
      })
    );
    setLoading(false)
  };
  const handleClickMenuItem = (e) => {
    searchResult.forEach((item, idx) => {
      if(e.target.innerHTML === item.city) {
        setCity(idx)
      }
    })
    setTimeout(() => {
      console.log("city: ", city);
    }, 300);
    onClickSearch();
    setSearch("");
  };

  const handleClickSearchBtn = () => {
    const searchValue = search.trim()
    if (searchValue !== "") {
      searchResult.forEach((item, idx) => {
        if (searchValue.toUpperCase() === item.city.toUpperCase()) {
          setCity(idx)
        }
      })
      onClickSearch();
    }
    ref.current.focus()
    setSearch('')
  };

  const handleSearchByEnter = e => {
    if (e.keyCode === 13) {
      onClickSearch()
      setSearch('')
    }
  }

  return (
    <div className={cx("wrapper")}>
      <input
        ref={ref}
        onKeyDown={handleSearchByEnter}
        onChange={handleChangeLocation}
        value={search}
        className={cx("input")}
        placeholder={"Enter city..."}
      />
      {search && <button onClick={() => {setSearch('')}} className={cx('remove-btn')}><i class="isax-close-circle1"></i></button>}
      <button onClick={handleClickSearchBtn} className={cx("search-btn")}>
        <i class="isax-search-status1"></i>
      </button>
      {/* {search && loading && <span className={cx('load-icon')}><i class="fa-solid fa-spinner"></i></span>} */}
      {search && (
        <ul className={cx("menu")}>
          {searchResult.map((item) => {
            return (
              <li
                onClick={handleClickMenuItem}
                key={item.id}
                className={cx("item")}
              >
                {item.city}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
})

export default Input;
