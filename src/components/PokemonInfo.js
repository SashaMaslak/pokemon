import { Component } from 'react';
import PokemonErrorView from './PokemonErrorView';
import PokemonPendingView from './PokemonPendingView';
import PokemonDataView from './PokemonDataView';
import pokemonAPI from '../services/pokemon-api';

export default class PokemonInfo extends Component {
  state = {
    status: 'idle',
    pokemon: null,
    error: null,
  };
  componentDidUpdate(prevProps) {
    const prevName = prevProps.pokemonName;
    const nextName = this.props.pokemonName;
    if (prevName !== nextName) {
      this.setState({ status: 'pending' });
      pokemonAPI
        .fetchPokemon(nextName)
        .then(pokemon => this.setState({ pokemon, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));
      //  .finally(() => this.setState({ loading: false }));
    }
  }
  render() {
    const { status, pokemon, error } = this.state;
    const { pokemonName } = this.props;
    if (status === 'idle') {
      return <div>Ведіть імя покемона</div>;
    }
    if (status === 'pending') {
      return <PokemonPendingView pokemonName={pokemonName} />;
    }
    if (status === 'rejected') {
      return <PokemonErrorView message={error.message} />;
    }
    if (status === 'resolved') {
      return <PokemonDataView pokemon={pokemon} />;
    }
    //  return (
    //    <div>
    //      {error && <h1>{error.message}</h1>}
    //      {loading && <div>Загружаємо...</div>}
    //      {!pokemonName && <div>Ведіть імя покемона</div>}
    //      {pokemon && (
    //        <div>
    //          <p>{pokemon.name}</p>
    //          <img
    //            src={pokemon.sprites.other['official-artwork'].front_default}
    //            alt={pokemon.name}
    //            width="300"
    //          />
    //        </div>
    //      )}
    //    </div>
    //  );
  }
}
