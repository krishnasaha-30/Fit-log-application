export interface IWorkout {
  id: string;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;  
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export type TPlanStatus = "pending" | "done";

export interface IPlanItem extends IWorkout {
  status: TPlanStatus;
}
