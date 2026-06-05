@echo off
chcp 65001 >nul
color 0A
echo.
echo ================================================
echo   BELLA ACHADINHOS - Publicar Online
echo ================================================
echo.

cd /d C:\Users\ASUS\bella-achadinhos

echo [1/6] Instalando dependencias...
call npm install >nul 2>&1
echo     OK

echo.
echo [2/6] Limpando cache...
if exist ".next" rmdir /s /q .next
echo     OK

echo.
echo [3/6] Copiando arquivos atualizados...
if not exist "app\lib" mkdir app\lib
if not exist "app\admin" mkdir app\admin
if not exist "app\bella-ia" mkdir app\bella-ia
if not exist "app\api\bella-ia" mkdir app\api\bella-ia
if not exist "app\stories" mkdir app\stories

copy /Y "%~dp0page.tsx" "app\page.tsx" >nul 2>&1
copy /Y "%~dp0admin_page.tsx" "app\admin\page.tsx" >nul 2>&1
copy /Y "%~dp0bella_ia_page.tsx" "app\bella-ia\page.tsx" >nul 2>&1
copy /Y "%~dp0route.ts" "app\api\bella-ia\route.ts" >nul 2>&1
copy /Y "%~dp0stories_page.tsx" "app\stories\page.tsx" >nul 2>&1
copy /Y "%~dp0lib\supabase.ts" "app\lib\supabase.ts" >nul 2>&1
copy /Y "%~dp0layout.tsx" "app\layout.tsx" >nul 2>&1
copy /Y "%~dp0globals.css" "app\globals.css" >nul 2>&1
copy /Y "%~dp0migrar_produtos.html" "public\migrar_produtos.html" >nul 2>&1
echo     OK

echo.
echo [4/6] Configurando variaveis de ambiente...
echo NEXT_PUBLIC_SUPABASE_URL=https://egvdnmyclemijwwqbaar.supabase.co > .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVndmRubXljbGVtaWp3d3FiYWFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkzNzQ0NTgsImV4cCI6MjA5NDk1MDQ1OH0.WVJnxXJki80IeGWikrkLrHVIGPgrIluQVZHnH4uysbs >> .env.local
echo ANTHROPIC_API_KEY=cole-sua-chave-aqui >> .env.local
echo     OK

echo.
echo [5/6] Enviando para GitHub e Vercel...
git add .
git commit -m "Bella Achadinhos - Supabase integrado"
git push https://fernandogimenes25@github.com/fernandogimenes25/bella-achadinhos.git master
echo     OK - Site sera atualizado na Vercel automaticamente!

echo.
echo [6/6] Iniciando servidor local...
echo.
echo ================================================
echo   PROXIMO PASSO IMPORTANTE:
echo   1. Acesse http://localhost:3000/migrar_produtos.html
echo   2. Clique em "Migrar Produtos Agora"
echo   3. Aguarde todos os produtos migrarem
echo   4. Pronto! Site online com seus produtos!
echo.
echo   Loja local:  http://localhost:3000
echo   Loja online: https://bella-achadinhos.vercel.app
echo   Admin:       http://localhost:3000/admin
echo   Senha:       bella2025
echo ================================================
echo.

npm run dev
pause
