services:
  web:
    image: nginx
    ports:
      - "80:80"
  app:
    build: .
    ports
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD=password
Poprawiony plik:

services:
  web:
    image: nginx
    ports:
      - "80:80"
  app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - db
  db:
    image: postgres
    environment:
      POSTGRES_PASSWORD: password
