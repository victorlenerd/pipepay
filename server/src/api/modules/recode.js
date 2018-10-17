const randomAlpha = () => 'abcdefghijklmnopqrstuvwxyz'.charAt(Math.floor(Math.random() * 26));
const randomNum = () => Math.floor(Math.random() * 9);
export default () => `${randomAlpha()}${randomNum()}${randomAlpha()}${randomNum()}${randomAlpha()}${randomNum()}`;