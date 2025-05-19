Złożoność czasowa i pamięciowa algorytmu, który używa Set do znalezienia par sumujących się do określonej wartości, jest następująca:

Złożoność czasowa:
Czasowa: 

O(n), gdzie 

n to liczba elementów w tablicy arr.

Algorytm przetwarza każdy element tablicy tylko raz, wykonując operacje w czasie stałym (dodanie do Set i sprawdzenie obecności elementu w Set).

Zatem, cała pętla wykonuje się w czasie 

O(n).

Złożoność pamięciowa:
Pamięciowa: 

O(n), ponieważ przechowujemy elementy w zbiorze seen, który w najgorszym przypadku przechowa wszystkie elementy z tablicy arr (gdy żadne elementy nie będą się sumowały do targetSum).

W najgorszym przypadku musimy przechować w pamięci wszystkie 
n elementów tablicy.

Czy można to zoptymalizować?
Złożoność czasowa: Algorytm już jest zoptymalizowany do 

O(n), co jest najlepszym możliwym wynikiem dla tego typu problemu. Można by ewentualnie zrealizować różne warianty tego algorytmu (np. z różnymi strukturami danych), ale żaden z nich nie poprawi znacząco złożoności czasowej poniżej 

O(n), ponieważ w najgorszym przypadku musimy sprawdzić każdy element w tablicy.

Złożoność pamięciowa: Złożoność pamięciowa wynosząca 

O(n) jest już optymalna w tym przypadku, ponieważ musimy przechować przynajmniej część danych, aby porównać je z resztą tablicy. Można by próbować różnych struktur danych, np. Map, ale w kontekście tego problemu nie poprawi to złożoności pamięciowej.

Potencjalne poprawki:
Chociaż algorytm już jest optymalny pod względem złożoności czasowej i pamięciowej, istnieją pewne aspekty, które mogą być poprawione w sensie czytelności lub efektywności w określonych przypadkach, np.:

Przyspieszenie operacji sprawdzania w Set: Jeśli tablica jest bardzo duża, można by zastosować techniki rozpraszania w Set, aby przyspieszyć operacje sprawdzania i dodawania. Ale w praktyce nie zmienia to asymptotycznej złożoności.
