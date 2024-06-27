import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  border: 1px solid #777777;
  padding: 8px;
  margin-bottom: 12px;
`;

export const Label = styled.label`
  font-size: 12px;
  color: #777777;
  margin-bottom: 8px;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: red;
  margin-top: 8px;
`;

export const Button = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
`;
