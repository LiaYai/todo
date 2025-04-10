# ToDo list (React + TypeScript)

Простое приложение для управления задачами с возможностью сортировки и сохранением в LocalStorage.

## Функционал
- Добавление/удаление задач
- Отметка выполнения (чекбокс)
- Сортировка: Все/Активные/Завершенные
- Очистка выполненных задач
- Автосохранение в LocalStorage

## Технологии
- React 18
- TypeScript
- React Hooks
- Кастомный хук `useLocalStorage`

## Запуск проекта
```bash
git clone
npm install
npm start
```

## Структура компонентов
```
/src
├── components
│   ├── Task.tsx       # Компонент задачи
│   └── TaskList.tsx   # Список задач + логика
├── hooks
│   └── useLocalStorage.ts  # Хук для LocalStorage
├── types.ts           # Типы TypeScript
└── App.tsx            # Корневой компонент
```
