function getCompletedTasksTitles(tasks) {
  return tasks
    .filter(task => task.status === "completed")  // Filtrujemy zadania o statusie "completed"
    .sort((a, b) => a.id - b.id)  // Sortujemy zadania według id (rosnąco)
    .map(task => task.title);  // Zwracamy tablicę z tytułami tych zadań
}

// Przykład użycia:
const tasks = [
  { id: 1, title: "Zadanie 1", status: "completed" },
  { id: 2, title: "Zadanie 2", status: "pending" },
  { id: 3, title: "Zadanie 3", status: "completed" },
  { id: 4, title: "Zadanie 4", status: "in progress" }
];

const completedTaskTitles = getCompletedTasksTitles(tasks);
console.log(completedTaskTitles);  // ["Zadanie 1", "Zadanie 3"]
