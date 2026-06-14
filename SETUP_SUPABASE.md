# 🚀 Guia de Configuração - Salvar Imagens Permanentemente

Seu site agora está pronto para salvar imagens permanentemente! Siga esses passos:

## 1️⃣ Criar conta no Supabase (Gratuito)

1. Acesse: https://supabase.com
2. Clique em "Sign Up" e crie uma conta
3. Crie um novo projeto
4. Copie a **URL do projeto** e a **Chave de API Anônima** (em Settings > API)

## 2️⃣ Criar a tabela no Banco de Dados

1. No dashboard do Supabase, clique em **SQL Editor**
2. Cole este código:

```sql
CREATE TABLE IF NOT EXISTS galeria_data (
  id TEXT PRIMARY KEY,
  photos JSONB DEFAULT '[]',
  thumbs JSONB DEFAULT '[]',
  cover TEXT DEFAULT '',
  names JSONB DEFAULT '[]',
  artists JSONB DEFAULT '[]',
  msgText TEXT DEFAULT '',
  msgFrom TEXT DEFAULT '',
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dar permissão de leitura e escrita pública
ALTER TABLE galeria_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read" ON galeria_data
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert" ON galeria_data
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update" ON galeria_data
  FOR UPDATE USING (true);
```

3. Clique em **Run** para executar

## 3️⃣ Configurar Variáveis de Ambiente no Vercel

1. Acesse seu projeto no Vercel: https://vercel.com/dashboard
2. Clique no seu projeto "valentina"
3. Vá para **Settings > Environment Variables**
4. Adicione duas variáveis:

| Key | Value |
|-----|-------|
| `SUPABASE_URL` | Cole a URL do seu projeto Supabase |
| `SUPABASE_ANON_KEY` | Cole a Chave de API Anônima |

5. Clique em **Save**

## 4️⃣ Fazer Deploy no Vercel

1. No terminal, execute:
```bash
cd "c:\Users\Azevedo\Desktop\PROGRAMAÇÃO\valentina"
npm install
git add .
git commit -m "Adicionado API para salvar dados permanentemente"
git push
```

2. O Vercel vai fazer o deploy automaticamente

## 5️⃣ Testar

- Abra seu site em https://seu-site-aqui.vercel.app
- Adicione uma imagem/música/mensagem
- Atualize a página (F5)
- A imagem deve estar lá!

---

## ⚠️ Importante

- As imagens são armazenadas como **base64** no banco de dados
- Limite de tamanho: Supabase permite até **6MB por linha**
- Para usar imagens muito grandes, use Cloudinary (próxima opção)

## 🆘 Problemas?

- Se as imagens desaparecerem, há dados salvos em `localStorage` (aperte F12 > Application > Local Storage)
- O site continua funcionando offline com dados salvos localmente
- Quando reconectado, os dados são sincronizados com o servidor

---

## 📋 Resumo das mudanças

- ✅ API `/api/upload` - Salva dados no Supabase
- ✅ API `/api/get-data` - Recupera dados do Supabase
- ✅ `localStorage` como backup - Se internet cair, dados salvos localmente
- ✅ Sincronização automática - Sempre que você adiciona algo, sai do seu PC
