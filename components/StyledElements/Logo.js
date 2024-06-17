import Link from "next/link";
import styled from "styled-components";

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LogoTextMain = styled.img`
  width: 110px;
  margin-right: -15px;
`;

const LogoTextSub = styled.img`
  width: 130px;
  padding-top: 5px;
  margin-left: -28px;
`;

const LogoAsset = styled.img`
  height: 90px;
  margin-bottom: -30px;
  padding: 0px;
`;

export function Logo() {
  return (
    <LogoContainer>
      <LogoTextMain src="/icons/crop-it.png" alt="App Logo Crop it" />
      <Link href="/">
        <LogoAsset src="/icons/logo_chiliy-only.png" alt="App Logo Crop it" />
      </Link>
      <LogoTextSub src="/icons/like-its-hot.png" alt="App Logo Crop it" />
    </LogoContainer>
  );
}
