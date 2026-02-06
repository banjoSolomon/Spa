@echo off
echo Cleaning up old installation...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del /f package-lock.json

echo Clearing npm cache...
call npm cache clean --force

echo Installing dependencies...
call npm install --legacy-peer-deps

echo Installation complete!
echo You can now run: npm start
pause
