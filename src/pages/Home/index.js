import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";

import "./styles.css";

function Home() {
    const [pokemon, setPokemon] = useState("pikachu");
    const [pokemonData, setPokemonData] = useState([]);
    const [pokemonType, setPokemonType] = useState([]);

    const handleChange = (e) => {
        setPokemon(e.target.value.toLowerCase());
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        getPokemon();
    };
    
    const getPokemon = async () => {
        const toArray = [];
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
			const res = await axios.get(url);
            toArray.push(res.data);
            setPokemonType(res.data.types.map(x => <span>{x.type.name}</span>));
            setPokemonData(toArray);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        onChange={handleChange}
                        className="search-input"
                        placeholder="Digite o nome do pokemon?"
                        type="text"
                    />
                </label>
            </form>
            <main className="container">
                {pokemonData.map((data) => {
                    return (
                        <div className="pokemon-card">
                            <div className="screen-container">
                                <span className="pokedex-number">{data.id}</span>
                                <img src={data.sprites["front_default"]} />
                                <div className="pokemon-types">
                                    {pokemonType}
                                </div>
                            </div>
                            <div className="info">
                                <div className="info-screen">
                                    <div>
                                        <p>HP: <span>{data.stats[0].base_stat}</span></p>
                                    </div>
                                    <div>
                                        <p>Attack: <span>{data.stats[1].base_stat}</span></p>
                                    </div>
                                    <div>
                                        <p>Defense: <span>{data.stats[2].base_stat}</span></p>
                                    </div>
                                    <div>
                                        <p>Speed: <span>{data.stats[5].base_stat}</span></p>
                                    </div>
                                    <div>
                                        <p>Height: <span>{data.height}</span></p>
                                    </div>
                                    <div>
                                        <p>Weight: <span>{data.weight}</span></p>
                                    </div>
                                </div>
                                <div className="buttons">
                                    <div id="left-button"></div>
                                    <div id="right-button"></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </main>
        </>
    );
}

export default Home;
