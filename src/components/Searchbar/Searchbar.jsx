import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, HeaderElem, Input, Span } from './Searchbar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!query.trim()) return alert('Please enter a valid query');
    onSubmit(query.trim());
    setQuery('');
  };

  const handleChange = e => {
    setQuery(e.target.value);
  };

  return (
    <HeaderElem className="searchbar">
      <Form className="form" onSubmit={handleSubmit}>
        <Button type="submit" className="button">
          <Span className="button-label">Search</Span>
        </Button>

        <Input
          className="input"
          name="query"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
    </HeaderElem>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
