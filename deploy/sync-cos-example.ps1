$Coscli = "coscli"
$BucketAlias = "photo-site"
$LocalWebDir = "E:\Photos\Web"

& $Coscli sync $LocalWebDir "cos://$BucketAlias/" -r

Write-Host "Synced web images to COS. Refresh CDN cache in the cloud console if filenames did not change."
