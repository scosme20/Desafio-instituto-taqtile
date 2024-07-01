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
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "Arial", sans-serif;
  animation: ${fadeIn} 0.3s ease-in-out;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #e9ecef;
    border-left: 5px solid #4caf50;
    transition:
      background-color 0.3s ease,
      border-left 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 10px;
    flex-direction: column;
    align-items: flex-start;
  }

  strong {
    font-weight: bold;
    min-width: 80px;
    margin-right: 10px;
  }

  .userInfo {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .userName {
    flex: 1;
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
  margin-right: 10px;

  &:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  &:last-child {
    margin-right: 0;
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
