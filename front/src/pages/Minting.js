import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
import styled from 'styled-components';
import mainImage from '../mainImage.jpg';

const Title = styled.h1`
  margin-top: 1rem;
  color: white;
`;

const NftContainer = styled.div`
  background-image: url(${mainImage});
  background-size: cover;
`;

const NftEnrollContainer = styled.div`
  display: flex;
  border: none;
  border-radius: 50px;
  margin: auto;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 100%;
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
  width: 300px;
  height: 300px;
  img {
    width: 295px;
    height: 295px;
  }
  :hover {
    background-color: #e0ffff;
  }
`;

const PreviewImageCloseButton = styled.button`
  color: gray;
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
  width: 300px;
  gap: 10px;
  letter-spacing: 2px;
  color: white;
`;

const InputInfo = styled.input`
  height: 50px;
  padding-left: 10px;
  border-radius: 10px;
  background-color: whitesmoke;
  :hover {
    background-color: #e0ffff;
  }
`;

const MintingPosition = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
`;

const MintingPositionOptions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px;
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
  width: 70px;
  height: 40px;
  border-radius: 8px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #5800ff;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 2px;
  :hover {
    background-color: #e900ff;
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

  const onSelectChange = (e) => {
    setSelected(e.target.value);
  };

  const onClickXButton = () => {
    setImgSrc('');
  };

  return (
    <NftContainer>
      <NftEnrollContainer>
        <Title>Create New Item</Title>

        <label htmlFor="upload">
          <NftUploader>
            <NftPreviewImg>
              {imgSrc && <img src={imgSrc} alt="preview-img" />}
              <PreviewImageCloseButton onClick={onClickXButton}>
                X
              </PreviewImageCloseButton>
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

          <MintingPosition>
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
            <ButtonContainer>
              <SubmitButton>제출</SubmitButton>
            </ButtonContainer>
          </MintingPosition>
        </form>
      </NftEnrollContainer>
    </NftContainer>
  );
}

export default Minting;
