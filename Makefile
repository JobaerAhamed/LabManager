default:
	docker-compose up
mongodata:
	docker volume create --name=mongodata
build:
	docker-compose up --build
