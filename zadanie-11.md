✅ Co to jest Jest?
Jest to popularne narzędzie do testowania jednostkowego w ekosystemie JavaScript/TypeScript, szczególnie popularne przy projektach React, ale nadaje się również do testowania czystego JavaScriptu lub Node.js. Pozwala pisać testy, sprawdzać poprawność kodu i uruchamiać je automatycznie.

🧪 1. Test jednostkowy funkcji sum w Jest
Funkcja (w pliku sum.js):
javascript
Copy
Edit
function sum(a, b) {
  return a + b;
}

module.exports = sum;
Test (w pliku sum.test.js):
javascript
Copy
Edit
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
📦 2. Jak zainstalować Jest i uruchomić test?
a) Zainicjuj projekt Node.js (jeśli jeszcze nie masz)
bash
Copy
Edit
npm init -y
b) Zainstaluj Jest jako zależność developerską
bash
Copy
Edit
npm install --save-dev jest
c) Zmień scripts w package.json
Dodaj (lub edytuj) sekcję scripts:

json
Copy
Edit
"scripts": {
  "test": "jest"
}
📂 3. Przykładowa struktura katalogów
python
Copy
Edit
projekt/
├── sum.js
├── sum.test.js
├── package.json
└── node_modules/
▶️ 4. Uruchomienie testu
W terminalu, w katalogu głównym projektu:

bash
Copy
Edit
npm test
Po uruchomieniu powinieneś zobaczyć wynik podobny do:

vbnet
Copy
Edit
 PASS  ./sum.test.js
 ✓ adds 1 + 2 to equal 3 (X ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
🔎 Podsumowanie
Jest to framework testowy dla JavaScriptu.

Łatwo go zainstalować i zintegrować z projektem Node.js.

Testy piszesz w plikach z rozszerzeniem .test.js.

Uruchamiasz testy poleceniem npm test.
