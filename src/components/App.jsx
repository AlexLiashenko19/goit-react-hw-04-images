import React, { Component } from 'react';
import { Gallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from '../helpers/helpers';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { DivElem } from './App.sryled';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoadMore: false,
    totalHits: null,
    isError: '',
    modalImg: null,
    isModalShow: false,
    isLoading: false,
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (query !== prevState.query || page !== prevState.page) {
      this.setState({ isLoading: true });
      try {
        const { totalHits, hits } = await getImages(query, page);
        this.setState(prevState => ({
          totalHits,
          isLoadMore: totalHits > 0 && page < Math.ceil(totalHits / 12),
          images: [...prevState.images, ...hits],
        }));
      } catch (error) {
        this.setState({ isError: error });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleSearch = query => {
    this.setState({ query, page: 1, images: [], isError: '' });
  };

  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleModOpen = modalImg => {
    this.setState({ isModalShow: true, modalImg });
  };

  handleModClose = () => {
    this.setState({ isModalShow: false });
  };

  render() {
    const { images, isLoadMore, isError, modalImg, isModalShow, isLoading } =
      this.state;
    return (
      <DivElem>
        <SearchBar onSubmit={this.handleSearch} />
        {isLoading && <Loader />}
        <Gallery images={images} modalOpen={this.handleModOpen} />
        {isLoadMore && <Button onClick={this.onLoadMore} />}
        {isError && <p>{isError}</p>}
        {isModalShow && (
          <Modal onClose={this.handleModClose} image={modalImg} />
        )}
        {/* <Audio /> */}
      </DivElem>
    );
  }
}
