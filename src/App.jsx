import "./App.css";
import HabitList from "./components/HabitList";
import Form from "./components/Form";
function App() {
  return (
    <div className="max-w-[1400px] mx-auto px[20px] w-full flex justify-center  items-center flex-col  space-y-20">
      <h1 className="text-4xl font-bold mt-10 ">Habit Tracker</h1>

      <Form />
      <HabitList />
    </div>
  );
}

export default App;
