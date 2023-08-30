import React, { Component, useEffect, useState } from 'react';
import { Gallery } from './ImageGallery/ImageGallery';
import { SearchBar } from './Searchbar/Searchbar';
import { getImages } from '../helpers/helpers';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { DivElem } from './App.sryled';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImage] = useState([]);
  const [onLoadMore, setOnLoadMore] = useState(false);
  const [totalHits, setTotalHits] = useState(null);
  const [isError, setIsError] = useState('');
  const [modalImg, setModalImg] = useState(null);
  const [isModalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    (async () => {
      try {
        const { totalHits, hits } = await getImages(query, page);
        setImage(prevImg => [...prevImg, ...hits]);
        setOnLoadMore(totalHits > 0 && page < Math.ceil(totalHits / 12));
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImage([]);
    setIsError('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModOpen = modalImg => {
    setModalImg(modalImg);
    setModalShow(true);
  };

  const handleModClose = () => {
    setModalShow(false);
  };

  return (
    <DivElem>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      <Gallery images={images} modalOpen={handleModOpen} />
      {onLoadMore && <Button onClick={loadMore} />}
      {isError && <p>{isError}</p>}
      {isModalShow && <Modal onClose={handleModClose} image={modalImg} />}
    </DivElem>
  );
};
