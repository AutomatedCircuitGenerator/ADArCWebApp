# Check if the git command is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "Git is not installed or not available in the PATH." -ForegroundColor Red
    exit
}

# Ensure we're in a git repository
$gitStatus = git rev-parse --is-inside-work-tree 2>&1
if ($gitStatus -ne "true") {
    Write-Host "This is not a git repository." -ForegroundColor Red
    exit
}

# Get the current branch name
$currentBranch = git rev-parse --abbrev-ref HEAD
if ($currentBranch -eq "master") {
    Write-Host "You are on the 'main' branch. Please switch to a feature branch." -ForegroundColor Yellow
    exit
}

# Fetch the latest changes for the main branch
git fetch origin master

# Get the latest commit on the main branch
$masterCommit = git rev-parse origin/master

# Get the latest commit on the current branch
$currentBranchCommit = git rev-parse HEAD

# Generate the diff between the latest commit on main and the current branch
$diffFileName = "diff.patch"
git diff $masterCommit $currentBranchCommit > $diffFileName

# Check if the diff file was generated successfully
if (Test-Path $diffFileName) {
    Write-Host "Diff file generated successfully: $diffFileName" -ForegroundColor Green
} else {
    Write-Host "Failed to generate diff file." -ForegroundColor Red
}