import { useState } from "react";
import useHabitStore from "./store/store";
import { z } from "zod";

const Form = () => {
  const [habit, setHabit] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const { addHabit } = useHabitStore();
  const [formErrors, setFormErrors] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    const requiredData = z.object({
      habit: z
        .string()
        .min(3, { message: "Habit must contain at least 3 characters" })
        .max(20, { message: "Habit should not be mre than 20 characters" }),
      frequency: z.string(),
    });

    const { success, data, error } = requiredData.safeParse({
      habit,
      frequency,
    });

    if (!success) {
      const formattedErrors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message;
        return acc;
      }, {});
      setFormErrors(formattedErrors);
      return;
    }

    addHabit(data.habit, data.frequency);

    setHabit("");
    setFrequency("daily");
    setFormErrors({});
  };
  return (
    <div>
      {" "}
      <form className=" max-w-[600px]  w-full " onSubmit={submitHandler}>
        <div className="py-4 flex flex-col space-y-2">
          <label className="text-gray-500 font-semibold text-xl">
            Habit Name
          </label>
          <input
            type="text"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Enter your habit "
            className="border border-black outline-none  p-4  text-2xl"
          />

          <small className="text-red-600 text-lg">{formErrors.habit}</small>
        </div>
        <div className="py-4 flex flex-col space-y-2">
          <label className="text-gray-500 font-semibold text-xl">
            Frequency
          </label>
          <select
            className="border border-black outline-none  p-4  text-2xl"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full p-4 border border-blue-600 py-2 bg-blue-600  text-white uppercase text-2xl rounded-md"
        >
          add habit
        </button>
      </form>
    </div>
  );
};

export default Form;
