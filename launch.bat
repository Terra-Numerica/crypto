@echo off
echo Checking requirements...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://www.python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
)

REM Check if virtual environment exists
if not exist .venv (
    echo Creating virtual environment...
    python -m venv .venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
)

REM Activate virtual environment
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)

REM Check and install required packages
echo Installing required packages...

REM Install Django if not present
python -c "import django" >nul 2>&1
if errorlevel 1 (
    echo Installing Django...
    .venv\Scripts\pip install django
    if errorlevel 1 (
        echo ERROR: Failed to install Django
        pause
        exit /b 1
    )
)

REM Install numpy if not present
python -c "import numpy" >nul 2>&1
if errorlevel 1 (
    echo Installing numpy...
    .venv\Scripts\pip install numpy
    if errorlevel 1 (
        echo ERROR: Failed to install numpy
        pause
        exit /b 1
    )
)

REM Check if analyseFreq directory exists
if not exist analyseFreq (
    echo ERROR: analyseFreq directory not found
    echo Make sure you are in the correct project directory
    pause
    exit /b 1
)

REM Check if all project directories are present
if not exist decryptage (
    echo ERROR: decryptage directory not found
    echo Make sure you are in the correct project directory
    pause
    exit /b 1
)

if not exist enigma (
    echo ERROR: enigma directory not found
    echo Make sure you are in the correct project directory
    pause
    exit /b 1
)

REM Check if manage.py exists
if not exist manage.py (
    echo ERROR: manage.py not found
    echo Make sure you are in the correct project directory
    pause
    exit /b 1
)

REM Try to make migrations and migrate
echo Setting up database...
python manage.py makemigrations
if errorlevel 1 (
    echo WARNING: Failed to make migrations
    pause
)

python manage.py migrate
if errorlevel 1 (
    echo WARNING: Failed to apply migrations
    pause
)

echo All requirements are met!
echo Starting Django development server...
echo.
echo You can access the application at http://127.0.0.1:8000/
echo Press Ctrl+C to stop the server
echo.

python manage.py runserver

REM If the server is stopped, deactivate the virtual environment
call .venv\Scripts\deactivate.bat 