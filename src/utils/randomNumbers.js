// utils/randomNumbers.js
export const generateRandomNumbers = (min = 1, max = 1025, count = 3) => {
    const numbers = new Set();
    while (numbers.size < count) {
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        numbers.add(randomNum);
    }
    return Array.from(numbers);
};