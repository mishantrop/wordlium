export const rand = (min = 0, max = 100) => {
    const difference = max + 1 - min
    let rand = Math.random()
    rand = Math.floor(rand * difference)
    return rand + min
}
