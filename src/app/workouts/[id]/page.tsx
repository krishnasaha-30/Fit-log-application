import AddToPlanButton from "@/components/workoutDetails/AddToPlanButton";
import SaveButton from "@/components/workoutDetails/SaveButton";
import { getWorkoutById } from "@/lib/api";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

interface IWorkoutDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

const WorkoutDetailsPage = async ({ params }: IWorkoutDetailsPageProps) => {
  const { id } = await params;
  const workout = await getWorkoutById(id);

  if (!workout) {
    notFound();
  }

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: workout.sets },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating },
  ];

  return (
    <div className="container mx-auto grid gap-10 px-4 py-12 lg:grid-cols-2">
      {/* Left: Visual */}
      <div className="relative h-72 overflow-hidden rounded-3xl border border-base-300 bg-base-200 lg:h-full lg:min-h-[500px]">
        {workout.image ? (
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-base-content/30">
            No image
          </div>
        )}
      </div>

      {/* Right: Details */}
      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map((tag) => (
            <span key={tag} className="tag-pill">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight md:text-4xl">
          {workout.name}
        </h1>

        {/* Description */}
        <p className="mt-3 text-base-content/60">{workout.description}</p>

        {/* Key specs panel */}
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-base-300 bg-base-200 p-5 sm:grid-cols-4">
          {specs.map((spec) => (
            <div key={spec.label}>
              <p className="text-xs uppercase text-base-content/40">
                {spec.label}
              </p>
              <p className="mt-1 font-display font-bold">{spec.value}</p>
            </div>
          ))}
        </div>

        {/* Instructions */}
        {workout.instructions.length > 0 && (
          <div className="mt-6">
            <h2 className="font-display text-lg font-bold uppercase tracking-wide">
              Instructions
            </h2>
            <ol className="mt-3 space-y-3">
              {workout.instructions.map((step, index) => (
                <li key={index} className="flex gap-3 text-base-content/70">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-content">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* CTA buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <AddToPlanButton workout={workout} />
          <SaveButton workout={workout} />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
