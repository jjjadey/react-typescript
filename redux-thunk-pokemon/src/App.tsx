import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootStore } from "./Store";
import { GetPokemon } from "./actions/PokemonActions";
import _ from "lodash";

function App() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");
  const pokemonState = useSelector((state: RootStore) => state.pokemon);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = _.lowerCase(event.target.value);
    if (searchValue !== "") {
      setPokemonName(searchValue);
    }
  };

  const handleSubmit = () => {
    dispatch(GetPokemon(pokemonName));
  };

  console.log(pokemonState);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
        {pokemonState.loading ? (
          <div className="lds-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        ) : (
          <div>
            {pokemonState.pokemon && (
              <>
                <img src={pokemonState.pokemon.sprites.front_default} alt="" />

                <p style={{ color: "#61dafb" }}> Abilities</p>
                <ul>
                  {pokemonState.pokemon.abilities.map((ability) => {
                    return (
                      <li
                        style={{ fontSize: "18px" }}
                        key={ability.ability.name}
                      >
                        {ability.ability.name}
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
