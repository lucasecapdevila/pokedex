export const primerLetraMayuscula = (texto) => {
  let palabras = texto.split(' ');

  palabras[0] = palabras[0].charAt(0).toUpperCase() + palabras[0].slice(1);

  return palabras.join(' ');
}