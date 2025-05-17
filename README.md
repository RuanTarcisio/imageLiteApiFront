<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Imagelite Web - Front-end</title>
</head>
<body>
  <h1>🌐 Imagelite Web (Front-end)</h1>
  <p>Aplicação frontend feita com <strong>Next.js</strong> para acesso à Imagelite API.</p>

  <h2>🚀 Tecnologias utilizadas</h2>
  <ul>
    <li>Next.js</li>
    <li>React</li>
    <li>Tailwind</li>
    <li>Zustand</li>
  </ul>

  <h2>📂 Estrutura</h2>
  <ul>
    <li><code>/pages</code> – rotas da aplicação</li>
    <li><code>/services</code> – integração com API</li>
    <li><code>/contexts</code> – autenticação</li>
    <li><code>/components</code> – reutilizáveis</li>
  </ul>

  <h2>🔐 Autenticação</h2>
  <ul>
    <li>Login via <code>/signin</code></li>
    <li>JWT em cookie HttpOnly (<code>AUTH_TOKEN</code>)</li>
    <li>Validação via rota <code>/check-session</code></li>
  </ul>

  <h2>▶️ Como rodar o projeto</h2>
  <h3>Pré-requisitos</h3>
  <ul>
    <li>Node.js 18+</li>
    <li>npm ou yarn</li>
  </ul>

  <h3>Executando</h3>
  <pre><code>
cd frontend
npm install
npm run dev
  </code></pre>

  <h2>📁 Configuração</h2>
  <p>Crie um <code>.env.local</code>:</p>
  <pre><code>
NEXT_PUBLIC_API_URL=http://localhost:8080/v1
  </code></pre>

  <h2>🔄 API usada</h2>
  <table border="1">
    <thead>
      <tr>
        <th>Método</th>
        <th>Rota</th>
        <th>Descrição</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>POST</td><td>/signin</td><td>Autentica usuário</td></tr>
      <tr><td>GET</td><td>/check-session</td><td>Verifica validade da sessão</td></tr>
    </tbody>
  </table>

  <h2>🧪 Scripts úteis</h2>
  <ul>
    <li><code>npm run dev</code> – inicia o ambiente local</li>
    <li><code>npm run build</code> – build de produção</li>
    <li><code>npm run lint</code> – validação de código</li>
  </ul>

  <h2>💡 Dica fetch com cookie</h2>
  <pre><code>
  await fetch(`${baseURL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
  </code></pre>
</body>
</html>
