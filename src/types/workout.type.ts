export interface IWorkout {
  id: string;
  name: string;
  image: string;
  categories: string[];
  equipment: string;
  duration: number;
  calories: number;
  rating: number;
  difficulty: string;
  sets: number;
  reps: string;
  description: string;
  instructions: string[];
}

export type TPlanStatus = "pending" | "done";

export interface IPlanItem extends IWorkout {
  status: TPlanStatus;
}
