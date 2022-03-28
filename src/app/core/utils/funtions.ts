/**
 * Permite obtener un color de manera aleatoria
 * @returns retorna un color
 */
export const getRandomColor = ( ) => {
    return '#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6);
}