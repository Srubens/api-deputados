import React, { useState, useEffect } from 'react';

const App = () => {
  const [partidos, setPartidos] = useState([]);
  const [parlamentares, setParlamentares] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState('');

  // Função para buscar os partidos
  const fetchPartidos = async () => {
    try {
      const response = await fetch('https://dadosabertos.camara.leg.br/api/v2/partidos/');
      const data = await response.json();
      setPartidos(data.dados); // A API retorna um objeto "dados" que contém a lista
    } catch (error) {
      console.error('Erro ao buscar partidos:', error);
    }
  };

  // Função para buscar os parlamentares de um partido específico
  const fetchParlamentares = async (partidoId) => {
    try {
      const response = await fetch(`https://dadosabertos.camara.leg.br/api/v2/deputados/`);
      const data = await response.json();
      setParlamentares(data.dados); // A API retorna um objeto "dados" que contém a lista
    } catch (error) {
      console.error('Erro ao buscar parlamentares:', error);
    }
  };

  // Buscar partidos ao carregar o componente
  useEffect(() => {
    fetchPartidos();
  }, []);

  // Atualiza os parlamentares sempre que o partido for selecionado
  useEffect(() => {
    if (selectedPartido) {
      fetchParlamentares(selectedPartido);
    }
  }, [selectedPartido]);

  return (
    <div>
      <h1>Parlamentares por Partido</h1>

      {/* Caixa de seleção de partidos */}
      <label htmlFor="partido">Selecione um partido:</label>
      <select
        id="partido"
        value={selectedPartido}
        onChange={(e) => setSelectedPartido(e.target.value)}
      >
        <option value="">Escolha um partido</option>
        {partidos.map((partido) => (
          <option key={partido.id} value={partido.id}>
            {partido.nome} ({partido.sigla})
          </option>
        ))}
      </select>

      {/* Lista de parlamentares */}
      <h2>Parlamentares</h2>
      {parlamentares.length === 0 ? (
        <p>Nenhum parlamentar encontrado para o partido selecionado.</p>
      ) : (
        <ul>
          {parlamentares.map((parlamentar) => (
            <li key={parlamentar.id}>
              {parlamentar.nome} - {parlamentar.siglaPartido}/{parlamentar.uf}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
