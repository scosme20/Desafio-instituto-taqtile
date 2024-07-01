import React from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Button = styled.button`
  font-size: 16px;
  font-weight: bold;
  background-color: #dc3545;
  color: white;
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
    background-color: #bb2d3b;
    transition: background-color 0.3s ease;
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

interface LogoutModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>Deseja realmente sair?</p>
        <Button onClick={onConfirm}>Sim</Button>
        <Button onClick={onCancel}>Não</Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default LogoutModal;
