import chroma from "chroma-js";

const corBase = "#07c";

function gerarTons(corBase: string, numeroDeTons: number) {
  const tons = [];
  const corRgb = chroma(corBase).rgb();
  const fatorDeEscurecimento = 1 / (numeroDeTons - 1); // Ajustando a escala de escurecimento

  for (let i = 0; i < numeroDeTons; i++) {
    tons.push(
      chroma(corRgb)
        .darken(i * fatorDeEscurecimento)
        .hex()
    );
  }

  return tons;
}

// Número de tons desejados
const numeroDeTons = 24;

// Gerando tons com base na cor base e no número de tons desejados
const tons = gerarTons(corBase, numeroDeTons);

console.log(tons);
