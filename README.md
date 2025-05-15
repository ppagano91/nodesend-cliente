# Frontend NodeSend

## Instalar Dependencias

```bash
npm install
```

## Variables de Entorno

### Opción 1
```bash
cp .env.example .env
```

```bash
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000/
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000/
```


### Opción 2

```js
// next.config.js
module.exports = {
  env: {
    backendURL: "http://localhost:4000",
    frontendURL: "http://localhost:3000",
  },
};
```

## Levantar App Desarrollo

```bash
npm run dev
```

## Compilar y Desplegar App

```bash
npm run build & npm start
```

