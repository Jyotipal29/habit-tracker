import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";



const useHabitStore = create(devtools(persist((set, get) => {
    return {
        habits: [],
        isLoading: false,
        error: null,
        addHabit: (habit, frequency) => set((state) => {
            return {
                habits: [
                    ...state.habits, {
                        id: Date.now().toString(),
                        habit, frequency, completedDates: [], createdAt: new Date().toISOString()
                    }
                ]
            }
        }),
        removeHabit: (id) => set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id)
        })),
        updateHabit: (id, date) => set((state) => {
            return {
                habits: state.habits.map((habit) => habit.id === id ? { ...habit, completedDates: habit.completedDates.includes(date) ? habit.completedDates.filter((d) => d !== date) : [...habit.completedDates, date] } : habit)
            }
        }),
        fetchHabits: async () => {
            set({ isLoading: true })

            try {
                //   const currentHabits = get().habits;
                //   if (currentHabits.length > 0) {
                //     set({ isLoading: false });
                //     return;
                //   }
                await new Promise((resolve) => setTimeout((resolve, 1000)))
                const mockHabits = [
                    {
                        id: "1",
                        name: "Read",
                        frequency: "daily",
                        completedDates: [],
                        createdAt: new Date().toISOString(),
                    },
                    {
                        id: "2",
                        name: "Exercise",
                        frequency: "daily",
                        completedDates: [],
                        createdAt: new Date().toISOString(),
                    },
                ];
                set({ habits: mockHabits, isLoading: false });
            } catch (error) {
                set({ error, isLoading: false });
            }
        }
    }
}, {
    name: "habits-local"
})))

export default useHabitStore