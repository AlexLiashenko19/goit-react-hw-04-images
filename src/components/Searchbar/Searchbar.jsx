import { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, HeaderElem, Input, Span } from './Searchbar.styled';

export class SearchBar extends Component {
  state = {
    query: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(e.target.query.value);
    this.setState({ query: '' });
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  render() {
    const { query } = this.state;
    return (
      <HeaderElem className="searchbar">
        <Form className="form" onSubmit={this.handleSubmit}>
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
            onChange={this.handleChange}
          />
        </Form>
      </HeaderElem>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
