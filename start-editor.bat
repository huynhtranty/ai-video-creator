@echo off
echo ======================================
echo   AI Video Creator - Editor Startup
echo ======================================
echo.

echo [1/2] Starting Frontend Editor (Port 5173)...
cd frontend-editor
start "Editor" cmd /k "npm run dev"
echo     ✅ Editor starting at http://localhost:5173
echo.

echo [2/2] Starting Main Frontend (Port 3000)...
cd ../frontend
start "Main App" cmd /k "npm run dev"
echo     ✅ Main app starting at http://localhost:3000
echo.

echo ======================================
echo   🚀 Both applications are starting!
echo ======================================
echo.
echo   📝 Usage Instructions:
echo   1. Wait for both servers to fully start
echo   2. Open http://localhost:3000 (main app)
echo   3. Create or edit a project
echo   4. Click "Sửa video" button
echo   5. Editor will open automatically
echo.
echo   🔧 Troubleshooting:
echo   - Make sure ports 3000 and 5173 are free
echo   - Check console logs in both windows
echo   - Allow popups for localhost:3000
echo.
pause