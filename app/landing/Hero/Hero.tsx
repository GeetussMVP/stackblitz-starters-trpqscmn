import styled from "styled-components";

const HeroWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 1.5rem 5rem;
  position: relative;
`;

const Spacer = styled.div`
  @media(min-width: 768px) {
    margin-top: 1rem;
    }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-width: 100%;
  display: flex;
  object-fit: cover;
  @media(min-width: 768px) {
   width: 50%;
   object-fit: contain;

   }
`;

const TextSection = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 6vw, 4.5rem);
  font-weight: 300;
  color: white;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: clamp(1.75rem, 4vw, 2.25rem);
  font-weight: 300;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 1rem;
`;

const Arrow = styled.span`
  display: block;
  margin-top: 1.5rem;
  font-size: 2.5rem;
  color: white;
  animation: bounce 1.5s infinite;

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(10px); }
  }
`;

export default function Hero({ imageHeight = 450 }) {
  return (
    <HeroWrapper>
      <Spacer />

      <HeroImage
        src="/images/landing/hero2.png"
        alt="Hero"
      />

      <TextSection>
        <Title>Pirmoji Kokybė</Title>
        <Subtitle>jūsų namuose</Subtitle>
        <Arrow>↓</Arrow>
      </TextSection>
    </HeroWrapper>
  );
}
