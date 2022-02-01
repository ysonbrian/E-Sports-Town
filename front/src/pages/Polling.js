import React, { useEffect } from 'react';
import CardVote from '../components/CardVote';
import styled from 'styled-components';
import { usePolling } from '../utils/store';
import { getCurrentUser } from '../utils/auth';
import back4 from '../images/back4.jpeg';

const PollingContainer = styled.div`
  height: 100%;
  background-image: url(${back4});
  background-size: 100% 100%;
`;

const PageTitle = styled.h1`
  padding-top: 25px;
  color: white;
  display: flex;
  justify-content: center;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
`;

const ListItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem;
  padding: 1rem;
`;

function Polling() {
  const votes = usePolling((state) => state.votes);
  const { fetchVotes } = usePolling();
  useEffect(() => {
    const fetchAll = async () => {
      const user = await getCurrentUser();
      if (user) {
        await fetchVotes(user?.userAddress);
      }
    };
    fetchAll();
  }, []);
  return (
    <PollingContainer>
      <PageTitle>Polling</PageTitle>
      <ListContainer>
        {votes &&
          votes?.map((el) => {
            return (
              <ListItem key={el?._id}>
                <CardVote
                  id={el?._id}
                  tokenId={el?.tokenId}
                  imgURI={el?.imgURI}
                  tokenURI={el?.tokenURI}
                  user={el?.userAddress}
                  name={el?.name}
                  description={el?.description}
                  multiAuctionAddressList={el?.multiAuctionAddressList}
                  price={el?.price}
                  created_at={el?.created_at}
                />
              </ListItem>
            );
          })}
      </ListContainer>
    </PollingContainer>
  );
}

export default Polling;
