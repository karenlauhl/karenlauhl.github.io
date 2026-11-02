@echo off
REM Wrapper so you can type  .\ship "message"  without changing PowerShell's execution policy.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0ship.ps1" -Message "%~1"
