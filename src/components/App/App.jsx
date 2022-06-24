import ImageGallery from '../ImageGallery/ImageGallery';
import Searchbar from 'components/Searchbar';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import Modal from 'components/Modal';
import s from './App.module.css';

import FetchImages from '../../service/api';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';

function App() {
  const [imagesArr, setImageArr] = useState([]);
  const [seach, setSeach] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (seach === '') {
      return;
    }
    async function getImg() {
      setStatus({ status: 'pending' });
      try {
        const data = await FetchImages(seach, page);
        setImageArr(prev => [...prev, data], setStatus('resolved'));
      } catch (err) {
        setError(err);
        setStatus('rejected');
      }
    }

    getImg();
  }, [page, seach]);

  const toggleModal = data => {
    if (data) {
      setModalData(data);
    }
    setShowModal(!showModal);
  };

  const hendlerFormSubmit = data => {
    setSeach(data);
    setImageArr([]);
    setPage(1);
  };

  const handleClickBtn = e => {
    setPage(p => p + 1);
  };

  return (
    <>
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={modalData[0]} alt={modalData[1]} />
        </Modal>
      )}
      <div className={s.app}>
        <ToastContainer autoClose={1500} />

        <Searchbar hendlerForm={hendlerFormSubmit} />

        {status === 'pending' && <Loader />}

        {status === 'rejected' && (
          <p className={s.error}>No such images: {error.message}</p>
        )}

        {(status === 'resolved' || imagesArr.length !== 0) && (
          <ImageGallery
            imagesArr={imagesArr}
            toggle={toggleModal}
            click={handleClickBtn}
          />
        )}
      </div>
    </>
  );
}

Modal.propType = {
  modalData: PropTypes.arrayOf(PropTypes.string.isRequired),
};

export default App;
