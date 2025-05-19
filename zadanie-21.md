Proces konwersji danych z formatu JSON do CSV jest dość prosty, ale pojawiają się pewne wyzwania, szczególnie przy transformacji struktur zagnieżdżonych, takich jak tablice. Oto opis całego procesu oraz potencjalne trudności:

🔄 Opis procesu konwersji JSON ➝ CSV
1. Analiza struktury JSON
Na początek należy zidentyfikować wszystkie pola w obiektach JSON, które mają się znaleźć w CSV. W naszym przypadku są to:

id (liczba)

name (tekst)

email (tekst)

roles (tablica tekstów)

2. Płaska reprezentacja danych
CSV to format płaski – nie obsługuje struktur zagnieżdżonych (np. tablic, obiektów). Dlatego każde złożone pole musi zostać zredukowane do jednej wartości tekstowej.

3. Wybór separatora dla list
Typowe separatory: przecinek (,), średnik (;), pipe (|)

Należy unikać kolizji z separatorem pól w samym CSV (często przecinek)

W naszym przykładzie użyto średnika (;), ponieważ przecinek już pełni funkcję separatora kolumn

4. Tworzenie wierszy CSV
Każdy obiekt w tablicy users staje się jednym wierszem CSV, a pola są ułożone zgodnie z nagłówkami.

⚠️ Potencjalne wyzwania i problemy
Problem	Opis	Możliwe rozwiązanie
🔄 Zagnieżdżone dane	Tablice lub obiekty nie mają bezpośredniego odpowiednika w CSV	Serializacja do tekstu (np. roles jako string z separatorami)
🧩 Separator konfliktuje z danymi	Jeśli dane zawierają przecinki, mogą zaburzyć format CSV	Umieszczanie takich pól w cudzysłowie lub wybór innego separatora (np. średnik)
🌍 Kodowanie znaków	CSV może być źle odczytywany bez odpowiedniego kodowania (np. UTF-8)	Ustawienie poprawnego nagłówka kodowania (BOM) lub eksport z odpowiednim encodingiem
📋 Spójność danych	Niektóre rekordy mogą mieć brakujące pola	Ustalenie domyślnych wartości (np. pusty string)

✅ Podsumowanie
Konwersja JSON → CSV wymaga:

Spłaszczenia danych

Transformacji złożonych struktur (tablic, obiektów)

Zachowania czytelności i spójności formatu

Dzięki temu dane mogą być łatwo analizowane w arkuszach kalkulacyjnych (np. Excel, Google Sheets) lub przetwarzane przez inne narzędzia.

Jeśli chcesz, mogę też pokazać przykład takiego konwertera w Pythonie lub innym języku.
