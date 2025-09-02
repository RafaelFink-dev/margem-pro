"use client";

import { useState } from "react";
import Image from "next/image";
import margemLogo from "/public/assets/calculadora.png";
import folhaLogo from "/public/assets/folha.png";

export default function Home() {
  const [largura, setLargura] = useState("");
  const [altura, setAltura] = useState("");

  const [margens, setMargens] = useState({
    esquerda: "",
    direita: "",
    superior: "",
    inferior: "",
  });

  const [resultado, setResultado] = useState<{
    esquerda: string;
    direita: string;
    superior: string;
    inferior: string;
  } | null>(null);

  const calcularMargens = () => {
  const larguraNum = parseFloat(largura.replace(",", "."));
  const alturaNum = parseFloat(altura.replace(",", "."));
  const esquerda = parseFloat(margens.esquerda.replace(",", "."));
  const direita = parseFloat(margens.direita.replace(",", "."));
  const superior = parseFloat(margens.superior.replace(",", "."));
  const inferior = parseFloat(margens.inferior.replace(",", "."));

  if (
    isNaN(larguraNum) ||
    isNaN(alturaNum) ||
    isNaN(esquerda) ||
    isNaN(direita) ||
    isNaN(superior) ||
    isNaN(inferior)
  ) {
    alert("Por favor, preencha todos os campos com números válidos.");
    return;
  }

  if (larguraNum === 19 && alturaNum === 25) {
    alert("As dimensões já são 19x25, nenhuma conversão necessária!");
    return;
  }

  // Área útil original
  const larguraUtil = larguraNum - esquerda - direita;
  const alturaUtil = alturaNum - superior - inferior;

  // Margens novas para 19x25
  let novaEsquerda = (19 - larguraUtil) / 2;
  let novaDireita = (19 - larguraUtil) / 2;

  const diferencaAltura = 25 - alturaUtil;
  let novaSuperior = diferencaAltura * 0.7;
  let novaInferior = diferencaAltura * 0.3;

  novaEsquerda = novaEsquerda < 0 ? 1 : novaEsquerda;
  novaDireita = novaDireita < 0 ? 1 : novaDireita;
  novaSuperior = novaSuperior < 0 ? 1 : novaSuperior;
  novaInferior = novaInferior < 0 ? 1 : novaInferior;

  setResultado({
    esquerda: novaEsquerda.toFixed(2),
    direita: novaDireita.toFixed(2),
    superior: novaSuperior.toFixed(2),
    inferior: novaInferior.toFixed(2),
  });
};

  const limparInputs = () => {
    setLargura("");
    setAltura("");
    setMargens({ esquerda: "", direita: "", superior: "", inferior: "" });
    setResultado(null);
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-around bg-gradient-to-r from-blue-950 to-blue-900 p-4">

      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-4 text-center">
        <span className="text-blue-400">MARGEM+</span>PRO
      </h1>

      <div className="bg-gradient-to-br from-blue-950 to-blue-800 rounded-3xl shadow-2xl p-6 sm:p-10 flex flex-col sm:flex-row gap-6 sm:gap-10 w-full max-w-5xl">
        {/* Lado esquerdo - Logo */}
        <div className="flex flex-col items-center justify-center w-full sm:w-[300px]">
          <h2 className="text-white font-extrabold text-center text-lg sm:text-xl mb-3 sm:mb-6">
            Conversor de margens para <b className="text-blue-400">19x25</b>
          </h2>
          <Image
            src={margemLogo}
            alt="Logo Margens"
            width={220}
            height={220}
            priority
          />
        </div>

        {/* Lado direito - Formulário */}
        <div className="flex flex-col text-white gap-4 sm:gap-6 flex-1">
          {/* Largura e altura */}
          <div className="bg-white/10 rounded-xl p-4 sm:p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Tamanho do livro</h3>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <div className="flex flex-col flex-1">
                <span className="text-sm mb-1 font-bold">Largura (cm)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={largura}
                  onChange={(e) => setLargura(e.target.value)}
                  className="border border-gray-400 rounded-lg text-black font-bold text-center p-2 bg-white/30 focus:bg-white focus:outline-none transition"
                  placeholder="Ex: 21,0"
                />
              </div>
              <div className="flex flex-col flex-1">
                <span className="text-sm mb-1 font-bold">Altura (cm)</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="border border-gray-400 rounded-lg text-black font-bold text-center p-2 bg-white/30 focus:bg-white focus:outline-none transition"
                  placeholder="Ex: 29,7"
                />
              </div>
            </div>
          </div>

          {/* Margens originais */}
          <div className="bg-white/10 rounded-xl p-4 sm:p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Margens originais</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {["esquerda", "direita", "superior", "inferior"].map((lado) => (
                <div key={lado} className="flex flex-col">
                  <span className="text-sm mb-1 font-bold uppercase">{lado}</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={(margens as any)[lado]}
                    onChange={(e) =>
                      setMargens({ ...margens, [lado]: e.target.value })
                    }
                    className="border border-gray-400 rounded-lg text-black text-center p-2 font-bold bg-white/30 focus:bg-white focus:outline-none transition"
                    placeholder="Ex: 2,5"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 mt-2 justify-center ">
            <button
              onClick={limparInputs}
              className="bg-gray-600 hover:bg-gray-700 transition-all text-white font-bold py-2 px-4 rounded-xl shadow-md cursor-pointer"
            >
              Limpar
            </button>
            <button
              onClick={calcularMargens}
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-2 px-4 rounded-xl shadow-md cursor-pointer"
            >
              Calcular
            </button>
          </div>

          {/* Resultado */}
          {resultado && (
            <div className="mt-4 bg-green-700/40 p-4 rounded-lg text-center font-semibold space-y-2">
              <p>📏 Novas margens para 19x25:</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <p>Esquerda: {resultado.esquerda} cm</p>
                <p>Direita: {resultado.direita} cm</p>
                <p>Superior: {resultado.superior} cm</p>
                <p>Inferior: {resultado.inferior} cm</p>
              </div>
              <p className="text-sm text-yellow-300 mt-2">
                ⚠️ Observação: dependendo, pode ser necessário ajustar um pouco manualmente.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Rodapé */}
      <footer className="text-gray-400 text-sm mt-4 mb-2 text-center">
        MK Innovations. Copyright © {new Date().getFullYear()}. Todos os direitos reservados.
      </footer>
    </div>
  );
}
