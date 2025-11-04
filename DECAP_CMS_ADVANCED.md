# Ejemplos de Configuración Avanzada de Decap CMS

## Configuraciones Adicionales Útiles

### 1. Editor de Texto Enriquecido Personalizado

Para personalizar los botones del editor markdown, agrega en `config.yml`:

```yaml
editor:
  preview: true

# Dentro de cada colección:
fields:
  - label: "Contenido"
    name: "body"
    widget: "markdown"
    buttons:
      - bold
      - italic
      - code
      - link
      - heading-two
      - heading-three
      - quote
      - bulleted-list
      - numbered-list
