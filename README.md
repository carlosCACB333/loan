# Loan app server

Servidor del backend de la app de prestamos.

## Instalacion

- Instalar docker
- Clonar el repositorio
- Crear un archivo .env con las variables de entorno
  ```bash
  PORT=8080
  MONGO_URL="mongodb+srv:"
  JWT_SECRET="skejraksde"
  STAGE=dev
  IMAGE_NAME=carloscb8080/loan:v1.0.0
  ```

## corrrer la app

- En modo desarrollo

```bash
docker compose up
```

- En modo produccion

```bash
docker compose -f docker-compose.prod.yml up
```
