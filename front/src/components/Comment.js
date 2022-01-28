import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi';
import axios from 'axios';
import { submitComment } from '../utils/data';
import { useStore, useComments } from '../utils/store';
// import { useData } from '../../utils/store';
// import { useLoading } from '../../utils/store';

const CreateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 55px;
  width: 100%;
`;
const CreateTitleInput = styled.input`
  width: 100%;
  height: 100px;
  font-size: 40px;
  border: none;
  outline: none;
  padding: 10px;
`;

const CreateTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 15px;
  font-size: 20px;
  border: none;
  outline: none;
`;
const CreateButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 50px;
`;

const CreateBackButton = styled.button`
  background: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  outline: none;
  padding: 0px 1.25rem;
  text-align: center;
  width: 100px;
  height: 30px;
  margin-left: 10px;
  :hover {
    background-color: #f4f4f4;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    text-decoration: none;
    color: black;
  }
`;

const CreateSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 30px;
  border-radius: 4px;
  text-align: center;
  color: #f4f4f4;
  border: none;
  background-color: #ff1e56;
  font-weight: bold;
  cursor: pointer;
  padding: 0px 1.25rem;
  margin-right: 10px;
  :hover {
    opacity: 0.7;
  }
`;

const Comment = ({ id, onClickComments }) => {
  let navigate = useNavigate();
  const [user, setUser] = useStore((state) => [state.user, state.setUser]);
  const [comments, setComments] = useState('');

  // const [isLoading, setIsLoading] = useLoading((state) => [
  //   state.isLoading,
  //   state.setIsLoading,
  // ]);

  const onSubmitWriting = async (e) => {
    // setIsLoading(true);
    e.preventDefault();
    const data = {
      id: id,
      userAddress: user.userAddress,
      comment: e.target[0].value,
    };
    const auctionData = {
      id: id,
      userAddress: user.userAddress,
    };
    setComments('');
    onClickComments(auctionData);
    const result = await submitComment(data);
    window.location.assign('http://localhost:3000/gallery');

    // writingContent(data);
    // navigate('/');
    // window.location.reload(false);
  };
  const onChangeText = (e) => {
    setComments(e.target.value);
  };

  return (
    <CreateContainer>
      <form onSubmit={(e) => onSubmitWriting(e)}>
        {/* <CreateTitleInput type="text" placeholder="제목" /> */}
        {/*<br />*/}

        {/*<br />*/}

        <CreateButtonContainer>
          {/* <CreateBackButton>
            <Link to="/">
              <BiArrowBack />
              <p>나가기</p>
            </Link>
          </CreateBackButton> */}
          <CreateTextArea
            placeholder="대화를 시작하세요!"
            rows="10"
            cols="100"
            onChange={(e) => onChangeText(e)}
            value={comments}
          />
          <CreateSubmitButton>글작성</CreateSubmitButton>
        </CreateButtonContainer>
      </form>
    </CreateContainer>
  );
};

export default Comment;
