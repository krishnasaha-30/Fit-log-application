import { IWorkout } from "@/types/workout.type";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";


export const getWorkouts = async (): Promise<IWorkout[]> => {
  try {
    const res = await fetch(API_BASE, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workouts");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workouts:", error);
    return [];
  }
};


export const getWorkoutById = async (id: string): Promise<IWorkout | null> => {
  try {
    const res = await fetch(`${API_BASE}/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch workout");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching workout details:", error);
    return null;
  }
};


