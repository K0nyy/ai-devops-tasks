Aby skonfigurować Jenkins z użyciem pliku Configuration as Code (JCasC) na systemie Windows, postępuj zgodnie z poniższymi krokami. Obejmuje to instalację Jenkinsa, instalację wtyczki JCasC oraz ustawienie pliku konfiguracyjnego YAML.

1. Instalacja Jenkinsa na systemie Windows
Krok 1: Pobranie i instalacja Jenkinsa
Pobierz Jenkinsa: Wejdź na stronę Jenkins download i pobierz instalator dla systemu Windows (.msi).

Zainstaluj Jenkinsa:

Uruchom pobrany instalator .msi i postępuj zgodnie z instrukcjami.

Zostanie zainstalowany serwer Jenkins oraz uruchomiony jako usługa Windows.

Uruchomienie Jenkinsa:

Po zakończeniu instalacji, Jenkins zostanie uruchomiony automatycznie. Jeśli nie, możesz go uruchomić poprzez Jenkins service lub otworzyć przeglądarkę i przejść pod adres: http://localhost:8080.

Pierwsze uruchomienie Jenkinsa:

Po uruchomieniu Jenkinsa, pojawi się strona z prośbą o wprowadzenie klucza odblokowującego.

Aby go uzyskać, otwórz plik secrets/initialAdminPassword w katalogu, w którym zainstalowano Jenkinsa (np. C:\Program Files (x86)\Jenkins\secrets\initialAdminPassword).

Wprowadź ten klucz w oknie Jenkinsa.

Zainstaluj zalecane wtyczki podczas pierwszej konfiguracji Jenkinsa.

Krok 2: Uruchomienie Jenkinsa
Po zakończeniu konfiguracji będziesz mógł uzyskać dostęp do Jenkinsa poprzez przeglądarkę pod adresem http://localhost:8080.

2. Instalacja wtyczki Jenkins Configuration as Code (JCasC)
Zaloguj się do Jenkinsa (jeśli jeszcze tego nie zrobiłeś).

Przejdź do "Zarządzaj Jenkins" (Manage Jenkins):

Kliknij w menu głównym Jenkins, a następnie wybierz "Zarządzaj Jenkins" (Manage Jenkins).

Zarządzaj wtyczkami (Manage Plugins):

Przejdź do zakładki "Dostępne" (Available).

Wyszukaj wtyczkę "Configuration as Code" (JCasC).

Zaznacz ją i kliknij "Zainstaluj bez ponownego uruchamiania" (Install without restart).

Po zainstalowaniu wtyczki, Jenkins będzie gotowy do używania plików YAML do konfiguracji.

3. Konfiguracja Jenkinsa za pomocą pliku YAML
Krok 1: Przygotowanie pliku YAML
Stwórz plik YAML z konfiguracją, np. jenkins_config.yaml, który będzie zawierał ustawienia opisane w poprzednim poście. Plik może wyglądać tak, jak podałem wcześniej (np. z ustawieniami wykonawców, narzędziami, wtyczkami i zadaniem pipeline).

Krok 2: Ustawienie pliku YAML w Jenkinsie
Lokalizacja pliku konfiguracyjnego:

Na systemie Windows zaleca się, aby plik YAML znajdował się w katalogu C:\Program Files (x86)\Jenkins\jenkins.yaml, ale możesz również użyć innej lokalizacji (np. na dysku D).

Zdefiniowanie lokalizacji pliku w Jenkinsie:

Przejdź do Zarządzaj Jenkins (Manage Jenkins).

Wybierz "Konfiguracja jako kod" (Configuration as Code).

W polu "Plik konfiguracji" (Configuration File) wskaż pełną ścieżkę do pliku YAML. Na przykład:

Jeśli plik znajduje się w C:\Program Files (x86)\Jenkins\jenkins.yaml, wpisz tę ścieżkę w odpowiednim polu.

Zastosowanie konfiguracji:

Kliknij "Zastosuj" (Apply), aby załadować konfigurację z pliku YAML.

Krok 3: Uruchomienie Jenkinsa z konfiguracją
Po załadowaniu pliku konfiguracyjnego Jenkins automatycznie zastosuje wszystkie ustawienia zdefiniowane w pliku YAML, takie jak liczba wykonawców, konfiguracja narzędzi, wtyczki i zadania pipeline.

Aby sprawdzić, czy konfiguracja działa:

Sprawdź, czy wtyczki zostały zainstalowane:

Przejdź do "Zarządzaj Jenkins" > "Zarządzaj wtyczkami" i upewnij się, że wtyczki, które zostały zadeklarowane w pliku YAML, zostały zainstalowane.

Sprawdź zadanie pipeline:

Przejdź do sekcji "Zadania" (Jobs) w Jenkinsie.

Sprawdź, czy zadanie example-pipeline jest widoczne i uruchom je, aby upewnić się, że działa zgodnie z oczekiwaniami.

4. Utrzymywanie konfiguracji
Po załadowaniu pliku YAML, każda zmiana w konfiguracji powinna być dokonana w tym pliku. Możesz edytować plik YAML i ponownie załadować konfigurację w Jenkinsie, klikając "Zastosuj" w sekcji "Konfiguracja jako kod".
