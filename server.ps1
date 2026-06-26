# CollabNet Local Dev Server (PowerShell Edition)
# Runs natively on Windows without requiring Node.js or Python

$port = 3000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    Write-Error "Failed to start listener on port $port. Check if port is already in use."
    exit 1
}

Write-Host "`n==============================================" -ForegroundColor Cyan
Write-Host "  CollabNet PowerShell Dev Server Running!    " -ForegroundColor Green
Write-Host "  Local URL: http://localhost:$port" -ForegroundColor Green
Write-Host "  Press Ctrl+C to terminate the server." -ForegroundColor Yellow
Write-Host "==============================================`n" -ForegroundColor Cyan

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "text/javascript; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

$currentDir = Get-Location

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }

        # Normalize path
        $cleanPath = $urlPath.Replace("/", "\").TrimStart("\")
        $filePath = Join-Path $currentDir $cleanPath

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = $mimeTypes[$ext]
            if ($null -eq $mime) {
                $mime = "application/octet-stream"
            }

            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            $response.ContentType = $mime
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "Served (200): $urlPath" -ForegroundColor Gray
        } else {
            $response.StatusCode = 404
            $buffer = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentType = "text/plain"
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            Write-Host "Not Found (404): $urlPath" -ForegroundColor Red
        }
        $response.Close()
    }
} catch [System.Management.Automation.PipelineStoppedException] {
    # Expected when user cancels
} finally {
    $listener.Stop()
    Write-Host "Server stopped." -ForegroundColor Yellow
}
