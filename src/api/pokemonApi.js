import axios from "axios";

// 포켓몬 데이터를 가져오는 함수 (한국어 이름 포함)
export async function fetchPokemonData(number) {
    try {
        // 포켓몬 기본 데이터 요청
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const pokemonData = pokemonResponse.data;

        // 포켓몬 종 데이터 요청 (한국어 이름 포함)
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${number}/`);
        const speciesData = speciesResponse.data;
        const koreanNameData = speciesData.names.find((name) => name.language.name === "ko");
        const koreanName = koreanNameData ? koreanNameData.name : null;

        // 기본 데이터에 한국어 이름 추가
        return {
            ...pokemonData,
            koreanName,
        };
    } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
        throw error;
    }
}

// 백엔드로 포켓몬 데이터를 전송하는 함수
export async function sendPokemonDataToBackend(data) {
    try {
        const payload = {
            id: data.id,
            name: data.name,
            koreanName: data.koreanName,
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map((ability) => ability.ability.name),
            types: data.types.map((type) => type.type.name),
            sprites: {
                front: data.sprites.front_default,
                back: data.sprites.back_default,
            },
            cries: data.cries.latest,
        };

        await axios.post("http://localhost:8090/api/pokemon", payload);
        console.log("백엔드로 데이터 전송 성공");
    } catch (error) {
        console.error("백엔드로 데이터 전송 중 오류 발생:", error);
        throw error;
    }
}
