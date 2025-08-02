REM CD ..
git save "autosave %date%-%time:~0,8%"
REM IF NOT "%CD%" EQU "T:\$Nuvem\OneDrive\Estacio\!TCC-Estacio\01-artigo"  robocopy . "T:\$Nuvem\OneDrive\Estacio\!TCC-Estacio\01-artigo" /s /eta /z /w:2 /r:10 /mt:32 /PURGE >> log.txt

