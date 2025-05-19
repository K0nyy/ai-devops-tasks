#!/bin/bash

# Sprawdzamy, czy usługa Docker jest aktywna
if ! systemctl is-active --quiet docker; then
    echo "Usługa Docker nie jest uruchomiona. Próba uruchomienia..."
    # Próbujemy uruchomić usługę Docker
    sudo systemctl start docker
    
    # Sprawdzamy ponownie, czy usługa Docker działa
    if systemctl is-active --quiet docker; then
        echo "Usługa Docker została pomyślnie uruchomiona."
    else
        echo "Nie udało się uruchomić usługi Docker."
    fi
else
    echo "Usługa Docker jest już uruchomiona."
fi
