import { Player, DetailedPokemon } from './interfaces';
import { MongoClient } from "mongodb";
import 'dotenv/config';

const username = process.env.MONGO_USERNAME;
const pwd = process.env.MONGO_PWD;
const cluster = process.env.MONGO_CLUSTER;

if (!username || !pwd || !cluster) {
    console.log("Missing MongoDB connection data!");
    process.exit(1);
}

let localPlayers: Player[] = [];
let genOne: DetailedPokemon[] = [];
const uri = `mongodb+srv://${username}:${pwd}@${cluster}/?retryWrites=true&w=majority`;
let client = new MongoClient(uri);

export function getClient() {
    return client;
}

export function setClient(newClient: MongoClient) {
    client = newClient;
}

export function getPlayers(): Player[] {
    return localPlayers;
}

export function setPlayers(players: Player[]) {
    localPlayers = players;
}

export function getPokemon(): DetailedPokemon[] {
    return genOne;
}

export function setPokemon(pokemon: DetailedPokemon[]) {
    genOne = pokemon.sort((a, b) => a.id - b.id);
}