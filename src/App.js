import {Component} from 'react'
import Popup from 'reactjs-popup'
import {RiCloseLine} from 'react-icons/ri'
import './App.css'
import {CustomPara} from './styledComponents'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

class App extends Component {
  state = {
    score: 0,
    chosenList: choicesList[0],
    opponentList: choicesList[0],
    text: '',
    isPlaying: true,
  }

  onClickChange = event => {
    const id = event.target.value
    const chosenList = choicesList.find(item => item.id === id)
    console.log(chosenList)
    const randId = Math.floor(Math.random() * choicesList.length)
    const opponentList = choicesList[randId]
    if (id === opponentList.id) {
      this.setState({
        chosenList,
        opponentList,
        text: 'IT IS DRAW',
        isPlaying: false,
      })
    } else if (
      (id === 'ROCK' && opponentList.id === 'SCISSORS') ||
      (id === 'SCISSORS' && opponentList.id === 'PAPER') ||
      (id === 'PAPER' && opponentList.id === 'ROCK')
    ) {
      this.setState(prevState => ({
        score: prevState.score + 1,
        chosenList,
        opponentList,
        text: 'YOU WON',
        isPlaying: !prevState.isPlaying,
      }))
    } else {
      this.setState(prevState => ({
        score: prevState.score - 1,
        chosenList,
        opponentList,
        text: 'YOU LOSE',
        isPlaying: !prevState.isPlaying,
      }))
    }
  }

  onClickPlayAgain = () => {
    this.setState(prevState => ({isPlaying: !prevState.isPlaying}))
  }

  render() {
    const {score, text, isPlaying, opponentList, chosenList} = this.state
    const icon = <RiCloseLine />

    return (
      <div>
        <div>
          <h1>
            ROCK
            <br />
            PAPER
            <br />
            SCISSORS
          </h1>
          <div>
            <p>Score</p>
            <CustomPara>{score}</CustomPara>
          </div>
        </div>
        {isPlaying && (
          <div>
            <ul>
              <li>
                <button
                  type="button"
                  data-testid="rockButton"
                  value={choicesList[0].id}
                  onClick={this.onClickChange}
                >
                  <img src={choicesList[0].imageUrl} alt={choicesList[0].id} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-testid="scissorsButton"
                  value={choicesList[1].id}
                  onClick={this.onClickChange}
                >
                  <img src={choicesList[1].imageUrl} alt={choicesList[1].id} />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  data-testid="paperButton"
                  value={choicesList[2].id}
                  onClick={this.onClickChange}
                >
                  <img src={choicesList[2].imageUrl} alt={choicesList[2].id} />
                </button>
              </li>
            </ul>
          </div>
        )}
        {!isPlaying && (
          <div>
            <ul>
              <li>
                <h1>You</h1>
                <img src={chosenList.imageUrl} alt="your choice" />
              </li>
              <li>
                <h1>Opponent</h1>
                <img src={opponentList.imageUrl} alt="opponent choice" />
              </li>
            </ul>
            <div>
              <p>{text}</p>
              <button type="button" onClick={this.onClickPlayAgain}>
                PLAY AGAIN
              </button>
            </div>
          </div>
        )}
        <div>
          <Popup modal trigger={<button type="button">RULES</button>}>
            {close => (
              <>
                <button type="button" onClick={() => close()}>
                  {icon}
                </button>
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                    alt="rules"
                  />
                </div>
              </>
            )}
          </Popup>
        </div>
      </div>
    )
  }
}

export default App
