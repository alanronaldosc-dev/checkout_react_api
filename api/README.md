# API - Spring Boot 3 + Java 17

REST API de ejemplo con Spring Boot 3 y Java 17.

## Stack

- Java 17
- Spring Boot 3.3.1
- Spring Data JPA
- H2 (base de datos en memoria)
- Lombok
- Bean Validation

## Estructura del proyecto

```
src/
├── main/
│   ├── java/com/example/api/
│   │   ├── ApiApplication.java
│   │   ├── controller/
│   │   │   └── ProductController.java
│   │   ├── dto/
│   │   │   └── ProductDTO.java
│   │   ├── exception/
│   │   │   ├── GlobalExceptionHandler.java
│   │   │   └── ResourceNotFoundException.java
│   │   ├── model/
│   │   │   └── Product.java
│   │   ├── repository/
│   │   │   └── ProductRepository.java
│   │   └── service/
│   │       └── ProductService.java
│   └── resources/
│       ├── application.properties
│       └── data.sql
└── test/
    └── java/com/example/api/
        └── ApiApplicationTests.java
```

## Ejecutar

```bash
./mvnw spring-boot:run
```

## Endpoints

| Método | Ruta                      | Descripción                        |
|--------|---------------------------|------------------------------------|
| GET    | /api/v1/products          | Listar todos los productos         |
| GET    | /api/v1/products?name=x   | Buscar productos por nombre        |
| GET    | /api/v1/products/{id}     | Obtener producto por ID            |
| POST   | /api/v1/products          | Crear nuevo producto               |
| PUT    | /api/v1/products/{id}     | Actualizar producto                |
| DELETE | /api/v1/products/{id}     | Eliminar producto                  |

## Consola H2

Disponible en: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)

- JDBC URL: `jdbc:h2:mem:apidb`
- Usuario: `sa`
- Contraseña: *(vacío)*

## Ejemplo de request (POST)

```json
{
  "name": "Monitor 4K",
  "description": "Monitor 27 pulgadas 4K UHD",
  "price": 399.99,
  "stock": 15
}
```
