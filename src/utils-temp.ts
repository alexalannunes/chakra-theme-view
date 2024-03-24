import chroma from "chroma-js";

export function generateShades(corBase: string, numeroDeTons: number) {
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
