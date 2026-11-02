@echo off
REM Starts the site locally at http://localhost:3000 and opens it in your browser.
REM Edits reload automatically. Press Ctrl+C to stop.
cd /d "%~dp0"

REM Check Node is installed and matches the version GitHub builds with (see .nvmrc)
where node >nul 2>nul || (
    echo Node.js is not installed. Get the LTS version from https://nodejs.org
    pause
    exit /b 1
)
set /p WANT=<.nvmrc
for /f "tokens=1 delims=." %%v in ('node -v') do set HAVE=%%v
set HAVE=%HAVE:v=%
if %HAVE% LSS %WANT% (
    echo.
    echo WARNING: You have Node %HAVE%, but the site is built with Node %WANT% on GitHub.
    echo          Install Node %WANT% LTS from https://nodejs.org to avoid surprises.
    echo.
)

if not exist node_modules (
    echo Installing dependencies...
    call npm ci || exit /b 1
)
set BROWSER=
call npm start
