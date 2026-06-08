# Gym guide

## Що це
Мобільний fitness-сайт у темній темі з:
- картками груп м'язів;
- сторінками вправ;
- сторінкою детальної техніки;
- локальними GIF у `public/assets/gifs`;
- AI-чатом, що працює через `/api/chat`.

## Важливо про GitHub Pages
GitHub Pages — це статичний хостинг, він публікує лише статичні файли з репозиторію. Тому сам фронтенд можна залити на GitHub Pages, але OpenAI API key не можна безпечно зберігати у браузері; для чату потрібен окремий backend/serverless endpoint. citeturn782076search10turn782076search7turn265948search2

## Як запускати локально
```bash
npm install
npm run dev
```

## Як підключити реальний AI-чат
1. Створи OpenAI API key в платформі OpenAI. Потім збережи його як секрет на серверній стороні, а не у фронтенді. OpenAI documentation uses the Responses API for direct model requests. citeturn265948search0turn265948search2turn265948search10
2. Розгорни `api/chat.js` у serverless середовищі, яке вміє тримати секрети.
3. У `.env` додай `OPENAI_API_KEY` та, за потреби, `OPENAI_MODEL`.
4. Переконайся, що фронтенд викликає `/api/chat`.

## Як залити на GitHub
1. Створи репозиторій `gym-guide`.
2. Завантаж файли з цього архіву.
3. Додай свої GIF у `public/assets/gifs/...` з іменами з README.
4. Збери сайт через `npm run build`.
5. Для GitHub Pages опублікуй статичний `dist/` або використай GitHub Actions.
6. Для AI-частини підключи окремий backend/serverless endpoint.

## Структура
```bash
gym-guide/
├─ api/
│  └─ chat.js
├─ public/
│  └─ assets/
│     └─ gifs/
├─ src/
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js
├─ .env.example
└─ README.md
```
