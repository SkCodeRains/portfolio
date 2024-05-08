@echo off
 

rmdir /s /q "docs"
REM Define source and destination directories
set "source_dir=dist\portfolio\browser"
set "destination_dir=docs"

REM Create destination directory if it doesn't exist
if not exist "%destination_dir%" mkdir "%destination_dir%"

REM Move files from source to destination
move /Y "%source_dir%\*" "%destination_dir%"

REM Delete the dist folder
rmdir /s /q "dist"
