# Levenzi Backend — Endpoints API (Auth + CRUD Modules)

> Base URL: `/api`

## Seguridad (JWT)
La mayoría de endpoints CRUD usan middleware: `auth:api`.

### `GET /api/health`
- **Controller:** `App\Modules\Auth\Http\Controllers\HealthController`
- **Auth:** ❌ No

### `POST /api/auth/login`
- **Controller:** `App\Modules\Auth\Http\Controllers\AuthController@login`
- **Auth:** ❌ No
- **Body (LoginRequest):**
  - `email` (string, requerido)
  - `password` (string, requerido)
- **Response (200):**
  - `access_token`
  - `token_type` = `bearer`
  - `expires_in`

### `POST /api/auth/logout`
- **Controller:** `App\Modules\Auth\Http\Controllers\AuthController@logout`
- **Auth:** ✅ `auth:api`
- **Body:** ❌ No
- **Headers:** `Authorization: Bearer <token>`
- **Response:**
  - `message`: `Sesión cerrada`

---

## Ventas (solo GET)
### `GET /api/ventas`
- **Controller:** `App\Modules\ventas\Http\Controllers\VentaController@index`
- **Auth:** ✅ `auth:api`

### `GET /api/ventas/{id}`
- **Controller:** `App\Modules\ventas\Http\Controllers\VentaController@show`
- **Auth:** ✅ `auth:api`

---

## CRUD (Auth required)
Los siguientes módulos siguen el mismo patrón:
- `GET /` → `index`
- `GET /{id}` → `show`
- `POST /` → `store`
- `PUT /{id}` → `update`
- `PATCH /{id}` → `update`
- `DELETE /{id}` → `destroy`

### `companias`
- `GET /api/companias`
- `GET /api/companias/{id}`
- `POST /api/companias`
- `PUT /api/companias/{id}`
- `PATCH /api/companias/{id}`
- `DELETE /api/companias/{id}`

### `sedes`
- `GET /api/sedes`
- `GET /api/sedes/{id}`
- `POST /api/sedes`
- `PUT /api/sedes/{id}`
- `PATCH /api/sedes/{id}`
- `DELETE /api/sedes/{id}`

### `clientes`
- `GET /api/clientes`
- `GET /api/clientes/{id}`
- `POST /api/clientes`
- `PUT /api/clientes/{id}`
- `PATCH /api/clientes/{id}`
- `DELETE /api/clientes/{id}`

### `doctores`
- `GET /api/doctores`
- `GET /api/doctores/{id}`
- `POST /api/doctores`
- `PUT /api/doctores/{id}`
- `PATCH /api/doctores/{id}`
- `DELETE /api/doctores/{id}`

### `marcas`
- `GET /api/marcas`
- `GET /api/marcas/{id}`
- `POST /api/marcas`
- `PUT /api/marcas/{id}`
- `PATCH /api/marcas/{id}`
- `DELETE /api/marcas/{id}`

### `instalaciones`
- `GET /api/instalaciones`
- `GET /api/instalaciones/{id}`
- `POST /api/instalaciones`
- `PUT /api/instalaciones/{id}`
- `PATCH /api/instalaciones/{id}`
- `DELETE /api/instalaciones/{id}`

### `roles`
- `GET /api/roles`
- `GET /api/roles/{id}`
- `POST /api/roles`
- `PUT /api/roles/{id}`
- `PATCH /api/roles/{id}`
- `DELETE /api/roles/{id}`

### `usuarios`
- `GET /api/usuarios`
- `GET /api/usuarios/{id}`
- `POST /api/usuarios`
- `PUT /api/usuarios/{id}`
- `PATCH /api/usuarios/{id}`
- `DELETE /api/usuarios/{id}`

### `permisos`
- `GET /api/permisos`
- `GET /api/permisos/{id}`
- `POST /api/permisos`
- `PUT /api/permisos/{id}`
- `PATCH /api/permisos/{id}`
- `DELETE /api/permisos/{id}`

### `modulos`
- `GET /api/modulos`
- `GET /api/modulos/{id}`
- `POST /api/modulos`
- `PUT /api/modulos/{id}`
- `PATCH /api/modulos/{id}`
- `DELETE /api/modulos/{id}`

### `productos`
- `GET /api/productos`
- `GET /api/productos/{id}`
- `POST /api/productos`
- `PUT /api/productos/{id}`
- `PATCH /api/productos/{id}`
- `DELETE /api/productos/{id}`

---

## Headers recomendados (para endpoints protegidos)
```http
Authorization: Bearer <access_token>
Accept: application/json
Content-Type: application/json
```

