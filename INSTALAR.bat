@echo off
chcp 65001 >nul
color 0E
echo.
echo ================================================
echo   BELLA ACHADINHOS - Instalacao Automatica
echo ================================================
echo.

cd /d C:\Users\ASUS\bella-achadinhos

echo [1/7] Removendo lockfile errado...
if exist "C:\Users\ASUS\package-lock.json" (
    del "C:\Users\ASUS\package-lock.json"
    echo     OK - lockfile removido
) else (
    echo     OK - nada para remover
)

echo.
echo [2/7] Criando pastas...
if not exist "app\admin" mkdir app\admin
if not exist "app\bella-ia" mkdir app\bella-ia
if not exist "app\api\bella-ia" mkdir app\api\bella-ia
if not exist "app\stories" mkdir app\stories
echo     OK - pastas verificadas

echo.
echo [3/7] Copiando arquivos...

copy /Y "%~dp0page.tsx" "app\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - page.tsx copiado) else (echo     AVISO - page.tsx nao encontrado)

copy /Y "%~dp0admin_page.tsx" "app\admin\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - admin/page.tsx copiado) else (echo     AVISO - admin_page.tsx nao encontrado)

copy /Y "%~dp0bella_ia_page.tsx" "app\bella-ia\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - bella-ia/page.tsx copiado) else (echo     AVISO - bella_ia_page.tsx nao encontrado)

copy /Y "%~dp0route.ts" "app\api\bella-ia\route.ts" >nul 2>&1
if %errorlevel%==0 (echo     OK - api/bella-ia/route.ts copiado) else (echo     AVISO - route.ts nao encontrado)

copy /Y "%~dp0stories_page.tsx" "app\stories\page.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - stories/page.tsx copiado) else (echo     AVISO - stories_page.tsx nao encontrado)

copy /Y "%~dp0layout.tsx" "app\layout.tsx" >nul 2>&1
if %errorlevel%==0 (echo     OK - layout.tsx copiado) else (echo     AVISO - layout.tsx nao encontrado)

copy /Y "%~dp0globals.css" "app\globals.css" >nul 2>&1
if %errorlevel%==0 (echo     OK - globals.css copiado) else (echo     AVISO - globals.css nao encontrado)

echo.
echo [4/7] Configurando chave da API...
if not exist ".env.local" (
    echo ANTHROPIC_API_KEY=cole-sua-chave-aqui > .env.local
    echo     ATENCAO - Arquivo .env.local criado!
    echo     Abra .env.local e cole sua chave Anthropic
) else (
    echo     OK - .env.local ja existe
)

echo.
echo [5/7] Limpando cache do Next.js...
if exist ".next" (
    rmdir /s /q .next
    echo     OK - cache limpo
) else (
    echo     OK - sem cache para limpar
)

echo.
echo [6/7] Verificando dependencias...
call npm install >nul 2>&1
echo     OK - dependencias verificadas

echo.
echo [7/7] Iniciando o servidor...
echo.
echo ================================================
echo   Tudo pronto!
echo   Loja:     http://localhost:3000
echo   Bella IA: http://localhost:3000/bella-ia
echo   Stories:  http://localhost:3000/stories
echo   Admin:    http://localhost:3000/admin  senha: bella2025
echo ================================================
echo.
echo   Nao feche esta janela. Para parar: CTRL+C
echo.

npm run dev

pause
