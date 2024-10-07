import deleteIcon from "../assets/delete.svg";
import useHabitStore from "../store/store";
const HabitList = () => {
  const { habits, removeHabit, updateHabit } = useHabitStore();
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-[600px] w-full ">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className="flex justify-between items-center m-4 p-5 "
          style={{
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <div className="flex space-x-4 items-center">
            <div>
              <p className="text-2xl font-bold capitalize">{habit.habit}</p>
              <p className="capitalize">{habit.frequency}</p>
            </div>
          </div>
          <div className="space-x-4">
            <input
              type="checkbox"
              className="w-5 h-5  cursor-pointer"
              checked={habit.completedDates.includes(today)}
              onChange={() => updateHabit(habit.id, today)}
            />
            <button onClick={() => removeHabit(habit.id)}>
              <img src={deleteIcon} className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HabitList;
