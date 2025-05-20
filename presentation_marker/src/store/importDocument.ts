import { setEditor } from "./editor.ts";
import { validateDocument } from "./validation";

export function importDocument(event: React.ChangeEvent<HTMLInputElement>) {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result as string);

        // Валидация импортируемого документа
        if (validateDocument(parsedData)) {
          // Установка состояния редактора с импортированной презентацией
          setEditor(parsedData);
          console.log("Документ успешно импортирован: ", parsedData);
        } else {
          alert("Ошибка: Документ не прошел валидацию. Проверьте структуру JSON.");
          console.error("Ошибка: документ не прошел валидацию");
        }
      } catch (error) {
        alert("Ошибка при чтении файла. Убедитесь, что выбран корректный JSON файл.");
        console.error("Ошибка при импорте документа:", error);
      }
    };
    reader.readAsText(file);
  }
}
