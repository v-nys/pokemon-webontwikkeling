import { setPokemon, setPlayers, getPlayers, setClient, getClient } from "./data_access";
import request from 'supertest';
import { app } from './app';

beforeEach(() => {
    setPokemon([
        { id: 4, name: "charmander", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", maxHP: 39, types: ["fire"] },
        { id: 5, name: "charmeleon", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png", maxHP: 39, types: ["fire"] }
    ]);
    setPlayers([
        {
            name: "RED", id: 1, password: "maandag", team: [
                { id: 4, name: "charmander", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", currentHP: 30, maxHP: 39, types: ["fire"] },
                { id: 5, name: "charmeleon", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", currentHP: 30, maxHP: 39, types: ["fire"] }
            ]
        },
        {
            name: "BLUE", id: 2, password: "dinsdag", team: [
                { id: 4, name: "charmander", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", currentHP: 30, maxHP: 39, types: ["fire"] },
                { id: 5, name: "charmeleon", height: 6, weight: 85, image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png", currentHP: 30, maxHP: 39, types: ["fire"] }
            ]
        }
    ]);
});

describe('GET /', () => {
    it('should return a page containing two forms when there is no session', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toContain(`form action="/createPlayer" method="POST"`);
        expect(response.text).toContain(`form action="/login" method="post"`);
        expect(response.text).toContain(`RED`);
        expect(response.text).toContain(`BLUE`);
    });
});

describe('POST /createPlayer', () => {
    it('should create a new player and redirect if all data are filled out correctly', async () => {
        const fakeClient = { db: jest.fn().mockReturnThis(), collection: jest.fn().mockReturnThis(), insertOne: jest.fn() };
        setClient(fakeClient as any);
        const response = await request(app).post('/createPlayer').send({ name: "GREEN", password: "woensdag" });
        expect(response.status).toBe(302);
        expect(getPlayers()).toContainEqual({ name: "GREEN", password: "woensdag", team: [], id: 3 });
        expect(fakeClient.insertOne).toHaveBeenCalledTimes(1);
        expect(fakeClient.insertOne).toHaveBeenCalledWith({ name: "GREEN", password: "woensdag", team: [], id: 3 });
    });
})