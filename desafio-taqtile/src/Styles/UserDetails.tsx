import styled from "styled-components";

const respondTo = (breakpoint: string) => `
  @media (max-width: ${breakpoint}) {
  }
`;

export const Container = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;

  ${respondTo("600px")} {
    padding: 10px;
  }
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #343a40;
  margin: 20px 0;
  text-align: center;

  ${respondTo("600px")} {
    font-size: 24px;
    margin: 10px 0;
  }
`;

export const DetailItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:last-child {
    border-bottom: none;
  }

  ${respondTo("600px")} {
    padding: 10px;
    font-size: 14px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const LoadingMessage = styled.p`
  text-align: center;
`;

export const BackButton = styled.button`
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
  display: block;
  text-align: center;
  width: 100%;

  &:hover {
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  ${respondTo("600px")} {
    font-size: 14px;
    height: 40px;
    padding: 0 10px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 20px;
  text-align: center;

  p {
    margin-bottom: 10px;
  }
`;

export const Button = styled(BackButton)`
  background-color: #007bff;
  margin-top: 10px;
`;
