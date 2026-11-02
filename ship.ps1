# ship.ps1 - test-build, commit, and push to main.
# You don't deploy from here: pushing to main triggers GitHub Actions
# (.github/workflows/deploy.yml), which builds the site and publishes it.
#
# Usage (from PowerShell or cmd, in this folder):
#   .\ship "what I changed"

param([string]$Message)
if (-not $Message) { $Message = "Update site" }

Set-Location $PSScriptRoot
function Step($text) { Write-Host "`n>> $text" -ForegroundColor Cyan }
function Fail($text) { Write-Host "`nSTOPPED: $text" -ForegroundColor Red; exit 1 }

# Only main goes live
$branch = git rev-parse --abbrev-ref HEAD
if ($branch -ne "main") { Fail "You're on branch '$branch'. Only main deploys. Switch with: git checkout main" }

if (-not (Test-Path node_modules)) {
    Step "Installing dependencies"
    npm ci
    if ($LASTEXITCODE -ne 0) { Fail "npm ci failed." }
}

# Build locally first with CI=true. GitHub Actions sets CI=true, which makes
# Create React App treat lint warnings as errors - so test the same way here.
Step "Test build (same strict mode GitHub uses)"
$env:CI = "true"
npm run build
$buildCode = $LASTEXITCODE
Remove-Item Env:CI
if ($buildCode -ne 0) { Fail "Build failed - fix the errors above. Nothing was committed or pushed." }

# Commit anything uncommitted
if (git status --porcelain) {
    Step "Committing these changes as: $Message"
    git status --short
    git add -A
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { Fail "git commit failed." }
} else {
    Write-Host "`nNo uncommitted changes."
}

# Make sure GitHub doesn't have commits we're missing
git fetch origin main --quiet
$behind = [int](git rev-list --count HEAD..origin/main)
$ahead  = [int](git rev-list --count origin/main..HEAD)
if ($behind -gt 0) { Fail "GitHub has $behind commit(s) you don't have. Run: git pull --rebase   then ship again." }
if ($ahead -eq 0)  { Write-Host "Nothing new to push - the live site is already up to date." -ForegroundColor Green; exit 0 }

Step "Pushing $ahead commit(s) to GitHub"
git push origin main
if ($LASTEXITCODE -ne 0) { Fail "git push failed." }

Write-Host "`nPushed. GitHub Actions is building and deploying now (about 1-2 minutes)." -ForegroundColor Green
Write-Host "  Watch it:  https://github.com/karenlauhl/karenlauhl.github.io/actions"
Write-Host "  Live site: https://karenlauhl.github.io  (hard-refresh with Ctrl+F5)"
