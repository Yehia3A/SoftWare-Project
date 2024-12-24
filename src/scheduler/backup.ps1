$timestamp = Get-Date -Format "yyyy-MM-dd-HHmm"
$bucketName = "my-e-learning-project"
$backupDir = "backups/$timestamp"

# Create a temporary directory for the backup
$tempDir = "$env:TEMP\backup-$timestamp"
New-Item -ItemType Directory -Force -Path $tempDir

# Perform the MongoDB dump to the temporary directory
& mongodump --uri "mongodb+srv://elearning:elearning123@cluster0.3ylmz.mongodb.net/E-learning" --out $tempDir

# AWS credentials
$awsAccessKeyId = "AKIAVVZOOTUSV7TNHVJO"
$awsSecretAccessKey = "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"
$awsRegion = "eu-central-1"

# Configure AWS CLI to use the provided credentials
aws configure set aws_access_key_id $awsAccessKeyId
aws configure set aws_secret_access_key $awsSecretAccessKey
aws configure set region $awsRegion

# Upload the backup directly to AWS S3
aws s3 cp $tempDir s3://my-e-learning-project/$backupDir --recursive

# Clean up the temporary directory after upload
Remove-Item -Recurse -Force $tempDir
