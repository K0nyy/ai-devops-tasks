# Prosty skrypt do backupu bazy danych w PowerShell

$DB_NAME = "app_database"
$BACKUP_DIR = "C:\Backups\DB"
$DATE = Get-Date -Format "yyyyMMdd_HHmmss"
$FILENAME = "$BACKUP_DIR\$DB_NAME`_$DATE.sql.gz"

# Sprawdź, czy katalog istnieje, jeśli nie, utwórz go
if (-Not (Test-Path -Path $BACKUP_DIR)) {
    New-Item -ItemType Directory -Path $BACKUP_DIR
    Write-Host "Utworzono katalog $BACKUP_DIR"
}

# Wykonaj backup
Write-Host "Rozpoczynam backup bazy $DB_NAME..."
$mysqldumpPath = "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"  # Zaktualizuj ścieżkę do mysqldump
$mysqlArgs = "-u root -p$env:MYSQL_ROOT_PASSWORD $DB_NAME"

# Użyj mysqldump do wykonania backupu
try {
    # Uruchom mysqldump i zapisanie wyniku do pliku
    $mysqldumpProcess = Start-Process -FilePath $mysqldumpPath -ArgumentList $mysqlArgs -NoNewWindow -RedirectStandardOutput "$BACKUP_DIR\$DB_NAME`_$DATE.sql" -PassThru -Wait
    
    if ($mysqldumpProcess.ExitCode -eq 0) {
        # Kompresja pliku .sql do .gz
        Write-Host "Backup wykonany. Kompresuję plik..."
        $sqlFilePath = "$BACKUP_DIR\$DB_NAME`_$DATE.sql"
        $gzFilePath = "$FILENAME"
        & "C:\Program Files\7-Zip\7z.exe" a "$gzFilePath" "$sqlFilePath"  # Ścieżka do 7-Zip, zainstaluj go, jeśli jeszcze go nie masz
        
        # Usuń plik .sql po kompresji
        Remove-Item -Path $sqlFilePath
        
        Write-Host "Backup zakończony sukcesem: $FILENAME"
    } else {
        Write-Host "Błąd podczas wykonywania mysqldump!"
        exit 1
    }
} catch {
    Write-Host "Błąd podczas wykonywania backupu: $_"
    exit 1
}
