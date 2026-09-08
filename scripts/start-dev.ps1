$ErrorActionPreference = "Stop"

Set-Location $PSScriptRoot/..

if (-not (Test-Path ".env")) {
  Copy-Item ".env.example" ".env"
}

if (-not (Test-Path "server/.env")) {
  Copy-Item "server/.env.example" "server/.env"
}

if (-not (Test-Path "client/.env.local")) {
  Copy-Item "client/.env.example" "client/.env.local"
}

npm install

docker compose up -d mongodb
npm run dev
