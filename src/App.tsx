import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootStore } from "./Store";
import { GetPokemon } from "./actions/PokemonActions";

function App() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");
  const pokemonState = useSelector((state: RootStore) => state.pokemon);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
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
        <div>
          {pokemonState.pokemon && (
            <>
              <img src={pokemonState.pokemon.sprites.front_default} alt="" />

              <p style={{ color: "#61dafb" }}> Abilities</p>
              <ul>
                {pokemonState.pokemon.abilities.map((ability) => {
                  return (
                    <li style={{ fontSize: "18px" }} key={ability.ability.name}>
                      {ability.ability.name}
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
