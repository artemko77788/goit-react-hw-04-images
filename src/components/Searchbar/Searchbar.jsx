import s from './Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Searchbar({ hendlerForm }) {
  const [seachImgs, setSeachImgs] = useState('');

  const handleInputChange = e => {
    setSeachImgs(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (seachImgs.trim() === '') {
      toast.error('Imput something');

      return;
    }

    hendlerForm(seachImgs);
    setSeachImgs('');
  };

  return (
    <header className={s.Search}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchFormButton}>
          <span>
            <FaSearch />
          </span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={seachImgs}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
}

export default Searchbar;
