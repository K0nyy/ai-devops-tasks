Jak rozwiązać problem z dużym zużyciem pamięci przez kontener Docker?

ChatGPT said:
Duże zużycie pamięci przez kontener Docker może wynikać z różnych przyczyn — od konfiguracji samego kontenera po błędy w aplikacji. Poniżej znajdziesz sprawdzone sposoby na rozpoznanie i ograniczenie zużycia pamięci przez kontener Docker.

🔍 KROK 1: Diagnoza problemu
1.1. Sprawdź zużycie pamięci kontenerów
bash
Copy
Edit
docker stats
Zobaczysz zużycie CPU, pamięci i sieci przez każdy kontener.

🛠 KROK 2: Ogranicz zasoby kontenera
Możesz ustawić limity pamięci i CPU podczas uruchamiania kontenera:

bash
Copy
Edit
docker run -m 512m --memory-swap 512m --cpus="1.0" my-node-app
-m 512m: maksymalna pamięć RAM (np. 512 MB)

--memory-swap: całkowity limit pamięci (RAM + SWAP)

--cpus: maksymalna liczba rdzeni CPU

⚙ KROK 3: Popraw działanie aplikacji Node.js
Node.js może zużywać dużo pamięci, szczególnie przy dużych danych. Spróbuj:

3.1. Ustaw limit pamięci aplikacji Node.js
Domyślnie Node może zużywać do 4 GB RAM (lub więcej na 64-bit systemach). Możesz to ograniczyć np. do 256 MB:

json
Copy
Edit
"start": "node --max-old-space-size=256 index.js"
Lub w CMD Dockera:

Dockerfile
Copy
Edit
CMD ["node", "--max-old-space-size=256", "index.js"]
3.2. Sprawdź, czy aplikacja nie ma wycieków pamięci (memory leaks)
Zwróć uwagę na:

nieskończone pętle

przetrzymywane duże obiekty w pamięci (np. cache, listy)

brak zamykania połączeń (np. z bazą danych)

Do analizy możesz użyć:

clinic

node --inspect i Chrome DevTools

📉 KROK 4: Użyj narzędzi do monitorowania
Zainstaluj i skonfiguruj:

Prometheus + Grafana

cAdvisor

Docker Desktop GUI (dla lokalnych testów)

🧽 BONUS: Odchudź obraz Dockera
Mniejsze obrazy = mniej pamięci w czasie uruchamiania.

Zamiast node:18, użyj:

Dockerfile
Copy
Edit
FROM node:18-alpine
To znacznie zmniejsza rozmiar obrazu (~80 MB zamiast 300+ MB).

Chcesz, żebym przeanalizował Twoją aplikację i pomógł znaleźć konkretne źródło wysokiego zużycia RAM? Wystarczy, że podasz więcej szczegółów (kod, logi, konfiguracja Dockera).


Jasne. Podejdźmy do tego tak, jak zrobiłby to doświadczony DevOps Engineer — metodycznie, z analizą źródła problemu, optymalizacją środowiska uruchomieniowego i aplikacji, a także z wykorzystaniem dobrych praktyk i narzędzi monitorujących.

🎯 CEL: Zredukować zużycie pamięci przez kontener Docker
🔍 1. Diagnoza problemu
1.1. Sprawdź aktualne zużycie zasobów
Uruchom:

bash
Copy
Edit
docker stats <container_name>
To da ci dane runtime: CPU %, Memory Usage, Network, Block I/O. Zwróć uwagę na kolumny:

Memory %: czy jest blisko 100%?

Mem Usage / Limit: ile dokładnie kontener zużywa?

1.2. Zbadaj historię użycia pamięci
Użyj cAdvisor lub Prometheus + Grafana, żeby uzyskać wykresy. Umożliwia to wykrycie np.:

stopniowego wzrostu (→ memory leak),

nagłych skoków (→ piki związane z konkretnymi akcjami).

⚙️ 2. Ogranicz zasoby przy uruchomieniu kontenera
Zabezpiecz hosta przed nadmiernym zużyciem zasobów przez pojedynczy kontener.

bash
Copy
Edit
docker run \
  -m 512m \
  --memory-swap 512m \
  --cpus="1.0" \
  --memory-reservation="256m" \
  --oom-kill-disable=false \
  my-node-app
-m 512m: twardy limit pamięci (kontener nie może przekroczyć).

--memory-swap: łączna pamięć RAM + SWAP. Ustaw tak samo jak -m, by całkowicie wyłączyć swap.

--memory-reservation: miękki limit, ostrzeżenie przed przekroczeniem.

--oom-kill-disable=false: pozwala kernelowi zabić procesy przy braku pamięci.

🧠 3. Zoptymalizuj aplikację Node.js
3.1. Ogranicz pamięć Node.js
Node domyślnie rezerwuje dużą ilość pamięci. Ustaw to jawnie:

json
Copy
Edit
"start": "node --max-old-space-size=256 index.js"
Lub:

Dockerfile
Copy
Edit
CMD ["node", "--max-old-space-size=256", "index.js"]
3.2. Sprawdź pod kątem memory leaków
Typowe przyczyny:

Nieszczyszczone timery / intervale (setInterval)

Globalne obiekty (np. global.myCache)

Otwarte połączenia do baz danych bez zamykania (pool.release())

Użyj:

bash
Copy
Edit
npm install --save-dev clinic
clinic doctor -- node index.js
albo:

bash
Copy
Edit
node --inspect index.js
→ i analizuj heap w Chrome DevTools.

🧱 4. Zoptymalizuj obraz Dockera
4.1. Użyj Alpine, jeśli możesz
Dockerfile
Copy
Edit
FROM node:18-alpine
Zamiast ~300 MB → ~80 MB. Zmniejszy to footprint uruchamiania kontenera.

4.2. Usuń zależności dev i cache
Dockerfile
Copy
Edit
RUN npm install --production && npm cache clean --force
4.3. Użyj wieloetapowego buildu
Jeśli budujesz TypeScript, Webpack, itp.

Dockerfile
Copy
Edit
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --production
CMD ["node", "dist/index.js"]
🛠️ 5. Monitoring i alerty
Zainstaluj:

Prometheus + Grafana – dashboardy dla CPU, RAM, I/O, logów.

cAdvisor – do monitoringu kontenerów.

ELK stack / Loki + Grafana – analiza logów w czasie rzeczywistym.

Stwórz alerty na:

80% memory usage

częste restarty (→ docker inspect <container> → .State.RestartCount)

✅ 6. Dobre praktyki i checklist
Punkt kontrolny	OK?
Ustawione limity --memory, --cpus?	✅
Obraz oparty na Alpine?	✅
--max-old-space-size ustawiony?	✅
Brak wycieków pamięci?	🔍
Używany npm ci i --production?	✅
Używany multistage Docker build?	✅
Monitoring CPU/MEM działa?	✅

📌 Podsumowanie
Duże zużycie pamięci kontenera rzadko jest przypadkiem. Najczęściej to:

nieograniczone zasoby kontenera,

nieoptymalna aplikacja (np. wycieki pamięci),

zbyt ciężki obraz Dockera.

🔧 Rozwiązanie = kombinacja:

limitów systemowych,

optymalizacji kodu,

dobrych praktyk Dockera,

monitoringu i automatycznych alertów.

Jeśli chcesz, mogę przeanalizować konkretny Dockerfile, package.json albo fragment kodu Node.js, który podejrzewasz o wyciek.
