$css  = [System.IO.File]::ReadAllText("css/style.css")
$js   = [System.IO.File]::ReadAllText("js/app.js")
$html = [System.IO.File]::ReadAllText("index.html")
$html = $html.Replace('<link rel="stylesheet" href="css/style.css">', "<style>$css</style>")
$html = $html.Replace('<script src="js/app.js"></script>', "<script>$js</script>")
$out  = Join-Path (Get-Location) "index.html"
[System.IO.File]::WriteAllText($out, $html, [System.Text.Encoding]::UTF8)
Write-Host "Merged into index.html"
