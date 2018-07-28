//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import StarCard from "./components/StarCard";
import constellation from "./star.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    constellation,
    clickedConstellation: [],
    score: 0
  };

//when you click on a card ... the constellition is taken out of the array
  imageClick = event => {
    const currentConstellation = event.target.alt;
    const ConstellationAlreadyClicked =
      this.state.clickedConstellation.indexOf(currentConstellation) > -1;

//if you click on a constellation that has already been selected, the game is reset and cards reordered
    if (ConstellationAlreadyClicked) {
      this.setState({
        constellation: this.state.constellation.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedConstellation: [],
        score: 0
      });
        alert("You lose.");

//if you click on an available constellation, your score is increased and cards reordered
    } else {
      this.setState(
        {
          constellation: this.state.constellation.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedConstellation: this.state.clickedConstellation.concat(
            currentConstellation
          ),
          score: this.state.score + 1
        },
//if you get all constellations corrent you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("You Win!");
            this.setState({
              constellation: this.state.constellation.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedConstellation: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, starcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.constellation.map(constellation => (
            <StarCard
              imageClick={this.imageClick}
              id={constellation.id}
              key={constellation.id}
              image={constellation.image}
            />
          ))}
        </div>
      </div>
    );
  }
}
export default App;