import { IWorkout } from "@/types/workout.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IWorkoutCardProps {
  workout: IWorkout;
}

const WorkoutCard = ({ workout }: IWorkoutCardProps) => {
  return (
    <Link href={`/workouts/${workout.id}`} className="group block">
      <div className="overflow-hidden rounded-2xl border border-base-300 bg-base-200 transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-base-300">
          {workout.image ? (
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-base-content/30">
              No image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          
          {/* Name */}
          <h3 className="font-display text-lg font-bold uppercase leading-snug text-base-content group-hover:text-primary">
            {workout.name}
          </h3>

          {/* Equipment */}
          <p className="mt-1 text-sm text-base-content/50">
            {workout.equipment}
          </p>

          {/* Stats row */}
          <div className="mt-4 flex items-center gap-4 border-t border-base-300 pt-3">
            <span className="stat-chip">⏱ {workout.duration} min</span>
            <span className="stat-chip">🔥 {workout.calories} kcal</span>
            <span className="stat-chip">⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
