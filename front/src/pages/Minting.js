import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
import styled from 'styled-components';

const PageTitle = styled.h1`
  margin-top: 1rem;
  color: darksalmon;
`;

const NftEnrollContainer = styled.div`
  border: solid 4px brown;
  margin: 3rem 10rem 3rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NftUploader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

function Minting() {
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [selected, setSelected] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const ipfs = create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const imgURI = await ipfs.add(imageSrc);

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
      path: tokenUri.path,
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

  return (
    <>
      <PageTitle>상품등록</PageTitle>
      <NftEnrollContainer>
        <NftUploader>
          이미지 파일 위치
          <NftPreviewImg>
            {imageSrc && <img src={imageSrc} alt="preview-img" />}
          </NftPreviewImg>
          <input
            type="file"
            onChange={(e) => {
              encodeFileToBase64(e.target.files[0]);
            }}
          />
        </NftUploader>

        <form onSubmit={(e) => onSubmit(e)}>
          <label className="textInfo" htmlFor="inputName">
            이름
          </label>
          <input type="text" name="name" id="inputName" required />

          <label className="textInfo" htmlFor="inputDescription">
            정보
          </label>
          <input type="text" name="name" id="inputDescription" required />

          <label className="textInfo" htmlFor="inputPrice">
            가격
          </label>
          <input type="text" id="inputPrice" required />

          <label className="textInfo" htmlFor="optionNft">
            어느곳에 민팅 하시겠어요?
          </label>
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
          <input type="submit" />
        </form>
      </NftEnrollContainer>
    </>
  );
}

export default Minting;
