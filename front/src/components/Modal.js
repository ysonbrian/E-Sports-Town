import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
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
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
`;

const ModalInfoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
`;
const ModalInfo = styled.span`
  font-weight: 600;
`;

const ModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #fe7e6d;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  letter-spacing: 2px;
  :hover {
    opacity: 0.7;
  }
`;

const ModalComponent = ({ bidMessage, onClickModal }) => {
  const [open, setOpen] = useState(true);

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
  const onCloseButton = () => {
    onClickModal(true);
    setOpen(false);
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
            <ModalHeader>오류</ModalHeader>
          </ModalHeaderContainer>
          <ModalImageContainer>
            {bidMessage === 'NoMoney' ? (
              <ModalImage src="https://cdn3.iconfinder.com/data/icons/unigrid-phantom-finance-vol-4/60/014_190_bitcoin_money_electro_finance_cashout_cash_wallet-512.png" />
            ) : (
              <ModalImage src="https://cdn2.iconfinder.com/data/icons/business-and-seo-8/48/21-Money_Growth_up-512.png" />
            )}
          </ModalImageContainer>
          <ModalInfoContainer>
            <ModalInfo>
              {bidMessage === 'NoMoney'
                ? '가지고 계신 토큰이 부족합니다!'
                : '최고가 보다 높은 금액을 제시하세요!'}
            </ModalInfo>
          </ModalInfoContainer>
          <ModalButtonContainer>
            <ModalButton onClick={onCloseButton}>확인</ModalButton>
          </ModalButtonContainer>
        </ModalAllContainer>
      </Modal>
    </div>
  );
};

export default ModalComponent;
