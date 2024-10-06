import React from 'react';
import { CCard, CCardBody, CCardTitle, CCardText, CCardImage, CButton, CContainer, CRow, CCol } from '@coreui/react';
import ReactImg from '../assets/test.jpg'; // Example image import
import NeverImg from '../assets/never.jpeg'; // Import the images
import RiddlesImg from '../assets/riddles.jpg';
import WhosImg from '../assets/whose.jpeg';
import './Games.css';
import { useNavigate } from 'react-router-dom';

const gameData = [
  {
    id: 1,
    title: "Never Have I Ever",
    img: NeverImg, // Use the imported image
    description: "Never Have I Ever is a game that is played by two or more players. The game is played by asking each player to say 'never have I ever' followed by a statement that is either true or false. If a player has never done something, they must take a drink. The game continues until everyone has had a chance to say 'never have I ever' and take a drink.",
    link: "/games/never"
  },
  {
    id: 2,
    title: "Riddles",
    img: RiddlesImg, // Use the imported image
    description: "Riddles are a type of puzzle that involves a question and an answer. The answer is usually a word or phrase that is related to the question. Riddles are often used as a form of entertainment, and they can be found in many different cultures around the world.",
    link: "/games/riddles"
  },
  {
    id: 3,
    title: "Who's Most Likely To",
    img: WhosImg, // Use the imported image
    description: "Who's Most Likely To is a game that is played by two or more players. The game is played by asking each player to say 'who's most likely to' followed by a statement that is either true or false. If a player has never done something, they must take a drink. The game continues until everyone has had a chance to say 'who's most likely to' and take a drink.",
    link: "/games/whos"
  }
];


const Games = () => {
  const navigate = useNavigate();

  const handlePlayGame = (link) => {
    navigate(link);
  };

  return (
    <div className="games-container">
      <CContainer>
        <CRow className="games-row">
          {gameData.map((game) => (
            <CCol key={game.id} className="game-card">
              <CCard className="card">
                <CCardImage orientation="top" src={game.img} />
                <CCardBody className="card-body">
                  <CCardTitle className="card-title">{game.title}</CCardTitle>
                  {/* <CCardText className="card-text">
                    {game.description}
                  </CCardText> */}
                  <CButton color="primary" onClick={() => handlePlayGame(game.link)}>
                    Play
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      </CContainer>
    </div>
  );
};
export default Games;