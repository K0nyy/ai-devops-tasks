def find_duplicates(list_of_items):
    duplicates = []
    for i in range(len(list_of_items)):
        for j in range(i+1, len(list_of_items)):
            if list_of_items[i] == list_of_items[j] and list_of_items[i] not in duplicates:
                duplicates.append(list_of_items[i])
    return duplicates

Zoptymalizowana wersja:
def find_duplicates(list_of_items):
    seen = set()
    duplicates = set()

    for item in list_of_items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)

    return list(duplicates)

Tak, Twój kod można zoptymalizować — i to znacznie. Oryginalna wersja działa poprawnie, ale jej złożoność czasowa to O(n²) przez zagnieżdżone pętle. To oznacza, że przy dużych listach będzie działać bardzo wolno.

✅ Lepsza, zoptymalizowana wersja (z użyciem set)
Oto bardziej wydajna wersja o złożoności czasowej O(n):

python
Copy
Edit
def find_duplicates(list_of_items):
    seen = set()
    duplicates = set()

    for item in list_of_items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)

    return list(duplicates)
🔍 Jak to działa?
seen: przechowuje elementy, które już widzieliśmy.

duplicates: przechowuje tylko te elementy, które już wcześniej widzieliśmy więcej niż raz.

Użycie set zamiast listy sprawia, że sprawdzanie istnienia elementu (item in set) jest bardzo szybkie — O(1).

🧪 Przykład działania
python
Copy
Edit
print(find_duplicates([1, 2, 3, 2, 4, 5, 1]))  # Output: [1, 2]
Uwaga: Wynik może nie zachować oryginalnej kolejności — bo set nie gwarantuje kolejności (w Pythonie 3.6+ w praktyce często ją zachowuje, ale nie należy na tym polegać).
