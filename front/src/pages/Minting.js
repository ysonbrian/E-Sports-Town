import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
import styled from 'styled-components';
import { ImImage } from "react-icons/im";

const Title = styled.h1`
  margin-top: 1rem;
  color: darksalmon;
`;

const NftEnrollContainer = styled.div`
  display: flex;
  border: none;
  border-radius: 50px;
  margin: auto;
  flex-direction: column;
  align-items: center;
  width: 400px;
  background-color: none;
`;

const NftUploader = styled.div`
  display: flex;
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
  border-radius: 10px;
  width: 300px;
  height: 300px;
  img {
    margin-left: -2px;
    margin-top: -2px;
    border-radius: 10px;
    width: 300px;
    height: 300px;
  }
`;

const PreviewImageCloseButton = styled.button`
  color: #gray;
  outline: none;
  border: none;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  font-size: 20px;
  :hover {
    color: rgb(127, 117, 117);
  }
`;

const InputInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
  letter-spacing: 2px;
  color: rgb(33, 29, 29);
`;

const InputInfo = styled.input`
  border: 2px solid darksalmon;
  width: 300px;
  height: 50px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  :hover {
    background-color: #CCD1E4;
  }
`;

const Icon = styled.div`
margin: 120px;
color: #2F3A8F;
`;

const MintingPositionContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MintingPositionOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
`;

const SubmitButton = styled.button` 
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #2F3A8F;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  margin-top: 10px;
  margin-left: 95px;
  :hover {
    opacity: 0.7;
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
    event.preventDefault();
    setFiles(event.target.files[0]);
    console.log(files);
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
    submitNFT(result);
    setSelected('');
    navigate('/');
    window.location.reload(false);
  };

  const onSelectChange = (e) => {
    console.log(e.target.value);
    setSelected(e.target.value);
  };

  const onClickXButton = () => {
    setImgSrc('');
  };

  return (
    <>
        <NftEnrollContainer>
        <form onSubmit={(e) => onSubmit(e)}>
        <Title>Create New Item</Title>
        <InputImage
          id="fileUpload"
          type="file"
          name="fileUpload"
          onChange={onHandleChange}
        />
        <label htmlFor="fileUpload">
        <NftUploader>
        <NftPreviewImg>
          {imgSrc && <img src={imgSrc} alt="preview-img" />}
        <PreviewImageCloseButton onClick={onClickXButton}>
          X
        </PreviewImageCloseButton>
        <Icon>
        <ImImage 
        size={50}/>
        </Icon>
        </NftPreviewImg>
        </NftUploader>
        </label>
          <InputInfoContainer>
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

          <MintingPositionContainer>
            <MintingPositionOptions>
              <label htmlFor="optionNft">어느 곳에 민팅 하시겠어요?</label>
            </MintingPositionOptions>

            <MintingPositionOptions>
              <select id="optionNft" onChange={onSelectChange}>
                {user?.master === 'true' ? (
                  <>
                    <option></option>
                    <option value="pro">프로</option>
                  </>
                ) : (
                  <>
                    <option></option>
                    <option value="normal">일반</option>
                    <option value="auction">쇼미더머니</option>
                  </>
                )}
              </select>
            </MintingPositionOptions>
            <SubmitButton>등록</SubmitButton>
            </MintingPositionContainer>
        </form>
      </NftEnrollContainer>
    </>
  );
}

export default Minting;
