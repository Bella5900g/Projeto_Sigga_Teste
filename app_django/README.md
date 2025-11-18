# Aplicação Django - Sistema de Gerenciamento de Tarefas

Aplicação web Django para o MVP de automação de testes.

## 📋 Requisitos

- Python 3.8+
- pip

## 🚀 Instalação

1. **Criar ambiente virtual (recomendado):**
```bash
python -m venv venv

# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

2. **Instalar dependências:**
```bash
pip install -r requirements.txt
```

3. **Executar migrações:**
```bash
python manage.py migrate
```

4. **Criar superusuário (opcional):**
```bash
python manage.py createsuperuser
```

## ▶️ Executar

```bash
python manage.py runserver
```

A aplicação estará disponível em `http://localhost:8000`

**⚠️ IMPORTANTE:** Para os testes Cypress funcionarem, a aplicação precisa rodar na porta **3000**. 

Para rodar na porta 3000:
```bash
python manage.py runserver 3000
```

## 🔐 Credenciais de Teste

As credenciais usadas pelos testes automatizados são:
- **Email:** `usuario@teste.com`
- **Senha:** `senha123`

O usuário é criado automaticamente no primeiro login.

## 📁 Estrutura

```
app_django/
├── sigga_app/          # Configurações do projeto Django
├── tarefas/            # App de tarefas
│   ├── models.py       # Modelo de Tarefa
│   ├── views.py        # Views e APIs
│   ├── urls.py         # URLs
│   └── templates/      # Templates HTML
├── manage.py
└── requirements.txt
```

## 🔄 APIs

### Autenticação
- `POST /api/login` - Login de usuário
- `POST /api/logout` - Logout de usuário

### Tarefas (CRUD Completo)
- `GET /api/tarefas` - Listar todas as tarefas
- `POST /api/tarefas` - Criar nova tarefa
- `PUT /api/tarefas/<id>` - Atualizar tarefa existente
- `DELETE /api/tarefas/<id>/delete` - Deletar tarefa

## 📝 Notas

- A aplicação usa autenticação via sessão do Django
- Os cookies são configurados para funcionar com localhost
- CSRF está desabilitado nas APIs para compatibilidade com os testes

