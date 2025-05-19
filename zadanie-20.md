🔍 Testowanie na przykładach:
Adres IP	Wynik	Wyjaśnienie
192.168.1.1	✅ Tak	Poprawny adres IPv4
0.0.0.0	✅ Tak	Wszystkie zera są akceptowalne
255.255.255.255	✅ Tak	Najwyższy możliwy adres IPv4
256.0.0.1	❌ Nie	256 przekracza dopuszczalną wartość
192.168.1	❌ Nie	Brakuje jednego oktetu
192.168.1.1.1	❌ Nie	Za dużo oktetów
01.1.1.1	❌ Nie	Oktet 01 ma wiodące zero (niepoprawne)
123.045.067.089	❌ Nie	Oktety z wiodącym zerem są niepoprawne
