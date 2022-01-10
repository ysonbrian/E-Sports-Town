import React, { useState } from 'react';
import './Minting.css';
import { useNavigate } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { useStore } from '../utils/store';
import { submitNFT } from '../utils/data';
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
    // navigate('/');
    window.location.reload(false);
  };

  const onSelectChange = (e) => {
    setSelected(e.target.value);
  };

  return (
    <main className="container">
      <h2>상품등록</h2>
      <input
        type="file"
        onChange={(e) => {
          encodeFileToBase64(e.target.files[0]);
        }}
      />
      <div className="preview">
        {imageSrc && <img src={imageSrc} alt="preview-img" />}
      </div>

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
              <option value="pro" defaultValue>
                프로
              </option>
            </>
          ) : (
            <>
              <option value="pro" defaultValue>
                일반
              </option>
              <option value="auction">쇼미더머니</option>
            </>
          )}
        </select>

        <input type="submit" />
      </form>
    </main>
  );
}

export default Minting;
