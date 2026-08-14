param(
  [string]$OutputPath = "cypress/evidencias/captura-chrome.png"
)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

try {
  $chromeProcess = Get-Process chrome -ErrorAction Stop |
    Where-Object { $_.MainWindowHandle -ne 0 } |
    Select-Object -First 1

  if (-not $chromeProcess) {
    throw "Nenhuma janela visível do Google Chrome foi encontrada."
  }

  $outputFullPath = [System.IO.Path]::GetFullPath($OutputPath)
  $outputDirectory = Split-Path -Parent $outputFullPath

  if (-not (Test-Path $outputDirectory)) {
    New-Item -ItemType Directory -Path $outputDirectory -Force | Out-Null
  }

  $screenBounds = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds

  $bitmap = New-Object System.Drawing.Bitmap(
    $screenBounds.Width,
    $screenBounds.Height
  )

  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

  $graphics.CopyFromScreen(
    $screenBounds.Location,
    [System.Drawing.Point]::Empty,
    $screenBounds.Size
  )

  $bitmap.Save(
    $outputFullPath,
    [System.Drawing.Imaging.ImageFormat]::Png
  )

  $graphics.Dispose()
  $bitmap.Dispose()

  Write-Host "Captura gerada em: $outputFullPath"
  exit 0
}
catch {
  Write-Error "Falha ao capturar a janela do Chrome: $($_.Exception.Message)"
  exit 1
}