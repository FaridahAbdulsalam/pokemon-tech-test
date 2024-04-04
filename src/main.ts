import "./styles/style.scss";
import { pokemonArray } from './data/pokemon';
import { Pokemon } from "./data/types";


const cardContainer = document.querySelector<HTMLElement>(".card-container");
const pokemonFilter = document.querySelector<HTMLInputElement>("#pokemon__filter");
const filterButton = document.querySelector<HTMLButtonElement>(".pokemon__filter-button");

if(!cardContainer || !pokemonFilter ||!filterButton){
    throw new Error ("Issue with selector")
}

const handleRenderCards = (pokemonArray: Pokemon[]) => {
    
    const pokemons = Object.values(pokemonArray);
    cardContainer.innerHTML ="";
    pokemons.forEach((pokemon: Pokemon) => {
        cardContainer.innerHTML += `
        <div class="card">
        <img class="card__image" src=${pokemon.sprite}>
        <div class="card__content">
        <h3 class="card__heading" style="text-transform: capitalize">${pokemon.name}</h3> 
        <p class="card__text">${pokemon.name} (#${pokemon.id}) is a ${pokemon.types[0]} & ${pokemon.types[1]} type pokemon.</p>
        </div>
        </div`;
    })
}

const handleFilter = () => {
    const searchTerm = pokemonFilter.value.toLowerCase();
    const filteredPokemons = pokemonArray.filter((pokemon) =>{
        if(pokemon.name.toLowerCase().includes(searchTerm) || String(pokemon.id).includes(searchTerm)){
            return true
        }else {
            return false
        }
    })
    handleRenderCards(filteredPokemons);
}

cardContainer.addEventListener("load", handleRenderCards(pokemonArray));
filterButton.addEventListener("click", handleFilter);