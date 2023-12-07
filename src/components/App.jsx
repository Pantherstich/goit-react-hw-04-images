import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Wrapper, Error } from './App.styled';
import SearchService from '../services/apiPixaby';
import { Loader } from './Loader/Loader';

export const App = () => {
  const [nameSearch, setNameSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [modalData, setModalData] = useState({ img: '', tags: '' });
  const [error, setError] = useState(null);

  const handleSubmit = nameSearch => {
    setNameSearch(nameSearch);
    setPage(1);
  };

  const handleLoadClick = prevState => {
    setPage(page + 1);
  };
  // };

  const setSetModalData = (img, tags) => {
    setShowModal(true);
    setModalData({ img, tags });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (nameSearch) {
      setIsLoader(true);
      setLoadMore(false);
      setError(null);

      const searchService = new SearchService(nameSearch, page);
      searchService
        .fetchImg(page)
        .then(images => {
          if (images.hits.length > 0) {
            setImages(prevState =>
              page === 1 ? images.hits : [...prevState, ...images.hits]
            );
            setLoadMore(page < Math.ceil(images.totalHits / 12));
          } else {
            setImages([]);
            setError('Oops... there are no images matching your search...');
          }
        })
        .catch(error => {
          setImages([]);
          setError(error);
        })
        .finally(setIsLoader(false));
    }
  }, [nameSearch, page]);

  // componentDidUpdate(_, prevState) {
  //   const PrevState = prevState.nameSearch;
  //   const NextState = this.state.nameSearch;
  //   const { page } = this.state;

  //   if (PrevState !== NextState || page !== prevState.page) {
  //     this.setState({ isLoader: true, loadMore: false, error: null });

  //     const searchService = new SearchService(NextState, page);
  //     searchService
  //       .fetchImg(page)
  //       .then(images => {
  //         if (images.hits.length > 0) {
  //           this.setState(prevState => ({
  //             images:
  //               page === 1
  //                 ? images.hits
  //                 : [...prevState.images, ...images.hits],
  //             loadMore: page < Math.ceil(images.totalHits / 12),
  //           }));
  //         } else {
  //           this.setState({
  //             images: [],
  //             error: 'Oops... there are no images matching your search...',
  //           });
  //         }
  //       })
  //       .catch(error => {
  //         this.setState({ images: [], error });
  //       })
  //       .finally(this.setState({ isLoader: false }));
  //   }
  // }
  // const handleSubmit = nameSearch => {
  //   setNameSearch(nameSearch);
  //   setPage(1);
  // };

  // comst handleLoadClick = prevState => {
  //   setPage( page + 1 );
  // };

  // setModalData = (img, tags) => {
  //   this.setState({ showModal: true, modalData: { img, tags } });
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false });
  // };
  // const { error, isLoader, loadMore, showModal, images, modalData } =
  //   this.state;
  return (
    <Wrapper>
      <Searchbar onSubmit={handleSubmit}></Searchbar>
      {isLoader && <Loader />}
      {error && <Error>{error}</Error>}
      {!isLoader && (
        <ImageGallery
          loadMore={loadMore}
          showModal={showModal}
          images={images}
          handleLoadClick={handleLoadClick}
          closeModal={closeModal}
          setModalData={setSetModalData}
          modalData={modalData}
        ></ImageGallery>
      )}
    </Wrapper>
  );
};
