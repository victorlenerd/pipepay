const randomAlpha = () => {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    return alpha.charAt(Math.floor(Math.random() * alpha.length));
};

const randomNum = () => {
    return Math.floor(Math.random() * 9);
};

export default () => {
    return `${randomAlpha()}${randomNum()}${randomAlpha()}${randomNum()}${randomAlpha()}${randomNum()}`
}