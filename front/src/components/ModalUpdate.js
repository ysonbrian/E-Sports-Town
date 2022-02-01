import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
//import { submitSell } from '../utils/data';
import { submitUpdate } from '../utils/data';
import modify from '../images/modify.png';

import { useModalUpdateData } from '../utils/store';

const ModalAllContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ModalHeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
`;
const ModalHeader = styled.h1``;

const ModalImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 250px;
  background-image: url(${modify});
  background-size: cover;
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ModalInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;
const ModalChangeEth = styled.input``;
const ModalInfo = styled.span`
  font-weight: 600;
`;

const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalConfirmButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #3d13b1;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 2px;
  :hover {
    opacity: 0.7;
  }
`;

const ModalCancelButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #cc0707;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  letter-spacing: 2px;
  :hover {
    opacity: 0.7;
  }
`;

const ModalComponent = ({ onUpdateModal }) => {
  let navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [modalUpdateData, setModalUpdateData] = useModalUpdateData((state) => [
    state.modalUpdateData,
    state.setModalUpdateData,
  ]);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
    },
  };

  //const onSellButton = async () => {
  const onUpdateButton = async (bid) => {
    //await submitSell(modalSubmitData);
    const metadata = {
      userbidInfo: modalUpdateData,
      updatedbid: bid,
    };

    await submitUpdate(metadata);
    //onSellModal(true);
    console.log('after-submit-update');

    onUpdateModal(true);
    setOpen(false);
    //navigate('/');
    //window.location.reload(false);
    window.location.assign('http://localhost:3000');
  };

  const onCloseButton = () => {
    //onSellModal(true);
    onUpdateModal(true);
    setOpen(false);
  };
  const [bid, setBid] = useState();
  const onChangeBid = (e) => {
    setBid(e.target.value);
  };

  return (
    <div>
      <Modal
        isOpen={true}
        // onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalAllContainer>
          <ModalHeaderContainer>
            <ModalHeader>수정</ModalHeader>
          </ModalHeaderContainer>
          <ModalImageContainer></ModalImageContainer>
          <ModalInfoContainer>
            <ModalChangeEth
              type="text"
              placeholder="ETH"
              value={bid}
              onChange={(e) => onChangeBid(e)}
            ></ModalChangeEth>
            <ModalInfo>참가금액을 수정 하시겠습니까?</ModalInfo>
          </ModalInfoContainer>
          <ModalButtonContainer>
            <ModalConfirmButton onClick={() => onUpdateButton(bid)}>
              수정
            </ModalConfirmButton>
            <ModalCancelButton onClick={onCloseButton}>취소</ModalCancelButton>
          </ModalButtonContainer>
        </ModalAllContainer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
