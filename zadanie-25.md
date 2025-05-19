1. Agent
groovy
Kopiuj
Edytuj
agent any
Co się dzieje?: Określamy, na jakim agencie (maszynie lub środowisku) ma działać pipeline. any oznacza, że pipeline może działać na dowolnym dostępnym agencie w Jenkinsie. W produkcyjnych środowiskach warto określić konkretny agent lub etykietę agenta, aby zapewnić, że pipeline uruchomi się w odpowiednim środowisku (np. agent z zainstalowanym Dockerem).

Najlepsze praktyki:

Jeśli masz różne środowiska (np. dla testów, produkcji), warto określić, na jakim agencie ma działać pipeline (np. agent { label 'docker-nodejs-agent' }).

Zdefiniowanie dedykowanych agentów pozwala na lepszą kontrolę nad zasobami i zależnościami.

2. Environment
groovy
Kopiuj
Edytuj
environment {
    DOCKER_IMAGE = "my-app"
    DOCKER_REGISTRY = "my-docker-registry"
    DOCKER_TAG = "latest"
}
Co się dzieje?: Definiujemy zmienne środowiskowe, które będą używane w całym pipeline. Te zmienne mogą zawierać dane konfiguracyjne, takie jak nazwa obrazu Docker (DOCKER_IMAGE), adres rejestru Docker (DOCKER_REGISTRY) i tag obrazu (DOCKER_TAG).

Najlepsze praktyki:

Używaj zmiennych środowiskowych, aby utrzymać konfigurację w jednym miejscu, co ułatwia zarządzanie i modyfikowanie pipeline'u w przyszłości.

Trzymaj dane wrażliwe (np. hasła) w Jenkins Credentials Store, aby uniknąć ich twardego kodowania w Jenkinsfile.

3. Stage: Checkout
groovy
Kopiuj
Edytuj
stage('Checkout') {
    steps {
        git 'https://github.com/your-repo/my-app.git'
    }
}
Co się dzieje?: Ten etap pobiera kod z repozytorium Git za pomocą komendy git. W tym przypadku repozytorium jest publiczne, ale można dodać autentykację, jeśli repozytorium jest prywatne.

Najlepsze praktyki:

Używaj git lub innych systemów kontroli wersji (np. checkout scm), aby zapewnić, że pipeline zawsze używa najnowszej wersji kodu.

W przypadku większych repozytoriów lub dużych baz danych, rozważ użycie parametrów (np. gałęzi lub tagów), aby zminimalizować czas oczekiwania na pobranie kodu.

4. Stage: Install Dependencies
groovy
Kopiuj
Edytuj
stage('Install Dependencies') {
    steps {
        script {
            sh 'npm install'
        }
    }
}
Co się dzieje?: W tym etapie uruchamiane jest polecenie npm install, które instaluje wszystkie zależności aplikacji Node.js. Używamy polecenia sh, ponieważ Jenkins na ogół uruchamia procesy na maszynach Linuxowych lub na agentach opartych na systemach Unixowych.

Najlepsze praktyki:

Zawsze instaluj zależności w osobnym etapie, aby zapewnić, że środowisko jest aktualne, a proces budowania zawsze jest czysty.

Rozważ dodanie mechanizmu cachowania (np. npm ci dla większej szybkości i pewności w środowisku CI).

5. Stage: Run Tests
groovy
Kopiuj
Edytuj
stage('Run Tests') {
    steps {
        script {
            sh 'npm test'
        }
    }
}
Co się dzieje?: Uruchamiamy testy aplikacji za pomocą npm test. Testy mogą obejmować testy jednostkowe, integracyjne lub inne sprawdzające działanie aplikacji.

Najlepsze praktyki:

Wykonuj testy zawsze po zainstalowaniu zależności, aby upewnić się, że kod działa poprawnie przed dalszymi krokami.

Zapewnij, że testy są niezawodne (tzn. nie są zależne od zewnętrznych zasobów) i mają dobre pokrycie.

W przypadku dużych projektów, rób testy równolegle, jeśli to możliwe, aby przyspieszyć czas budowania.

6. Stage: Build Application
groovy
Kopiuj
Edytuj
stage('Build Application') {
    steps {
        script {
            sh 'npm run build'
        }
    }
}
Co się dzieje?: Budujemy aplikację przy użyciu komendy npm run build. Jest to etap, w którym aplikacja może zostać skompilowana, zbudowana lub przygotowana do wdrożenia.

Najlepsze praktyki:

Jeśli Twoja aplikacja wymaga kompilacji lub budowy, zawsze uruchamiaj ten etap przed procesem tworzenia obrazu Docker.

Rozważ zastosowanie dedykowanego środowiska dla budowy (np. z użyciem Docker-a), aby mieć pełną kontrolę nad wersjami narzędzi.

7. Stage: Build Docker Image
groovy
Kopiuj
Edytuj
stage('Build Docker Image') {
    steps {
        script {
            sh "docker build -t ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG} ."
        }
    }
}
Co się dzieje?: Tworzymy obraz Docker za pomocą komendy docker build. Określamy tag obrazu, co pozwala później na łatwą identyfikację wersji obrazu w rejestrze.

Najlepsze praktyki:

Używaj tagów, aby śledzić różne wersje obrazu Docker, np. latest, v1.0, build-${BUILD_NUMBER} itp.

Rozważ optymalizację Dockerfile, aby zbudować obraz szybko i efektywnie (np. przez odpowiednie buforowanie warstw Docker).

8. Stage: Publish Docker Image
groovy
Kopiuj
Edytuj
stage('Publish Docker Image') {
    steps {
        script {
            withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                sh "echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin ${DOCKER_REGISTRY}"
            }
            sh "docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE}:${DOCKER_TAG}"
        }
    }
}
Co się dzieje?: Logujemy się do rejestru Docker za pomocą docker login, a następnie wypychamy obraz do rejestru przy użyciu komendy docker push.

Najlepsze praktyki:

Przechowuj dane logowania (np. użytkownik, hasło) w Jenkins Credentials Store, a nie twardo kodując je w Jenkinsfile.

Zabezpiecz proces logowania, używając withCredentials i zmiennych środowiskowych do autentykacji.

Wypychaj obrazy tylko po pomyślnym zakończeniu poprzednich etapów (np. testów).

9. Post
groovy
Kopiuj
Edytuj
post {
    success {
        echo 'Build and publish Docker image succeeded!'
    }
    failure {
        echo 'Build or publish Docker image failed.'
    }
}
Co się dzieje?: Po zakończeniu pipeline'a, w zależności od wyniku (sukces lub porażka), wyświetlane są odpowiednie komunikaty.

Najlepsze praktyki:

Zawsze dodawaj etapy post do raportowania wyników. Umożliwia to informowanie zespołu o powodzeniu lub niepowodzeniu procesu.

Możesz dodać dodatkowe kroki do sprzątania zasobów lub wysyłania powiadomień (np. na Slacka).

Ogólne najlepsze praktyki przy tworzeniu pipeline'ów Jenkins:
Modularność: Podziel pipeline na etapy, aby każdy etap był odpowiedzialny za konkretną część procesu (np. checkout, build, test).

Zarządzanie błędami: Zawsze obsługuj błędy i dodawaj odpowiednie kroki w sekcji post do informowania zespołu o wynikach.

Bezpieczeństwo: Używaj Jenkins Credentials Store do przechowywania danych logowania, tokenów API i innych wrażliwych informacji.

Optymalizacja: Jeśli pipeline staje się wolny, przemyśl równoległe uruchamianie zadań (np. testów) lub caching, aby skrócić czas budowania.

To wszystko pozwala na stworzenie stabilnego i wydajnego pipeline'u, który ułatwia automatyzację procesów CI/CD.
