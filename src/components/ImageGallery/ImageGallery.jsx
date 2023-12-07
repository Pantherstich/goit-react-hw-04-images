import React, { Component } from 'react';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImagesList } from 'components/ImageGallery/ImageGallery.styled';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';

export class ImageGallery extends Component {
  render() {
    const {
      images,
      handleLoadClick,
      loadMore,
      modalData,
      setModalData,
      closeModal,
      showModal,
    } = this.props;

    return (
      <>
        <ImagesList>
          {images?.map(image => (
            <ImageGalleryItem
              key={image.id}
              item={image}
              tags={image.tags}
              onImageClick={() => setModalData(image.largeImageURL, image.tags)}
            />
          ))}
        </ImagesList>
        {loadMore && <Button onClick={handleLoadClick}></Button>}
        {showModal && (
          <Modal modalData={modalData} closeModal={closeModal}></Modal>
        )}
      </>
    );
  }
}
