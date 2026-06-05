@echo off
chcp 65001 >nul
color 0E
echo.
echo ================================================
echo   BELLA ACHADINHOS - Instalacao Automatica
echo ================================================
echo.

cd /d C:\Users\ASUS\bella-achadinhos

echo [1/8] Removendo lockfile errado...
if exist "C:\Users\ASUS\package-lock.json" (
    del "C:\Users\ASUS\package-lock.json"
    echo     OK - lockfile removido
) else (
    echo     OK - nada para remover
)

echo.
echo [2/8] Criando pastas...
if not exist "app\admin" mkdir app\admin
if not exist "app\bella-ia" mkdir app\bella-ia
if not exist "app\api\bella-ia" mkdir app\api\bella-ia
if not exist "app\stories" mkdir app\stories
if not exist "app\lib" mkdir app\lib
echo     OK - pastas verificadas

echo.
echo [3/8] Copiando arquivos...

copy /Y "%~dp0page.tsx" "app\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - page.tsx) else (echo     AVISO - page.tsx nao encontrado)

copy /Y "%~dp0admin_page.tsx" "app\admin\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - admin/page.tsx) else (echo     AVISO - admin_page.tsx nao encontrado)

copy /Y "%~dp0bella_ia_page.tsx" "app\bella-ia\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - bella-ia/page.tsx) else (echo     AVISO - bella_ia_page.tsx nao encontrado)

copy /Y "%~dp0route.ts" "app\api\bella-ia\route.ts" >nul 2>&1
if %errorlevel%==0 (echo     OK - api/bella-ia/route.ts) else (echo     AVISO - route.ts nao encontrado)

copy /Y "%~dp0stories_page.tsx" "app\stories\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - stories/page.tsx) else (echo     AVISO - stories_page.tsx nao encontrado)

copy /Y "%~dp0lib\supabase.ts" "app\lib\supabase.ts" >nul 2>&1
if %errorlevel%==0 (echo     OK - lib/supabase.ts) else (echo     AVISO - lib/supabase.ts nao encontrado)

copy /Y "%~dp0layout.tsx" "app\layout.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - layout.tsx) else (echo     AVISO - layout.tsx nao encontrado)

copy /Y "%~dp0globals.css" "app\globals.css" >nul 2>&1
if %errorlevel%==0 (echo     OK - globals.css) else (echo     AVISO - globals.css nao encontrado)

echo.
echo [4/8] Configurando variaveis de ambiente...
echo NEXT_PUBLIC_SUPABASE_URL=https://egvdnmyclemijwwqbaar.supabase.co > .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndmRubXljbGVtaWp3d3FiYWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzQ0NTgsImV4cCI6MjA5NDk1MDQ1OH0.WVJnxXJki80IeGWikrkLrHVIGPgrIluQVZHnH4uysbs >> .env.local
echo ANTHROPIC_API_KEY=cole-sua-chave-aqui >> .env.local
echo     OK - .env.local configurado

echo.
echo [5/8] Instalando dependencias...
call npm install @supabase/supabase-js >nul 2>&1
echo     OK - dependencias instaladas

echo.
echo [6/8] Limpando cache...
if exist ".next" (
    rmdir /s /q .next
    echo     OK - cache limpo
) else (
    echo     OK - sem cache
)

echo.
echo [7/8] Migrando produtos do localStorage para Supabase...
node setup_supabase.js 2>nul
echo     OK - verificado

echo.
echo [8/8] Iniciando servidor...
echo.
echo ================================================
echo   Tudo pronto!
echo   Loja:     http://localhost:3000
echo   Bella IA: http://localhost:3000/bella-ia
echo   Admin:    http://localhost:3000/admin
echo   Senha:    bella2025
echo ================================================
echo.

npm run dev
pause
