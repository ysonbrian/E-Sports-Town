import React, { useEffect } from 'react';
import { dummydata } from '../utils/dummyData';
import CardTemplate from '../components/CardTemplate';
import styled from 'styled-components';
import { useGallery } from '../utils/store';
import { getGalleryList } from '../utils/data';
const PageTitle = styled.h1`
  margin-top: 1rem;
  color: darksalmon;
`;

const ListContainer = styled.div`
  padding: 3rem;
  overflow: scroll;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
`;

const ListItem = styled.div`
  margin: 1rem;
  padding: 1rem;
`;

function Gallery() {
  const gallery = useGallery((state) => state.gallery);
  const { fetchData } = useGallery();

  useEffect(() => {
    fetchData('http://localhost:1234/gallery');
  }, []);

  return (
    <>
      <PageTitle>Gallery</PageTitle>
      <ListContainer>
        {gallery &&
          gallery?.map((el) => {
            return (
              <ListItem key={el?._id}>
                <CardTemplate
                  id={el?._id}
                  imgURI={el?.imgURI}
                  user={el?.userAddress}
                  name={el?.name}
                  description={el?.description}
                  price={el?.price}
                  created_at={el?.created_at}
                />
              </ListItem>
            );
          })}
      </ListContainer>
    </>
  );
}

export default Gallery;
