import { useEffect, useState, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styled from "styled-components";
import "../index.css";
import { setMainTitle } from "../components/Title";
import { Link } from "react-router-dom";

AOS.init();

function Home() {
  useEffect(() => setMainTitle(), []);
  // 스크롤 생성, 버튼변화는 css적용해야
  const [ScrollY, setScrollY] = useState(0);
  const [BtnStatus, setBtnStatus] = useState(false);
  // 100 초과하면 버튼에 스크롤 따라오게
  const handleFollow = () => {
    setScrollY(window.pageYOffset);
    if (ScrollY > 100) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  };
  // 맨위 0으로 올라오게
  const handleTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollY(0);
    setBtnStatus(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleFollow);
    // const watch = () => {
    // };
    // watch();
    return () => {
      window.removeEventListener("scroll", handleFollow);
    };
  });

  // 로고 효과
  const useFadeIn = (duration = 1, delay = 0) => {
    const element = useRef();
    useEffect(() => {
      if (typeof duration !== "number" || typeof delay !== "number") {
        return;
      }
      if (element.current) {
        const { current } = element;
        current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
        current.style.opacity = 1;
      }
    }, [delay, duration]);
    return { ref: element, style: { opacity: 0 } };
  };
  const fadeInH1 = useFadeIn(3, 1);

  // 서비스 설명 박스로 할 경우
  let boxStyle = {
    width: "100%",
    fontSize: "20px",
    background: "gray",
    color: "white",
    textAlign: "center",
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  });

  return (
    <WRAP>
      {/* <h1 {...fadeInH1}>Re:tter</h1> */}
      <MainContainer
        data-aos="fade-right"
        data-aos-offset="600"
        data-aos-easing="ease-in-sine"
      >
        <LOGO />
        <MainContent>
          <TitlePhrase>
            소중한 사람들에게 <br />
            마음을 전해요!
          </TitlePhrase>
          <TitleDescription>
            Re:tter는 인공지능 TTS 서비스로 대신 읽어드리는 음성 메시지
            카드입니다. <br /> 목소리를 담은 나만의 특별한 메시지를 보내보세요!
          </TitleDescription>

          <Link to="/select">
            <SButton primary>카드 만들기</SButton>
          </Link>
        </MainContent>
      </MainContainer>

      <DescriptionContainer>
        <Intro>
          <IMG1 src="images/letter2.png"></IMG1>

          <TEXTDIV>
            <TitleText data-aos="fade-right">말로 하긴 부끄럽고</TitleText>
            <TitleText data-aos="fade-right">텍스트는 불안할 때</TitleText>

            <Paragraph align={"left"}>
              <p data-aos="fade-right">
                코로나 19로 사회적 거리두기가 강화되면서
                <br /> 마음의 거리두기도 진행되고 있는 지금…
              </p>
              <p data-aos="fade-right">
                글로만 전하기에는 딱딱하기만 한 마음을 <br /> 여러가지 목소리와
                함께 전해보세요.
              </p>

              <p data-aos="fade-right">
                편지의 감성과 최신 기술을 이용해 <br /> 나만의 카드를 만들어
                보세요!
              </p>
            </Paragraph>
          </TEXTDIV>
        </Intro>

        <Intro>
          <TEXTDIV2>
            <TextWrapper>
              <TitleText data-aos="fade-right">좋아하는 목소리를</TitleText>
              <TitleText data-aos="fade-right">고를 수 있어요</TitleText>
            </TextWrapper>

            <Paragraph align={"right"}>
              <p data-aos="fade-right">
                내 목소리 또는 다른 목소리와 함께 내 마음을 전해보세요.
              </p>
              <p data-aos="fade-right">
                글로만 전하는 편지보다 훨씬 특별한 편지가 될 거예요!
              </p>
            </Paragraph>
          </TEXTDIV2>

          <IMG2 src="images/people.png"></IMG2>
        </Intro>

        <Intro>
          <IMG3 src="images/phonesticker.png"></IMG3>
          <TitleText data-aos="fade-right">개성만점 스티커로</TitleText>
          <TitleText data-aos="fade-right">편.꾸하자!</TitleText>

          <Paragraph align={"left"}>
            <p data-aos="fade-right">다이어리처럼 편지도 꾸밀 수 있어요!</p>
            <p data-aos="fade-right">나만의 스타일로 편지를 꾸며보세요</p>
          </Paragraph>
        </Intro>

        <Link to="/select">
          <BUTTLOCA>
            <SButton primary>카드 만들기</SButton>
          </BUTTLOCA>
        </Link>

        <br></br>
        <TBUTTON
          background="black"
          size="small"
          className={BtnStatus ? "topBtn active" : "topBtn"}
          onClick={handleTop}
        >
          TOP
        </TBUTTON>

        <FOOT>
          <TeamName>사서함 202호</TeamName>
          <TeamMember>김은서 김혜인 노건우 서예진 성당현 윤지영</TeamMember>
          <FOOTDIV2>
            <p>Voices by 1.여성 아나운서 2.김혜인 + KSS Dataset</p>
            <p>Images by Freepik</p>
            <p>Re:tter는 영리적인 목적으로 서비스를 운영하지 않습니다.</p>
          </FOOTDIV2>
        </FOOT>
      </DescriptionContainer>
    </WRAP>
  );
}

export default Home;

const IMG3 = styled.img`
  float: right;
  // margin-right: 10%;
  width: 30%;

  @media screen and (max-width: 1000px) {
    width: 25%;
  }
`;
const TEXTDIV2 = styled.div`
  float: right;

  @media screen and (max-width: 1000px) {
    float: left;
  }
`;

const FOOTDIV2 = styled.div`
  // padding-left: 40%;
  border-top: 1px gray solid;
  padding-top: 3%;
  text-align: center;
  line-height: 2.1em;
`;
const TeamMember = styled.p`
  // padding-left: 40%;
  word-spacing: 1em;
  font-size: 0.9rem;
  text-align: center;
  line-height: 1.5em;
  padding-bottom: 3%;
`;
const TeamName = styled.p`
  font-family: "Gowun Batang";
  font-weight: bold;
  font-size: 1.2rem;
  text-align: center;
  padding: 1% 0 5% 0;

  @media screen and (max-width: 1000px) {
    // font-size: 1rem;
  }
`;

const IMG1 = styled.img`
  float: right;
  width: 25%;
  margin-top: 13%;
  margin-right: 10%;

  @media screen and (max-width: 1000px) {
    width: 22%;
  }
`;

const Paragraph = styled.div`
  line-height: 2.1em;
  margin-top: 4%;
  font-weight: bold;
  white-space: pre-line;
  text-align: ${(props) => props.align};

  @media screen and (max-width: 1000px) {
    text-align: left;
  }
`;

const FOOT = styled.footer`
  font-size: 0.8rem;
  background-color: dimgray;
  color: white;

  padding: 5% 5%;
  margin-top: 7%;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: lighter;
  line-height: 100%;

  @media screen and (max-width: 1000px) {
    font-size: 0.8rem;
  }
`;

const TBUTTON = styled.button`
  border-radius: 50%;
  background-color: white;
  width: 70px;
  height: 70px;
  border: 0;
  outline: 0;
  font-weight: bold;
  font-size: 15px;
  float: right;
  font-family: "Noto Sans KR", sans-serif;
  margin-right: 2%;

  @media screen and (max-width: 1000px) {
    //  margin-top: 20%;
  }
`;

const IMG2 = styled.img`
  width: 55%;
  padding-top: 10%;

  @media screen and (max-width: 1000px) {
    margin-left: 40%;
  }
`;

const BUTTLOCA = styled.div`
  text-align: center;
`;

const TEXTDIV = styled.div`
  margin-top: 15%;
`;

const WRAP = styled.main`
  font-family: "Gowun Batang", serif;
  max-width: 50%;

  @media screen and (max-width: 1000px) {
    max-width: 100%;
  }
`;

const SButton = styled.button`
  margin-top: 1.5em;
  padding: 1rem 8rem;
  // font-size: 40px;
  border-radius: 10px;
  background-color: #fb6b4c;
  border: 0;
  outline: 0;
  color: white;
  font-family: "Gowun Batang", serif;
  font-weight: bold;

  @media screen and (max-width: 1000px) {
    font-size: 1em;
    padding: 1rem 4rem;
  }
`;

const LOGO = styled.div`
  background: url("/images/background3.jpg") bottom no-repeat;
  background-size: cover;

  height: 40vh;
`;

const MainContainer = styled.div`
  height: 90vh;
  background-color: #edb949;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 45vh;
`;

const TitlePhrase = styled.h2`
  font-size: 1.5em;
  line-height: 1.6em;
  font-weight: bold;
  white-space: pre-line;
  text-align: center;

  @media screen and (max-width: 1000px) {
    color: #8b4513;
  }
`;

const TitleDescription = styled.h3`
  font-weight: bold;
  // font-size: 0.9em;
  text-align: center;
  line-height: 2.1em;
  white-space: pre-line;
  word-break: keep-all;
  padding: 0 10%;
`;

const DescriptionContainer = styled.section`
  margin-top: 1rem;
`;

const Intro = styled.article`
  padding: 10%;
`;

const TitleText = styled.h2`
  font-size: 1.4em;
  line-height: 1.8em;
  font-weight: bold;
`;

const TextWrapper = styled.div`
  text-align: right;

  @media screen and (max-width: 1000px) {
    text-align: left;
  }
`;
