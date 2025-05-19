Funkcja, którą stworzyłem, przyjmuje jako argument tablicę obiektów, z których każdy reprezentuje zadanie. Każde zadanie ma trzy właściwości: id, title i status. Celem funkcji jest wykonanie trzech operacji na tej tablicy:

Filtracja zadań o statusie "completed":
Funkcja najpierw używa metody .filter(), aby wybrać tylko te zadania, które mają status "completed". Dzięki temu usuwamy zadania, które nie zostały jeszcze ukończone lub są w trakcie realizacji.

Sortowanie zadań według id:
Następnie używamy metody .sort(), aby posortować zadania po polu id. Zastosowany jest porządek rosnący, co oznacza, że zadania o mniejszych id pojawią się przed tymi o większych. W przypadku, gdyby zadania miały identyczne id (co w tym kontekście jest mało prawdopodobne), sort działałby zgodnie z naturalnym porządkiem porównania liczb.

Wyciąganie tytułów zadań:
Na końcu funkcja stosuje metodę .map(), aby przekształcić przefiltrowaną i posortowaną tablicę obiektów w tablicę zawierającą tylko tytuły zadań (title).

Przykład użycia:
Załóżmy, że mamy tablicę obiektów reprezentujących zadania. Każde zadanie ma unikalne id, tytuł oraz status, który może wskazywać, czy zadanie jest zakończone, w trakcie realizacji, czy jeszcze nie rozpoczęte.

Tego rodzaju funkcja może być użyteczna w aplikacjach zarządzających zadaniami, gdzie chcesz uzyskać listę ukończonych zadań posortowaną według ich identyfikatorów. Na przykład, może to być użyteczne w systemie do śledzenia postępów w projektach, czy też w aplikacjach typu To-Do List, w których użytkownicy chcą szybko sprawdzić swoje zakończone zadania.
