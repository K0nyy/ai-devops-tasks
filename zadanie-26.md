Co zostało poprawione:
steps w etapie Build – Literówka została poprawiona (było stesp, teraz jest steps).

Komenda npm run build – Zmieniono na npm run build, ponieważ npm build nie jest standardową komendą npm. Przyjęto, że masz w package.json odpowiedni skrypt build.

Zmieniono nazwę obrazu Docker – Warto określić pełną nazwę obrazu, np. myregistry/myapp:latest, co jest dobrym nawykiem w przypadku pracy z Dockerem w środowisku produkcyjnym.

Sekcja post – Dodano sekcję post, która może być użyteczna do wykonania czynności po zakończeniu pipeline, takich jak czyszczenie, raportowanie o błędach, powiadomienia itp.
