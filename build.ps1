$css = [System.IO.File]::ReadAllText("css/style.css")
$js  = [System.IO.File]::ReadAllText("js/app.js")
$html = [System.IO.File]::ReadAllText("index.html")
$html = $html.Replace('<link rel="stylesheet" href="css/style.css">', "<style>$css</style>")
$html = $html.Replace('<script src="js/app.js"></script>', "<script>$js</script>")
$outPath = Join-Path (Get-Location) "index_mobile.html"
[System.IO.File]::WriteAllText($outPath, $html, [System.Text.Encoding]::UTF8)
Write-Host "Done"
