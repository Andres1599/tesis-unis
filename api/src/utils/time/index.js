
const getCurrentTime = () => {
    return new Date().getTime();
}

const getTime = (time) => {
    return new Date(time).getTime();
}

module.exports = { getCurrentTime, getTime };