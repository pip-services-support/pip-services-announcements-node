#!/usr/bin/env pwsh

# Get component data and set necessary variables
$component = Get-Content -Path "component.json" | ConvertFrom-Json
$buildImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-build"
$testImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-test"
$rcImage="$($component.registry)/$($component.name):$($component.version)-$($component.build)-rc"
$latestImage="$($component.registry)/$($component.name):latest"

# Clean up build directories
Get-ChildItem -Path "." -Include "obj" -Recurse | foreach($_) { Remove-Item -Force -Recurse $_.FullName }
Get-ChildItem -Path "." -Include "node_modules" -Recurse | foreach($_) { Remove-Item -Force -Recurse $_.FullName }

# Remove docker images
docker rmi $buildImage --force
docker rmi $testImage --force
docker rmi $rcImage --force
docker rmi $latestImage --force
docker image prune --force
docker rmi -f $(docker images -f "dangling=true" -q) # remove build container if build fails

# Remove existed containers
$exitedContainers = docker ps -a | Select-String -Pattern "Exit"
foreach($c in $exitedContainers) { docker rm $c.ToString().Split(" ")[0] }

# Remove unused volumes
docker volume rm -f $(docker volume ls -f "dangling=true")
