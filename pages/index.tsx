// Importa o hook useState do React para gerenciar estados locais no componente
import { useState } from 'react';

// Define a estrutura de um monstro com suas propriedades e tipos
interface Monster {
  name: string;
  attack: number;
  defense: number;
  speed: number;
  hp: number;
  image_url: string;
}

// Lista inicial de monstros para exibir ao carregar a página
const initialMonsters: Monster[] = [
  { name: "Celia", attack: 7, defense: 8, speed: 200, hp: 20, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/Celia.jpg" },
  { name: "Fungus", attack: 10, defense: 9, speed: 210, hp: 15, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/Fungus.jpg" },
  { name: "James", attack: 9, defense: 9, speed: 190, hp: 12, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/James.jpg" },
  { name: "Mike", attack: 8, defense: 9, speed: 180, hp: 10, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/Mike.jpg" },
  { name: "Randall", attack: 8, defense: 8, speed: 170, hp: 11, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/Randall.jpg" },
  { name: "Roz", attack: 7, defense: 8, speed: 250, hp: 9, image_url: "https://raw.githubusercontent.com/boazcosta/images/main/Roz.jpg"},
];
/**
 * Componente principal da aplicação de batalha de monstros.
 */
export default function BattleApp() {
  // Estado com a lista atual de monstros (pode ser adicionada a novos)
  const [monsters, setMonsters] = useState<Monster[]>(initialMonsters);
  // Índices dos monstros selecionados para a próxima batalha
  const [selected, setSelected] = useState<number[]>([]);
  // Monstro vencedor da batalha (ou null se ainda não houve batalha)
  const [winner, setWinner] = useState<Monster | null>(null);

  /**
   * Converte URLs do GitHub (com /blob/) em URLs diretas do raw.githubusercontent
   * para carregar corretamente as imagens.
   */
  const resolveImage = (url: string): string => {
    if (url.includes('github.com/') && url.includes('/blob/')) {
      return url
        .replace('https://github.com/', 'https://raw.githubusercontent.com/')
        .replace('/blob/', '/');
    }
    return url; // Retorna a URL original se não for do formato GitHub/blob
  };
  /**
   * Marca ou adiciona um monstro à seleção para batalha.
   * Só permite até 2 seleções diferentes.
   */
  const handleSelect = (index: number) => {
    setSelected(prev => {
      if (prev.includes(index)) return prev;
      if (prev.length < 2) return [...prev, index];
      return prev;
    });
  };
  
  /**
   * Executa a lógica da batalha comparando soma de atributos.
   * Define o vencedor no estado "winner".
   */
  const handleBattle = () => {
    if (selected.length === 2) {
      const [a, b] = selected.map(i => monsters[i]);
      const scoreA = a.attack + a.defense + a.speed + a.hp;
      const scoreB = b.attack + b.defense + b.speed + b.hp;
      setWinner(scoreA >= scoreB ? a : b);
    }
  };
  /**
   * Reinicia a seleção e o resultado para permitir nova batalha.
   */
  const handleNewBattle = () => {
    setSelected([]);
    setWinner(null);
  };
  /**
   * Solicita via prompt a criação de um novo monstro e o adiciona à lista.
   */
  const handleAddMonster = () => {
    const name = prompt("Nome do monstro:")?.trim();
    if (!name) return;
    const attack = Number(prompt("Ataque:"));
    const defense = Number(prompt("Defesa:"));
    const speed = Number(prompt("Velocidade:"));
    const hp = Number(prompt("HP:"));
    const image_url = prompt("URL da imagem:")?.trim() || "";
    setMonsters(prev => [
      ...prev,
      { name, attack, defense, speed, hp, image_url }
    ]);
  };

  return (
    <div className="container">
      <h1>Battle Monsters</h1>

      <div className="grid">
        {monsters.map((monster, i) => {
          const isSelected = selected.includes(i);
          return (
            <div
              key={i}
              className={`card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleSelect(i)}
            >
              <img src={resolveImage(monster.image_url)} alt={monster.name} />
              <h2>{monster.name}</h2>
              <p>Ataque: {monster.attack}</p>
              <p>Defesa: {monster.defense}</p>
              <p>Velocidade: {monster.speed}</p>
              <p>HP: {monster.hp}</p>
            </div>
          );
        })}
      </div>

      <div className="buttons">
        <button onClick={handleAddMonster}>
          Adicionar Monstro
        </button>
        <button onClick={handleBattle} disabled={selected.length !== 2 || !!winner}>
          Iniciar Batalha
        </button>
        <button onClick={handleNewBattle} disabled={selected.length === 0 && !winner}>
          Nova Batalha
        </button>
      </div>

      {winner && (
        <div className="winner">
          <h2>Vencedor: {winner.name}</h2>
          <img src={resolveImage(winner.image_url)} alt={winner.name} />
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 20px;
          margin: 20px 0;
        }
        .card {
          border: 2px solid #ccc;
          border-radius: 8px;
          padding: 10px;
          cursor: pointer;
          transition: transform 0.2s, border-color 0.2s;
        }
        .card:hover {
          transform: translateY(-5px);
        }
        .card.selected {
          border-color: #0070f3;
          box-shadow: 0 0 10px rgba(0, 112, 243, 0.5);
        }
        .card img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
        }
        .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
        }
        button {
          padding: 10px 15px;
          font-size: 14px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        button:nth-child(1) {
          background-color: #17a2b8;
          color: white;
        }
        button:nth-child(1):hover:not(:disabled) {
          background-color: #138496;
        }
        button:nth-child(2) {
          background-color: #28a745;
          color: white;
        }
        button:nth-child(2):hover:not(:disabled) {
          background-color: #218838;
        }
        button:nth-child(3) {
          background-color: #ffc107;
          color: #212529;
        }
        button:nth-child(3):hover:not(:disabled) {
          background-color: #e0a800;
        }
        .winner {
          margin-top: 20px;
          padding: 20px;
          border: 2px solid #28a745;
          border-radius: 8px;
          background-color: #e9f7ef;
        }
        .winner img {
          max-height: 150px;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
}
