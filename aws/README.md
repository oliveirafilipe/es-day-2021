# AWS

https://029236691098.signin.aws.amazon.com/console

Account: 029236691098

User: es-day-user

Certifiquem que estão na região us-east-1 Norte Virginia

![image](https://user-images.githubusercontent.com/22033274/118689377-4fd5d000-b7dd-11eb-83b5-706eba97e6b2.png)

Acessar o ECR: https://console.aws.amazon.com/ecr/repositories?region=us-east-1

E criar repositório:

![image](https://user-images.githubusercontent.com/22033274/118689625-988d8900-b7dd-11eb-9ee4-34f6619cffe7.png)

Deixar todas as opções como estão, apenas trocar o nome.

O nome deverá ser `es-day-<seu-nome>`, exemplo: `es-day-oliveira`.

# Pushing Image to ECR
```
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 029236691098.dkr.ecr.us-east-1.amazonaws.com
```

```
docker tag es-day:v1 029236691098.dkr.ecr.us-east-1.amazonaws.com/es-day-<seu-nome>:v1
```

```
docker push 029236691098.dkr.ecr.us-east-1.amazonaws.com/es-day-<seu-nome>:v1
```

# Creating Task Definition
https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/taskDefinitions

# Creating Log Group
https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logsV2:log-groups/create-log-group

# Creating Service
https://us-east-1.console.aws.amazon.com/ecs/home?region=us-east-1#/clusters/es-day/createService