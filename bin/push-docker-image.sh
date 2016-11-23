docker build -t reef-rpc-gateway:latest ./
docker tag reef-rpc-gateway:latest 590257360645.dkr.ecr.us-east-1.amazonaws.com/reef-rpc-gateway:master
docker push 590257360645.dkr.ecr.us-east-1.amazonaws.com/reef-rpc-gateway:master
