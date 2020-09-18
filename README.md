# 03-multi-container-deploy

Example of a complex app CI/CD automated build, test and deployment workflow utilising Travis-CI, Docker Hub and AWS Elastic Beanstalk, RDS and ElastiCache.

App is a grossly over-engineered Fibonacci calculator comprising of: -

- react client
- nginx client host
- express server api
- postres database
- redis store
- nginx router

## Flow

1. push to git
1. travis-ci...
   1. builds client development docker image (react)
   1. runs client tests (jest)
   1. builds 4x production docker images
   1. pushes docker images to personal hub.docker.com repo
   1. sends deploy trigger to aws elastic beanstalk
1. aws...
   1. pulls the 4x docker images from hub.docker.com
   1. runs images as defined in docker-compose.yml like **Dockerrun.aws.json** file
   1. app is live

## AWS setup

- create new (programmatic access) user from IAM dashboard, note credentials
  - grant **AWSElasticBeanstalkFullAccess** permissions
- create new security group from VPC (virtual private cloud) dashboard
  - set inbound rule: TCP, 5432-6379
- create new Elastic Beanstalk multi-container docker application
  - add to custom security group
- create new Postres database from RDS (Managed relational database service)
  - add to custom security group
- create new Redis instance from ElastiCache dashboard (NOTE HARDWARE SPECS!)
  - add to custom security group
