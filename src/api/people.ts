const url: string = 'https://swapi.dev/api/';

export const getAllPeople = async (page:number) =>{

    try {
        const response = await fetch(`https://swapi.dev/api/people?page=${page}`);
        if(!response.ok)
            throw new NetworkError()

        return response.json();
    } catch (error) {
        throw error;
    }
}
export const getPeopleById = async (idCharacter:number) =>{

    try {
        const response = await fetch(`https://swapi.dev/api/people/ ${idCharacter}`);
        if(!response.ok)
            throw new NetworkError()

        return response.json();
    } catch (error) {
        throw error;
    }
}
export const getSearchByText = async (text:string) =>{

    try {
        const response = await fetch(`https://swapi.dev/api/people?search= ${text}`);
        if(!response.ok)
            throw new NetworkError()

        return response.json();
    } catch (error) {
        throw error;
    }
}

class NetworkError extends Error {
    constructor() {
        super("Oppss Something went wrong in the network")
    }
}