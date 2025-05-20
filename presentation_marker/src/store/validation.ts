import Ajv from "ajv";

const ajv = new Ajv();

// Определение схемы для валидации
const editorSchema = {
  type: "object",
  properties: {
    presentation: {
      type: "object",
      properties: {
        title: { type: "string" },
        slides: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              background: {
                type: "object",
                properties: {
                  type: { type: "string" },
                  color: { type: "string" },
                  src: { type: "string" },
                },
                required: ["type"],
              },
              elements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    type: { type: "string" },
                    content: { type: "string" },
                  },
                  required: ["id", "type"],
                },
              },
            },
            required: ["id", "background", "elements"],
          },
        },
      },
      required: ["title", "slides"],
    },
  },
  required: ["presentation"],
};

const validateEditor = ajv.compile(editorSchema);

export function validateDocument(document: any): boolean {
  const valid = validateEditor(document);
  if (!valid) {
    console.error("Validation failed:", validateEditor.errors);
  }
  return valid;
}
