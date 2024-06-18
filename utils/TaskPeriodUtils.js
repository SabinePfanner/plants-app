export const months = [
  "December",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
];

export function getIntervals(months) {
  // Function to get cartesian product of multiple arrays
  // See https://stackoverflow.com/questions/4331092/finding-all-combinations-cartesian-product-of-javascript-array-values
  function* cartesian(head, ...tail) {
    let remainder = tail.length ? cartesian(...tail) : [[]];
    for (let r of remainder) for (let h of head) yield [h, ...r];
  }

  // Get cartesian of months and within-months periods
  const intervals = [...cartesian(["early", "mid", "late"], months)].map(
    (key) => key.join(" ")
  );

  return intervals;
}

export function getCurrentInterval(months) {
  const date = new Date();
  const month = months[date.getMonth() + 1];
  const day = date.getDate();
  const currentInterval =
    (day < 11 ? "early " : day < 21 ? "mid " : "late ") + month;

  return currentInterval;
}

export function getActiveTasksByPlant(plants, months) {
  const date = new Date();
  const intervals = getIntervals(months);
  const currentInterval = getCurrentInterval(months);
  const currentIntervalIndex = intervals.findIndex(
    (interval) => interval === currentInterval
  );

  const activeTasksByPlant = plants.map((plant) => {
    const activePlantTasks = Object.keys(plant.tasks).filter((taskKey) => {
      const task = plant.tasks[taskKey];
      return (
        task.start !== null &&
        task.end !== null &&
        currentIntervalIndex >=
          intervals.findIndex(
            (interval) => interval === plant.tasks[taskKey].start
          ) &&
        currentIntervalIndex <=
          intervals.findIndex(
            (interval) => interval === plant.tasks[taskKey].end
          )
      );
    });
    return [plant._id, activePlantTasks];
  });

  return activeTasksByPlant;
}
