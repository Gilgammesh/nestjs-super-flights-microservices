# Microservicios Flights

## Construir las imágenes y contenedores desarrollo

Previamente debemos tener corriendo `Docker Desktop`

```sh
docker-compose -f .\docker-compose.dev.yaml up --build -d
```

## Subir imagenes a Docker Hub

Primero nos logueamos en docker hub

```sh
docker login
```

Usamos nuestro tag o name para tagear nuestras imágenes

```sh
docker tag app-vuelos:v2 gilgammesh/app-vuelos:v2
docker tag ms-flights:v2 gilgammesh/ms-flights:v2
docker tag ms-passengers:v2 gilgammesh/ms-passengers:v2
docker tag ms-users:v2 gilgammesh/ms-users:v2
```

Luego hacemos un push de nuestras imágenes

```sh
docker push gilgammesh/app-vuelos:v2
docker push gilgammesh/ms-flights:v2
docker push gilgammesh/ms-passengers:v2
docker push gilgammesh/ms-users:v2
```

Verificamos que estén creadas en los repositorios de `Docker Hub`

## Construir las imágenes y contenedores

Previamente debemos tener corriendo `Docker Desktop`

Usaremos las imágenes cargadas a `Docker Hub`

```sh
docker-compose -f .\docker-compose.yaml up -d
```