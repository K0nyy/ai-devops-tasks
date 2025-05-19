import requests
from requests.auth import HTTPBasicAuth
import json

# Konfiguracja: URL Jenkins, dane autoryzacyjne
JENKINS_URL = "http://your-jenkins-url"  # Zmień na adres swojego serwera Jenkins
USER = "your-username"  # Zmień na swój login Jenkins
API_TOKEN = "your-api-token"  # Zmień na swój token API lub hasło

# Funkcja do listowania wszystkich zadań (jobs)
def list_jobs():
    url = f"{JENKINS_URL}/api/json?tree=jobs[name]"
    try:
        response = requests.get(url, auth=HTTPBasicAuth(USER, API_TOKEN))
        response.raise_for_status()
        jobs = response.json()['jobs']
        print("Lista zadań:")
        for job in jobs:
            print(f"- {job['name']}")
    except requests.exceptions.RequestException as e:
        print(f"Błąd przy pobieraniu listy zadań: {e}")

# Funkcja do sprawdzania statusu ostatniego builda zadania
def get_last_build_status(job_name):
    url = f"{JENKINS_URL}/job/{job_name}/lastBuild/api/json"
    try:
        response = requests.get(url, auth=HTTPBasicAuth(USER, API_TOKEN))
        response.raise_for_status()
        build_info = response.json()
        status = build_info.get('result', 'brak wyniku')
        print(f"Status ostatniego builda zadania '{job_name}': {status}")
    except requests.exceptions.RequestException as e:
        print(f"Błąd przy pobieraniu statusu builda: {e}")

# Funkcja do uruchamiania wybranego zadania
def trigger_job(job_name):
    url = f"{JENKINS_URL}/job/{job_name}/build"
    try:
        response = requests.post(url, auth=HTTPBasicAuth(USER, API_TOKEN))
        response.raise_for_status()
        print(f"Zadanie '{job_name}' zostało uruchomione.")
    except requests.exceptions.RequestException as e:
        print(f"Błąd przy uruchamianiu zadania: {e}")

if __name__ == "__main__":
    # Przykładowe użycie funkcji
    list_jobs()  # Wyświetli listę wszystkich zadań
    job_name = "example-job"  # Zmień na nazwę istniejącego zadania w Jenkinsie
    get_last_build_status(job_name)  # Sprawdzi status ostatniego builda
    trigger_job(job_name)  # Uruchomi zadanie
