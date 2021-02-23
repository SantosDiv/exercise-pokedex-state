import React from 'react';
import Pokemon from './Pokemon';

class Pokedex extends React.Component {
    constructor(props) {
        super(props)
        this.nextPokemonFunc = this.nextPokemonFunc.bind(this);
        this.filter = this.filter.bind(this);
        this.state = {
            nextPokemon: 0,
            arrayFiltred: [],
            lengthArray: 0,
        }
    }

    nextPokemonFunc() {
        const { pokemons } = this.props;
        const { arrayFiltred } = this.state;
        const { lengthArray } = this.state;

        if (arrayFiltred.length > 0) {
            const arrayFiltredSize = arrayFiltred.length - 1;
            this.setState((oldState, _props) => ({
              nextPokemon: oldState.lengthArray > 0 ? arrayFiltred[lengthArray] : arrayFiltred[0],
              lengthArray: oldState.lengthArray > 0 ? oldState.lengthArray - 1 : arrayFiltredSize,
            }));
        } else {
            const arraySize = pokemons.length - 1;
            this.setState((oldState, _props) => ({
            nextPokemon:
                oldState.nextPokemon >= arraySize ? 0 : oldState.nextPokemon + 1,
            }));
        }
    }

    filter(event) {
        const { pokemons } = this.props;
        const pokemonsFiltred = pokemons.filter(
          ({ type }) => type === event.target.value
        );
        const indexPokemons = pokemonsFiltred.reduce((previousValue, currenteValue) => {
            previousValue.push(pokemons.indexOf(currenteValue));
            return previousValue;
        }, []);
        this.setState({
            nextPokemon: indexPokemons[0],
            arrayFiltred: indexPokemons,
            lengthArray: indexPokemons.length - 1,
        })
    }

    render() {
        const { pokemons } = this.props;
        const { nextPokemon } = this.state;
        return (
            <div className="pokedex">
               <Pokemon key={pokemons[nextPokemon].id} pokemon={pokemons[nextPokemon]} />
               <button onClick = { this.nextPokemonFunc }>Próximo</button>
               <button onClick = { this.filter } value='Fire'>Fire</button>
               <button onClick = { this.filter } value='Psychic'>Psychic</button>
               <button onClick = { this.filter }>All</button>
            </div>
        );
    }
}

export default Pokedex;