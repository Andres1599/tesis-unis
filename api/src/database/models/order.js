module.exports = ({id, dateCreated, stimedTime, status, price, issues}) => {
    return new Object.assign({
        id,
        dateCreated,
        stimedTime,
        status,
        price,
        issues
    })
}