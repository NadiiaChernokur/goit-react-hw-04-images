import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Container } from './App.styled';
import { Hearts } from 'react-loader-spinner';
import { getImages } from './ToGetPhotos';

const STATUS = {
  IDEL: 'idel',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVD: 'resolved',
};
const { IDEL, PENDING, REJECTED } = STATUS;

export const App = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [image, setImage] = useState([]);
  const [status, setStatus] = useState(IDEL);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (status === IDEL) {
      return;
    }
    // if (status === RESOLVD) {
    //   return;
    // }
    // if (search === '') {
    //   return;
    // }
    // setStatus(PENDING);

    async function toGetPhotos() {
      try {
        const response = await getImages(search.slice(14), page);
        const responseHits = response.hits;

        // const numberOfPhotos = response.totalHits - image.length;
        const numberOfPhotos = page < Math.ceil(response.totalHits / 12);
        setTotal(numberOfPhotos);

        setImage(prevState => [...prevState, ...responseHits]);
        // setStatus(RESOLVD);
        setStatus(IDEL);
      } catch (error) {
        setStatus(REJECTED);
      }
    }

    toGetPhotos();
  }, [page, search, status]);

  const onSubmitSearchbar = event => {
    event.preventDefault();
    const value = event.target[1].value.trim();
    if (value === '') {
      toast('<= Напиши тут щось)) Давай шукати котиків!!!');
      return;
    }

    setSearch(prev => {
      if (prev !== `${Date.now()}/${value}`) {
        setStatus(PENDING);
        setImage([]);
        setPage(1);
        setTotal(0);
        return `${Date.now()}/${value}`;
      }
    });
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
    // setStatus(IDEL);
    setStatus(PENDING);
  };

  const onChange = () => {
    setImage([]);
    setPage(1);
    setTotal(0);
    setStatus(IDEL);
    setSearch('');
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmitSearchbar} onChange={onChange} />
      <ImageGallery images={image} />
      {status === PENDING && (
        <Hearts
          height="80"
          width="80"
          color="#ea1699"
          ariaLabel="hearts-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {/* {total > 12 && <Button loadMore={onLoadMore} />} */}

      {total > 0 && <Button loadMore={onLoadMore} />}
      {status === REJECTED && (
        <div>Something went wrong... Please try again</div>
      )}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2500,
          style: { background: '#ffff00', color: '#0000ff' },
        }}
      />
    </Container>
  );
};
