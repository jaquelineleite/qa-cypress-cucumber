param(
  [string]$OutputPath = "cypress/evidencias/captura-chrome.png"
)

Add-Type -AssemblyName System.Drawing

Add-Type @"
using System;
using System.Runtime.InteropServices;

public class Win32 {
    [DllImport("user32.dll")]
    public static extern bool GetWindowRect(
        IntPtr hWnd,
        out RECT lpRect
    );

    public struct RECT {
        public int Left;
        public int Top;
        public int Right;
        public int Bottom;
    }
}
"@

try {
    $chromeProcess = Get-Process chrome -ErrorAction Stop |
        Where-Object { $_.MainWindowHandle -ne 0 } |
        Select-Object -First 1

    if (-not $chromeProcess) {
        throw "Nenhuma janela visível do Google Chrome foi encontrada."
    }

    $rect = New-Object Win32+RECT

    $resultado = [Win32]::GetWindowRect(
        $chromeProcess.MainWindowHandle,
        [ref]$rect
    )

    if (-not $resultado) {
        throw "Não foi possível obter as dimensões da janela do Chrome."
    }

    $width = $rect.Right - $rect.Left
    $height = $rect.Bottom - $rect.Top

    if ($width -le 0 -or $height -le 0) {
        throw "Dimensões inválidas para a janela do Chrome."
    }

    $outputFullPath = [System.IO.Path]::GetFullPath($OutputPath)
    $outputDirectory = Split-Path -Parent $outputFullPath

    if (-not (Test-Path $outputDirectory)) {
        New-Item `
          -ItemType Directory `
          -Path $outputDirectory `
          -Force |
          Out-Null
    }

    $bitmap = New-Object System.Drawing.Bitmap(
        $width,
        $height
    )

    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

    $graphics.CopyFromScreen(
        $rect.Left,
        $rect.Top,
        0,
        0,
        $bitmap.Size
    )

    $bitmap.Save(
        $outputFullPath,
        [System.Drawing.Imaging.ImageFormat]::Png
    )

    $graphics.Dispose()
    $bitmap.Dispose()

    Write-Host "Captura da janela do Chrome gerada em: $outputFullPath"

    exit 0
}
catch {
    Write-Error "Falha ao capturar a janela do Chrome: $($_.Exception.Message)"

    exit 1
}