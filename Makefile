default:
	docker-compose up
mongodata:
	docker volume create --name=mongodata
