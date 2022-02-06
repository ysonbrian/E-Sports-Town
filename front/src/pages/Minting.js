import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
import styled from 'styled-components';
import back3 from '../images/back3.png';

const NftContainer = styled.div`
  /* padding: 0 100px 100px 100px; */
  background-image: url(${back3});
  background-size: 100% 100%;
  /* background-repeat: no-repeat; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin: 1.5rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NftEnrollContainer = styled.div`
  display: flex;
  border: solid 1px gray;
  border-radius: 50px;
  margin: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  height: 40%;
  background-color: rgba(255, 255, 255, 0.2);
  /* padding-bottom: 1rem; */
  padding: 1rem;
  position: relative;
`;

const NftUploader = styled.div`
  display: flex;
  border-radius: 40px;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  background-color: whitesmoke;
  position: relative;
`;

const InputImage = styled.input`
  display: none;
`;

const NftPreviewImg = styled.div`
  border: cadetblue dotted 2px;
  border-radius: 40px;
  width: 500px;
  height: 500px;
  img {
    width: 100%;
    height: 100%;
    padding: 1px 3px 3px 1px;
    border-radius: 40px;
  }
  :hover {
    background-color: #eef2ff;
  }
`;

const PreviewImageCloseButton = styled.button`
  color: #1b1a1a;
  outline: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  font-size: 20px;
  :hover {
    color: rgb(127, 117, 117);
    span {
      opacity: 0.7;
    }
  }
`;

const InputInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  width: 300px;
  gap: 10px;
  letter-spacing: 2px;
  color: white;
`;

const InputTitle = styled.h1`
  color: white;
  align-items: center;
`;

const InputInfo = styled.input`
  height: 50px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  :hover {
    background-color: #eef2ff;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100px;
  margin-top: 20px;
  gap: 20px;
`;

const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 80px;
  border-radius: 8px;
  text-align: center;
  color: white;
  border: none;
  background-color: red;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-top: 50px;
  letter-spacing: 2px;
  :hover {
    background-color: white;
    color: black;
  }
`;

function Minting() {
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [selected, setSelected] = useState('');
  const [files, setFiles] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  const onHandleChange = (event) => {
    console.log('AHA');
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

  const onSubmit = async (e) => {
    e.preventDefault();
    const imgURI = await ipfs.add(files);
    const metadata = {
      name: e.target[0].value,
      description: e.target[1].value,
      imgURI: `https://ipfs.io/ipfs/${imgURI.path}`,
    };
    const tokenUri = await ipfs.add(JSON.stringify(metadata));
    const result = {
      userAddress: user.userAddress,
      type: selected,
      name: metadata.name,
      description: metadata.description,
      price: e.target[2].value,
      metadata: tokenUri.path,
      imgURI: metadata.imgURI,
    };
    const data = await submitNFT(result);
    setSelected('');
    navigate('/');
    window.location.reload(false);
    // window.location.assign('http://localhost:3000');
  };

  const onClickXButton = () => {
    setImgSrc('');
  };

  return (
    <NftContainer>
      <Title>Create New Item</Title>
      <NftEnrollContainer>
        <label htmlFor="upload">
          <NftUploader>
            <NftPreviewImg>
              {imgSrc && <img src={imgSrc} alt="preview-img" />}
              {imgSrc && (
                <PreviewImageCloseButton onClick={onClickXButton}>
                  <span>X</span>
                </PreviewImageCloseButton>
              )}
            </NftPreviewImg>
          </NftUploader>
        </label>

        <InputImage
          id="upload"
          type="file"
          name="upload"
          onChange={onHandleChange}
        />

        <form onSubmit={(e) => onSubmit(e)}>
          <InputInfoContainer>
            <InputTitle>정보를 입력하세요</InputTitle>
            <label htmlFor="inputName">이름</label>
            <InputInfo type="text" id="inputName" required />
          </InputInfoContainer>

          <InputInfoContainer>
            <label htmlFor="inputDescription">정보</label>
            <InputInfo type="text" id="inputDescription" required />
          </InputInfoContainer>

          <InputInfoContainer>
            <label htmlFor="inputPrice">가격</label>
            <InputInfo type="text" id="inputPrice" required />
          </InputInfoContainer>

          <ButtonContainer>
            <SubmitButton>제출</SubmitButton>
          </ButtonContainer>
        </form>
      </NftEnrollContainer>
    </NftContainer>
  );
}

export default Minting;
