## Endpoint
`GET /api/users`

Zwraca listę użytkowników w systemie. Użytkownik może dostosować zapytanie za pomocą parametrów zapytania, takich jak numer strony, limit wyników oraz filtr według roli.

---

## Parametry zapytania

| Parametr | Typ    | Opis                                                                                                                                      | Domyślnie | Dozwolona wartość   |
|----------|--------|-------------------------------------------------------------------------------------------------------------------------------------------|-----------|---------------------|
| `page`   | integer| Numer strony do pobrania. Jeśli nie podano, domyślnie zwracana jest pierwsza strona.                                                         | 1         | Dowolna liczba całkowita |
| `limit`  | integer| Liczba wyników na stronę. Jeśli nie podano, domyślnie zwracane jest 10 wyników. Maksymalna wartość to 100.                                   | 10        | 1-100               |
| `role`   | string | Opcjonalny filtr według roli użytkownika (np. `admin`, `user`).                                                                           | Brak      | Dowolna rola (np. `admin`, `user`) |

---

## Przykładowe zapytania

1. **Pobranie listy użytkowników z domyślnymi parametrami:**
   ```http
