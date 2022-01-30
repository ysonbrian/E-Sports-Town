import React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import user from '../usericon4owner.png'
import users from '../usersicon4owner.png'
import { useModalOwnerData } from '../utils/store';

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

const ModalComponent = ({ onOwnerModal }) => {
  const [open, setOpen] = useState(true);
  const [modalOwnerData, fetchOwnerData] = useModalOwnerData((state) => [
    state.modalOwnerData,
    state.fetchOwnerData,
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
  const onCloseButton = () => {
    onOwnerModal(true);
    setOpen(false);
  };

  console.log("modalOwner-modalOwnerData", modalOwnerData)
  console.log("modalOwner-modalOwnerData-userAddress", modalOwnerData[0].userAddress)
  console.log("modalOwner-modalOwnerData-multiAuctionAddressList", modalOwnerData[0].multiAuctionAddressList)
  console.log("modalOwner-modalOwnerData-multiAuctionAddressList-length", modalOwnerData[0].multiAuctionAddressList.length)

  const singleOwnerAddress = modalOwnerData[0].userAddress.slice(0, 6) + "..." + modalOwnerData[0].userAddress.slice(-5);

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
            <ModalHeader>소유자</ModalHeader>
          </ModalHeaderContainer>
          <ModalImageContainer>
            {modalOwnerData[0].multiAuctionAddressList.length === 0 ? (
              <ModalImage src={user} />
            ) : (
              <ModalImage src={users} />
            )}
          </ModalImageContainer>
          <ModalInfoContainer>
            <ModalInfo>
              {modalOwnerData[0].multiAuctionAddressList.length === 0 ? (
                <h3>{singleOwnerAddress}</h3>
              ) :
                modalOwnerData[0].multiAuctionAddressList.map((el) => {
                  const multiOwnerAddress = el?.multiAuctionAddress.slice(0, 6) + "..." + el?.multiAuctionAddress.slice(-5);
                  return (
                    <>
                      <h3>{multiOwnerAddress}</h3>
                    </>
                  )
                })
              }

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
