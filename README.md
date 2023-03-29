<p align="center">

## MyTumblerDiary



## local setting

```bash
# dev branch clone
$ git clone -b dev --single-branch https://github.com/MyTumblerDiary/MTD-back.git
  
$ cd MTD-back

# 의존성 모듈 설치
$ yarn install

# config directory 만들기
$ mkdir config

#config 폴더에 .dev.env 파일 넣을것!!(notion애 env 파일 업로드 해놓음)


```

## Running the app
도커가 사전에 설치 되어야 함<br>
도거 설치법 : (https://gravel-bloom-e33.notion.site/Docker-0ee6504f5541429fa8ff3d6fcf76ef05)
```bash
 
$ docker-compose build

$ docker-compose up  
  

```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
