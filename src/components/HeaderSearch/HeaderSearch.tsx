import { useState } from "react";
import HeaderSearchCancel from "../../img/HeaderSearchCancel";
import styles from "./HeaderSearch.module.css";
import HeaderSearchIcon from "../../img/HeaderSearchIcon";
import DropdownList from "../DropdownList/DropdownList";

interface IHeaderSearch {
  isSearchVisible: boolean;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSearch = ({ isSearchVisible, setIsSearchVisible }: IHeaderSearch) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocus, setIsFocus] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue("");
  };
  return (
    <div
      className={`${styles.headerSearch} ${isSearchVisible ? styles.flex : ""}`}
    >
      <div className={`${styles.container} ${isFocus ? styles.containerFocus : ''}`}>
        <div className={styles.icon}>
          <HeaderSearchIcon />
        </div>
        <input
          value={inputValue}
          onChange={handleChange}
          className={styles.input}
          type="text"
          placeholder="поиск"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
        {inputValue && (
          <button onClick={clearInput} className={styles.btnCancel}>
            <HeaderSearchCancel />
          </button>
        )}
      </div>
      {inputValue && (
        <DropdownList
          inputValue={inputValue}
          setInputValue={setInputValue}
          setIsSearchVisible={setIsSearchVisible}
        />
      )}
    </div>
  );
};

export default HeaderSearch;
