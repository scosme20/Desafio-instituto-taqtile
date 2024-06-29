import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const UserListContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #343a40;
  margin: 20px 0;
  font-family: "Arial", sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const StyledUserList = styled.div`
  margin-top: 20px;
  padding: 0;
  list-style-type: none;
`;

export const UserListItem = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Arial", sans-serif;
  animation: ${fadeIn} 0.3s ease-in-out;

  &:hover {
    background-color: #e9ecef;
    border-left: 5px solid #4caf50;
    transition:
      background-color 0.3s ease,
      border-left 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 10px;
  }

  strong {
    font-weight: bold;
    display: inline-block;
    min-width: 80px;
    margin-right: 10px;
  }

  .user-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

export const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props) => props.theme.buttonBackground || "#4caf50"};
  color: ${(props) => props.theme.buttonColor || "#ffffff"};
  height: 44px;
  padding: 0 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  display: inline-block;
  text-align: center;

  &:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px;
    height: 36px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 8px;
  font-family: "Arial", sans-serif;
`;

export const Input = styled.input`
  border: 1px solid #777777;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 12px;
  width: 100%;
  border-radius: 4px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px;
  }
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: normal;
  color: #777777;
  margin-bottom: 8px;
  display: block;
  font-family: "Arial", sans-serif;

  @media (max-width: 768px) {
    font-size: 12px;
    margin-bottom: 6px;
  }
`;
