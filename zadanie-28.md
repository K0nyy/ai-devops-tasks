Wyjaśnienie działania skryptu
Skrypt w Pythonie służy do komunikacji z Jenkins API, wykonując trzy główne operacje:

Listowanie zadań (jobs) – wyświetlanie dostępnych zadań na serwerze Jenkins.

Sprawdzanie statusu ostatnich buildów – pobieranie statusu ostatniego builda dla określonego zadania.

Uruchamianie wybranego zadania – wysyłanie żądania do Jenkins API w celu uruchomienia wybranego zadania.

Skrypt używa biblioteki requests, która pozwala na łatwą i wygodną komunikację z zewnętrznymi serwisami za pomocą HTTP. W tym przypadku skrypt wykorzystuje REST API Jenkinse, które jest dostępne poprzez protokół HTTP.

Wykorzystywane biblioteki
requests:

Biblioteka requests jest używana do wysyłania żądań HTTP (GET i POST) do serwera Jenkins. Dzięki niej możemy łatwo pobierać dane w formacie JSON, który jest odpowiedzią API, a także wysyłać żądania POST do uruchamiania zadań.

Funkcja requests.get służy do pobierania danych (np. listy zadań czy statusu buildów).

Funkcja requests.post służy do wywoływania zadań (np. uruchamiania builda).

Obsługuje również autoryzację HTTP Basic za pomocą HTTPBasicAuth, co pozwala na bezpieczne przekazywanie danych logowania.

requests.auth:

Używa klasy HTTPBasicAuth do dodania nagłówków autoryzacyjnych w zapytaniach HTTP. Umożliwia to bezpieczne przekazanie danych logowania (nazwa użytkownika i token API) do serwera Jenkins.

Jak działa skrypt?
Skrypt wykonuje następujące kroki:

Autoryzacja i konfiguracja:

Na początku w skrypcie należy ustawić zmienne JENKINS_URL, USER, i API_TOKEN, które zawierają:

JENKINS_URL – adres URL serwera Jenkins.

USER – login użytkownika na Jenkinsie.

API_TOKEN – token API wygenerowany w Jenkinsie (można go znaleźć w ustawieniach użytkownika w Jenkinsie).

Funkcja list_jobs():

Funkcja ta wysyła zapytanie GET do API, aby pobrać listę dostępnych zadań. Z odpowiedzi API (w formacie JSON) skrypt wyodrębnia nazwy zadań i wypisuje je na ekranie.

Funkcja get_last_build_status(job_name):

Funkcja ta sprawdza status ostatniego builda dla wybranego zadania (job_name). Wysyła zapytanie GET do API, które zwraca dane o ostatnim buildzie, w tym wynik (np. sukces, niepowodzenie).

Funkcja trigger_job(job_name):

Funkcja ta wysyła zapytanie POST, aby uruchomić build dla wybranego zadania (job_name). Jenkins API przyjmuje to zapytanie i uruchamia proces builda na serwerze.

Obsługa błędów:

Skrypt obsługuje błędy związane z komunikacją z serwerem Jenkins (np. brak połączenia, błąd autoryzacji, brak dostępu do zadań) za pomocą bloku try-except oraz funkcji response.raise_for_status(), która zgłasza wyjątek w przypadku odpowiedzi HTTP 4xx lub 5xx.
