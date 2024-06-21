import styled from "styled-components";
import Login from "./Login";
import { signOut } from "next-auth/react";
import { Logo } from "./StyledElements/Logo";

const HeaderContainer = styled.header`
  position: relative;
  height: 60px;
  background-color: var(--primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
`;

export default function Header({ onOpenModal, onCloseModal }) {
  function handleOpenModal() {
    onOpenModal({
      modalInfoText: "Do you really want to logout?",
      confirmButtonLabel: "Logout",
      onClick: () => {
        signOut({ callbackUrl: "/" });
        onCloseModal();
      },
    });
  }

  return (
    <HeaderContainer>
      <Logo />
      <Login onOpenModal={handleOpenModal} />
    </HeaderContainer>
  );
}
