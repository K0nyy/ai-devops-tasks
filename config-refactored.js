function getEnvironmentConfig(env) {
  // Definicja konfiguracji dla poszczególnych środowisk
  const configMap = {
    development: {
      apiUrl: 'http://localhost:3000/api',
      debug: true,
      timeout: 5000
    },
    testing: {
      apiUrl: 'http://test-server:3000/api',
      debug: true,
      timeout: 5000
    },
    staging: {
      apiUrl: 'https://staging.example.com/api',
      debug: false,
      timeout: 10000
    },
    production: {
      apiUrl: 'https://api.example.com',
      debug: false,
      timeout: 15000
    }
  };

  // Normalizacja 'env' do małych liter i sprawdzenie, czy istnieje w configMap
  const normalizedEnv = (env || '').toLowerCase();

  // Zwrócenie odpowiedniej konfiguracji lub domyślnej, jeśli nie znaleziono
  return configMap[normalizedEnv] || configMap.development;
}
