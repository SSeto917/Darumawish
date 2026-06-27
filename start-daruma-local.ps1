$here = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $here

$python = "C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe"
$port = 8765

Start-Process -FilePath $python -ArgumentList "-m", "http.server", $port -WorkingDirectory $here -WindowStyle Hidden
Start-Process "http://localhost:$port/daruma-wishes.html"
