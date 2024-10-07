// utils/randomNickname.js
const adjectives = ['행복한', '용감한', '조용한', '강력한', '기쁜', '슬기로운'];
const animals = ['호랑이', '사자', '고양이', '강아지', '독수리', '토끼'];

export const generateRandomNickname = () => {
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
    return `${randomAdjective} ${randomAnimal}`;
};
