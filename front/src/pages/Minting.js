import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
import styled from 'styled-components';
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
  display: right;
`;

const NftPreviewImg = styled.div`
  border: cadetblue dotted 2px;
  width: 300px;
  height: 300px;
  img {
    width: 295px;
    height: 295px;
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
  height: 50px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  :hover {
    background-color: #e0ffff;
  }
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
    const data = await submitNFT(result);
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
      <Title>Create New Item</Title>
      <NftEnrollContainer>
        <NftUploader>
          <NftPreviewImg>
            {imgSrc && <img src={imgSrc} alt="preview-img" />}
            <PreviewImageCloseButton onClick={onClickXButton}>
              X
            </PreviewImageCloseButton>
          </NftPreviewImg>
        </NftUploader>
        <InputImage type="file" onChange={onHandleChange} />
        <form onSubmit={(e) => onSubmit(e)}>
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

            <input type="submit" />
          </MintingPositionContainer>
        </form>
      </NftEnrollContainer>
    </>
  );
}

export default Minting;