import { useState } from 'react';
import HeaderSearchCancel from '../../assets/icons/HeaderSearchCancel';
import HeaderSearchIcon from '../../assets/icons/HeaderSearchIcon';
import DropdownList from '../DropdownList/DropdownList';
import styles from './HeaderSearch.module.css';

interface IHeaderSearch {
  isSearchVisible: boolean;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSearch = ({ isSearchVisible, setIsSearchVisible }: IHeaderSearch) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const clearInput = () => {
    setInputValue('');
  };
  return (
    <div className={`${styles.headerSearch} ${isSearchVisible ? styles.flex : ''}`}>
      <form
        onSubmit={(e) => e.preventDefault()}
        role="search"
        className={`${styles.container} ${isFocus ? styles.containerFocus : ''}`}
      >
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
          aria-label="Поиск"
        />
        {inputValue && (
          <button
            type="button"
            onClick={clearInput}
            className={`${styles.btnCancel} button`}
            aria-label="Очистить поиск"
          >
            <HeaderSearchCancel />
          </button>
        )}
      </form>
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
