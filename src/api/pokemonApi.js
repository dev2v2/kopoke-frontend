import axios from "axios";

// 포켓몬 데이터를 가져오는 함수 (한국어 이름 포함)
export async function fetchPokemonData(number) {
    try {
        // 포켓몬 기본 데이터 요청
        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);
        const pokemonData = pokemonResponse.data;

        // 울음소리 (latest가 존재하지 않으면 legacy가 들어가도록)
        const cry = pokemonData.cries?.latest || pokemonData.cries?.legacy || "울음소리 정보 없음";

        // 앞모습과 뒷모습 (back_default가 없으면 front_default 사용)
        const frontSprite = pokemonData.sprites.front_default;
        const backSprite = pokemonData.sprites.back_default || frontSprite;

        // 타입
        const type = pokemonData.types[0]?.type.name || "타입 정보 없음";

        // 스탯 값과 스탯 이름(한국어) 가져오기
        const stats = await Promise.all(
            pokemonData.stats.map(async (stat) => {
                const statValue = stat.base_stat;
                const statNameKo = await fetchStatNameKo(stat.stat.url);
                return { value: statValue, name: statNameKo };
            })
        );

        // 특징 (한국어) 가져오기
        const speciesResponse = await axios.get(pokemonData.species.url);
        const speciesData = speciesResponse.data;
        const koreanFlavors = speciesData.flavor_text_entries
            .filter((entry) => entry.language.name === "ko")
            .map((entry) => entry.flavor_text);

        // 한국어 이름 가져오기
        const speciesKoreanNameData = speciesData.names.find((name) => name.language.name === "ko");
        const koreanName = speciesKoreanNameData ? speciesKoreanNameData.name : "이름 정보 없음";

        // 필요한 데이터만 반환
        return {
            cry,
            frontSprite,
            backSprite,
            height: pokemonData.height,
            weight: pokemonData.weight,
            type,
            stats,
            koreanFlavors,
            koreanName,
        };
    } catch (error) {
        console.error("포켓몬 데이터를 가져오는 중 오류 발생:", error);
        throw error;
    }
}

// 스탯 이름을 한국어로 가져오는 함수
async function fetchStatNameKo(url) {
    try {
        const statResponse = await axios.get(url);
        const statData = statResponse.data;
        const statKo = statData.names.find((name) => name.language.name === "ko");
        return statKo ? statKo.name : "스탯 이름 정보 없음";
    } catch (error) {
        console.error("스탯 이름을 가져오는 중 오류 발생:", error);
        return "스탯 이름 정보 없음";
    }
}

// 백엔드로 포켓몬 데이터를 전송하는 함수
export async function sendPokemonDataToBackend(data) {
    try {
        const payload = {
            koreanName: data.koreanName,
            cry: data.cry,
            height: data.height,
            weight: data.weight,
            type: data.type,
            sprites: {
                front: data.frontSprite,
                back: data.backSprite,
            },
            stats: data.stats,
            koreanFlavors: data.koreanFlavors,
        };

        await axios.post("http://localhost:8090/api/pokemon", payload);
        console.log("백엔드로 데이터 전송 성공");
    } catch (error) {
        console.error("백엔드로 데이터 전송 중 오류 발생:", error);
        throw error;
    }
}
