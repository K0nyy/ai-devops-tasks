# 📝 Simple Task API

Simple Task API to proste RESTowe API służące do zarządzania zadaniami. Aplikacja została stworzona w Node.js z wykorzystaniem Express i MongoDB. Umożliwia tworzenie, edytowanie, przeglądanie i usuwanie zadań, z prostym systemem autoryzacji.

---

## 📦 Instalacja

1. Sklonuj repozytorium:
   ```bash
   git clone https://github.com/twoje-repozytorium/simple-task-api.git
   cd simple-task-api

npm install

PORT=3000
MONGODB_URI=mongodb://localhost:27017/tasksdb
JWT_SECRET=twoj_super_tajny_klucz

npm start

Endpointy API
Autoryzacja
Metoda	Endpoint	Opis
POST	/auth/register	Rejestracja nowego użytkownika
POST	/auth/login	Logowanie użytkownika, zwraca token JWT

Zadania
Metoda	Endpoint	Opis
GET	/tasks	Pobierz wszystkie zadania (możliwe filtrowanie przez query params)
GET	/tasks/:id	Pobierz pojedyncze zadanie
POST	/tasks	Utwórz nowe zadanie
PUT	/tasks/:id	Zaktualizuj zadanie
DELETE	/tasks/:id	Usuń zadanie
