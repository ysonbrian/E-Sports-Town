import React, { useEffect, useState } from "react";
import CardMyPage from "../components/CardMyPage";
import styled from "styled-components";
import { useStore, useMypage, useMyToken, useWeb3 } from "../utils/store";

const PageTitle = styled.h1`
  padding-top: 25px;
  margin-top: 1rem;
  color: white;
`;

//background-image: url(${mainImage});
const Profile_container = styled.div`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  
  background-size: cover;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputImage = styled.input`
  display: none;
`;

const ListContainer = styled.div`
  padding: 3rem;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
`;

const ListItem = styled.div`
  margin: 1rem;
  background-color: #5800ff;
  border: none;
  border-radius: 1rem;
  width: 300px;
  height: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
`;

const ImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePreview = styled.div`
  margin: 2rem;
  border: solid 2px gainsboro;
  width: 150px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 5rem;
  font-size: 1.5rem;
  img {
    width: 150px;
    height: 150px;
    padding: 1px 3px 3px 1px;
    border-radius: 5rem;
  }
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
  i {
    font-size: 5rem;
  }
`;

const PublicKey = styled.div``;

const CollectionNumber = styled.div``;

const NoData = styled.div`
  display: flex;
  justify-content: center;

  width: 80%;
  height: 500px;
  padding: 20px;
  margin: 20px;
  border: solid 1px;
  border-radius: 10px;
`;

const Coin = styled.div`
  margin: 10px;
`;

const UserName = styled.div``

function Mypage() {
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const myPage = useMypage((state) => state.mypage);
  const myToken = useMyToken((state) => state.myToken);
  const [files, setFiles] = useState("");
  const [imgSrc, setImgSrc] = useState("");
  // const [web3, setWeb3] = useWeb3((state) => [state.web3, state.setWeb3]);
  const { fetchMyPage } = useMypage();
  useEffect(() => {
    console.log(user);
    fetchMyPage(user);
  }, []);

  const onHandleChange = (event) => {
    event.preventDefault();
    setFiles(event.target.files[0]);
    let fileReader = new FileReader();
    let file = event.target.files[0];
    fileReader.readAsDataURL(file);
    // fileReader.readAsText(e.target.files[0], 'UTF');
    fileReader.onload = (e) => {
      setImgSrc(e.target.result);
    };
  };

  // console.log(web3.eth.getBalance());
  console.log(myPage);
  return (
    <>
      <Profile_container>
        <PageTitle>Mypage</PageTitle>
        <InputImage
          id="upload"
          type="file"
          name="upload"
          onChange={onHandleChange}
        />
        <Profile>
          <label htmlFor="upload">
            <ImgContainer>
              <ProfilePreview src={imgSrc} />
              <i className="far fa-user"></i>
              {user?.username ? user.username : "unnamed"}
            </ImgContainer>
          </label>

          <PublicKey>{user?.userAddress}</PublicKey>
          <Coin>Coin : {myToken[0].token ? myToken[0].token : null}</Coin>
          <CollectionNumber>Number of NFT : {myPage.length}</CollectionNumber>
        </Profile>
        <PageTitle>NFT List</PageTitle>
        {myPage.length !== 0 ? (
          <ListContainer>
            {myPage?.map((el) => {
              return (
                <ListItem key={el?._id}>
                  <CardMyPage
                    id={el?.id}
                    imgURI={el?.imgURI}
                    user={el?.userAddress}
                    description={el?.description}
                    price={el?.price}
                    created_at={el?.created_at}
                  />
                </ListItem>
              );
            })}
          </ListContainer>
        ) : (
          <NoData>
            <h1>NFT 상품이 없습니다</h1>
          </NoData>
        )}
      </Profile_container>
    </>
  );
}

export default Mypage;
