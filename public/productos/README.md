# Carpeta de Imágenes de Productos

## 📸 Instrucciones para Agregar Imágenes

### Paso 1: Descargar imágenes de Instagram
1. Ve a tu Instagram: @arte_entrepuntadas
2. Descarga las fotos de tus mejores productos
3. Recomendaciones:
   - Tamaño mínimo: 800x800px
   - Formato: JPG o WebP (preferido para web)
   - Calidad: Alta

### Paso 2: Renombrar imágenes
Usa nombres descriptivos en minúsculas y sin espacios:
```
luffy-one-piece.jpg
pinguino-tierno.jpg
conejita-vestido.jpg
osito-peluche.jpg
vaca-kawaii.jpg
llavero-variado.jpg
separador-libro.jpg
pollito-bebe.jpg
```

### Paso 3: Colocar imágenes
- Guarda todas las imágenes en esta carpeta: `/public/productos/`
- Las imágenes estarán disponibles en: `/productos/nombre-imagen.jpg`

### Paso 4: Actualizar código
Las imágenes se actualizarán automáticamente en:
- `src/components/public/GaleriaProductos.tsx`
- `src/components/public/Hero.tsx`

## 🎨 Productos Destacados (8 productos principales)

1. **Luffy - One Piece** → `luffy-one-piece.jpg`
2. **Pingüino Tierno** → `pinguino-tierno.jpg`
3. **Conejita con Vestido** → `conejita-vestido.jpg`
4. **Osito de Peluche** → `osito-peluche.jpg`
5. **Vaca Kawaii** → `vaca-kawaii.jpg`
6. **Llaveros Variados** → `llavero-variado.jpg`
7. **Separadores de Libros** → `separador-libro.jpg`
8. **Pollito Bebé** → `pollito-bebe.jpg`

## 📐 Para Hero Section (4 imágenes grandes)

Elige 4 productos destacados para mostrar en el hero:
```
hero-1.jpg → Producto más popular
hero-2.jpg → Segundo más vendido
hero-3.jpg → Producto único/especial
hero-4.jpg → Producto colorido/llamativo
```

## 🔧 Optimización de Imágenes

Para mejor rendimiento web:
1. Usa herramientas como:
   - TinyPNG (https://tinypng.com/)
   - Squoosh (https://squoosh.app/)
2. Objetivo: ~200-300KB por imagen
3. Formato WebP para mejor compresión

## ✅ Checklist

- [ ] Descargar 8 fotos principales de Instagram
- [ ] Renombrar con nombres descriptivos
- [ ] Optimizar tamaño/peso
- [ ] Colocar en `/public/productos/`
- [ ] Verificar que se vean en el sitio
