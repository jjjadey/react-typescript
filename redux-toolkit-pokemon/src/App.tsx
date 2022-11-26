import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import "./App.css";
import { RootStore } from "./Store";
import { getPokemon } from "./features/pokemonSlice";
import {
  POKEMON_FAIL,
  POKEMON_IDEL,
  POKEMON_LOADING,
} from "./features/PokemonTypes";

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
    dispatch(getPokemon(pokemonName));
  };

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
        {pokemonState.status !== POKEMON_IDEL && (
          <>
            {pokemonState.status === POKEMON_LOADING ? (
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
              <>
                {pokemonState.status === POKEMON_FAIL ? (
                  <p>{`Error ${pokemonState.error?.response?.status}: ${pokemonState.error?.response?.data}`}</p>
                ) : (
                  <div>
                    {pokemonState.data && (
                      <>
                        <img
                          src={pokemonState.data.sprites.front_default}
                          alt=""
                        />
                        <p style={{ color: "#61dafb" }}> Abilities</p>
                        <ul>
                          {pokemonState.data.abilities.map((ability) => {
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
              </>
            )}
          </>
        )}
      </header>
    </div>
  );
}

export default App;
