import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Bem-vindo(a) à taqtile!</h1>
      <div id='login'>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" />
      <br />
      <br />
      <label htmlFor="senha">senha:</label>
      <input type="password" id="senha" />
      <br />
      <br />
      <button id="button-enter">Entrar</button>
      </div>
    </div>
  );
}

export default App;
