import { useState } from "react";
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
	
	const getPokemonName = (pokemon) => {
		return <h3>{pokemon}</h3>
	}
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
                            <img src={data.sprites["front_default"]} />
                            <div className="info">
                                {getPokemonName(pokemon)}
                                <div className="pokemon-types">
                                    {pokemonType}
                                </div>
                            </div>
                            <span>{data.id}</span>
                        </div>
                    );
                })}
            </main>
        </>
    );
}

export default Home;
