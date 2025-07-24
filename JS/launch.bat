@echo off
echo Checking requirements...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Install dependencies if needed
if not exist node_modules (
    echo Installing dependencies...
    npm install
    if errorlevel 1 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Copy static assets
echo Copying static assets...
node copyAssets.js
if errorlevel 1 (
    echo ERROR: Failed to copy static assets
    pause
    exit /b 1
)

echo All requirements are met!
echo Starting Node.js server...
echo.
echo You can access the application at http://localhost:3000/
echo Press Ctrl+C to stop the server
echo.

node app.js 