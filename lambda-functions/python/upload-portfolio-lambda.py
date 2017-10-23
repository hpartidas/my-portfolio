import boto3
from botocore.client import Config
import StringIO
import zipfile
import mimetypes
import os

def lambda_handler(event, context):
    sns = boto3.resource('sns')
    topic = sns.Topic(os.environ['sns_topic_arn'])
    s3 = boto3.resource('s3', config=Config(signature_version='s3v4'))

    location = {
        "bucketName": os.environ['build_bucket'],
        "objectKey": 'build.zip'
    }

    try:
        job = event.get("CodePipeline.job")

        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]
                    portfolio_bucket = s3.Bucket(os.environ['portfolio_bucket'])

                if artifact["name"] == "dev-app-build":
                    location = artifact["location"]["s3Location"]
                    config = job["data"]["actionConfiguration"]["configuration"]["UserParameters"]
                    config = config['config']
                    print "Config: " + str(config)
                    portfolio_bucket_name = config["portfolio_bucket"]
                    portfolio_bucket = s3.Bucket(portfolio_bucket_name)
        else:
            portfolio_bucket = s3.Bucket(os.environ['portfolio_bucket'])

        print "Building portfolio from " + str(location)

        build_bucket = s3.Bucket(location["bucketName"])

        portfolio_zip = StringIO.StringIO()
        build_bucket.download_fileobj(location["objectKey"], portfolio_zip)

        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bucket.upload_fileobj(
                    obj,
                    nm,
                    ExtraArgs={'ContentType':mimetypes.guess_type(nm)[0]}
                )
                portfolio_bucket.Object(nm).Acl().put(ACL='public-read')

        print "Deployment complete!"

        message = 'Portfolio has been successfully deployed'
        topic.publish(Subject='Portfolio Deployed', Message=message)

        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        message = 'An error has ocurred during portfolio deployment.'
        topic.publish(Subject='Portfolio Deployment Failure', Message=message)
        raise

    print "Task complete: "+message
