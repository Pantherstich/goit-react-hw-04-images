import React, { useState } from 'react';

import {
  SearchForm,
  SearchBar,
  SearchFormButton,
  SearchFormInput,
} from 'components/Searchbar/Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [nameSearch, setNameSearch] = useState('');

  const handleChange = e => {
    setNameSearch(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (nameSearch.trim() === '') {
      return;
    }
    onSubmit(nameSearch);
    reset();
  };

  const reset = () => setNameSearch('');

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">🔍</SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images"
          value={nameSearch}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
};
