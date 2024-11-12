import React, { useState } from 'react';

const CalculadoraPerdaColageno = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('feminino');
  const [suplementaColageno, setSuplementaColageno] = useState(null);
  const [fazBioestimuladores, setFazBioestimuladores] = useState(null);
  const [fazMicrofocado, setFazMicrofocado] = useState(null);
  const [fazLimpezaPele, setFazLimpezaPele] = useState(null);
  const [usaProtetorSolar, setUsaProtetorSolar] = useState(null);
  const [usaCosmeticos, setUsaCosmeticos] = useState(null);
  const [fazRadiofrequencia, setFazRadiofrequencia] = useState(null);
  const [fumante, setFumante] = useState(null);
  const [alcool, setAlcool] = useState(null);
  const [problemasSono, setProblemasSono] = useState(null);
  const [resultado, setResultado] = useState(null);

  const getTextoIdade = (idade) => {
    if (idade >= 30 && idade < 40) {
      return "Na faixa dos 30 a 40 anos, o colágeno começa a diminuir. Nesta fase, os tratamentos preventivos são altamente recomendados para preservar a elasticidade e a firmeza da pele. Procedimentos como bioestimuladores e skinboosters ajudam a manter o viço e prevenir os sinais iniciais de flacidez.";
    } else if (idade >= 40 && idade < 50) {
      return "Na faixa dos 40 a 50 anos, a perda de colágeno acelera, sendo fundamental intensificar os cuidados com tratamentos específicos para estimular a produção de colágeno e manter a vitalidade da pele.";
    } else if (idade >= 50 && idade < 60) {
      return "Aos 50 a 60 anos, a produção de colágeno é reduzida drasticamente. Protocolos combinados com bioestimuladores potentes, ultrassom microfocado e radiofrequência ajudam a melhorar a textura e a firmeza, sendo essenciais para uma rotina de cuidados intensivos.";
    } else if (idade >= 60) {
      return "A partir dos 60 anos, o foco dos cuidados deve ser a reestruturação e fortalecimento da pele. A constância em tratamentos mais intensivos, como laser de CO₂ fracionado e protocolos combinados de bioestimulação, faz toda a diferença para manter a qualidade e a aparência da pele, promovendo rejuvenescimento e firmeza.";
    } else {
      return "Por favor, insira uma idade válida para obter uma análise personalizada.";
    }
  };

  const calcularPerdaColageno = () => {
    if (idade && !isNaN(idade)) {
      const idadeNum = parseInt(idade, 10);

      // Define a perda base anual
      let perdaAnual = genero === 'feminino' ? 1.6 : 1.3;
      
      // Acrescento adicional de perda a partir dos 59 anos
      if (idadeNum >= 59) {
        perdaAnual += genero === 'feminino' ? 7 : 4;
      }

      const perdaBase = (idadeNum - 20) * perdaAnual;

      // Calcula a redução total com base nas respostas que reduzem a perda
      let reducaoPorTratamentos = 0;
      if (suplementaColageno) reducaoPorTratamentos += 7;
      if (fazBioestimuladores) reducaoPorTratamentos += 7;
      if (fazMicrofocado) reducaoPorTratamentos += 7;
      if (fazLimpezaPele) reducaoPorTratamentos += 2;
      if (usaProtetorSolar) reducaoPorTratamentos += 2;
      if (usaCosmeticos) reducaoPorTratamentos += 2;
      if (fazRadiofrequencia) reducaoPorTratamentos += 2;

      // Aplica a redução sobre a perda base
      let perdaAjustada = perdaBase * (1 - reducaoPorTratamentos / 100);

      // Calcula o aumento da perda para cada resposta positiva nas novas perguntas
      if (fumante) perdaAjustada *= 1.05;
      if (alcool) perdaAjustada *= 1.05;
      if (problemasSono) perdaAjustada *= 1.05;

      const nivelAtualColageno = 100 - perdaAjustada;

      setResultado({
        perdaTotal: perdaAjustada.toFixed(1),
        nivelAtual: nivelAtualColageno.toFixed(1),
        reducaoPorTratamentos,
        textoIdade: getTextoIdade(idadeNum),
      });
    }
  };

  return (
    <div className="bg-lilac-100 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo da clínica */}
        <div className="flex justify-center mb-4">
          <img src="https://virtuosaestetica.com.br/wp-content/uploads/2020/11/virtuosa-300x98.png" alt="Virtuosa Clínica Estética" className="w-48 h-auto" />
        </div>

        <h1 className="text-3xl font-bold text-center text-pink-500 mb-6">
          Calculadora de Colágeno VIRTUOSA Belém
        </h1>

        <div className="space-y-4">
          <label className="block">
            <span className="text-pink-600 font-semibold">Nome:</span>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-pink-300 focus:border-pink-500" />
          </label>
          <div className="flex space-x-4">
            <label className="flex-1">
              <span className="text-pink-600 font-semibold">Idade:</span>
              <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-pink-300 focus:border-pink-500" min="20" max="100" />
            </label>
            <label className="flex-1">
              <span className="text-pink-600 font-semibold">Gênero:</span>
              <select value={genero} onChange={(e) => setGenero(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-pink-300 focus:border-pink-500">
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </select>
            </label>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-pink-500 mt-6">Responda às questões abaixo:</h3>
        <div className="space-y-4">
          {[
            { label: "Faz suplementação de colágeno?", value: suplementaColageno, setValue: setSuplementaColageno },
            { label: "Aplica Bioestimuladores anualmente?", value: fazBioestimuladores, setValue: setFazBioestimuladores },
            { label: "Aplica Microfocado anualmente?", value: fazMicrofocado, setValue: setFazMicrofocado },
            { label: "Faz limpeza de pele profissional?", value: fazLimpezaPele, setValue: setFazLimpezaPele },
            { label: "Usa protetor solar diariamente?", value: usaProtetorSolar, setValue: setUsaProtetorSolar },
            { label: "Usa cosméticos para estímulo de colágeno?", value: usaCosmeticos, setValue: setUsaCosmeticos },
            { label: "Faz tratamento com radiofrequência?", value: fazRadiofrequencia, setValue: setFazRadiofrequencia },
            { label: "É fumante?", value: fumante, setValue: setFumante },
            { label: "Consome álcool com regularidade?", value: alcool, setValue: setAlcool },
            { label: "Problemas constantes para dormir?", value: problemasSono, setValue: setProblemasSono }
          ].map((question, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-700">{question.label}</span>
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input type="radio" name={question.label} checked={question.value === true} onChange={() => question.setValue(true)} />
                  <span className="ml-2">Sim</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name={question.label} checked={question.value === false} onChange={() => question.setValue(false)} />
                  <span className="ml-2">Não</span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <button onClick={calcularPerdaColageno} className="w-full bg-pink-500 text-white font-semibold rounded-lg py-3 mt-6 hover:bg-pink-600 transition">
          Calcular
        </button>

        {resultado && (
          <div className="mt-6 bg-lilac-100 p-4 rounded-lg shadow-md text-gray-800 text-justify">
            <h3 className="text-black font-bold mb-2">Resultado da Análise:</h3>
            <p className="text-lg">Olá, {nome}!</p>
            <p>Perda Total de Colágeno Estimada: <span className="text-pink-600 font-bold">{resultado.perdaTotal}%</span></p>
            <p>Nível Atual de Colágeno Estimado: <span className="text-pink-600 font-bold">{resultado.nivelAtual}%</span></p>
            {resultado.reducaoPorTratamentos > 0 && (
              <p className="text-green-500 mt-2">
                Seus cuidados atuais estão reduzindo sua perda de colágeno em {resultado.reducaoPorTratamentos}%!
              </p>
            )}
          </div>
        )}

        {resultado && (
          <div className="mt-6 bg-lilac-100 p-4 rounded-lg shadow-md text-gray-800 text-justify">
            <h3 className="text-black font-bold mb-2">Análise Personalizada:</h3>
            <p>{resultado.textoIdade}</p>
          </div>
        )}

        {resultado && (
          <div className="mt-8 bg-white p-4 rounded-lg shadow-md text-justify">
            <h3 className="text-pink-500 font-semibold text-lg mb-4">Procedimentos Padrão Ouro no Tratamento da Flacidez</h3>
            <p><strong>Bioestimuladores de Colágeno:</strong> restauração de volume e firmeza com resultados duradouros</p>
            <p><strong>Ultrassom Microfocado:</strong> lifting não invasivo com ação profunda até o SMAS</p>
            <p><strong>Radiofrequência:</strong> aquecimento controlado para estimulação de colágeno e elastina</p>
            <p><strong>Fios de PDO:</strong> lifting imediato com bioestimulação prolongada e versatilidade de aplicação face/corpo</p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <a 
            href="https://api.whatsapp.com/send/?phone=%2B559193648375&text=Quero%20agendar%20uma%20consulta%20para%20avaliar%20a%20melhor%20forma%20de%20reforçar%20meu%20banco%20de%20colágeno."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg"
          >
            Agende sua avaliação na VIRTUOSA Belém
          </a>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraPerdaColageno;
