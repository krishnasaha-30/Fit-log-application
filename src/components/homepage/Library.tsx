"use client";

import { getWorkouts } from "@/lib/api";
import { IWorkout } from "@/types/workout.type";
import React, { useEffect, useMemo, useState } from "react";
import WorkoutCard from "@/components/shared/WorkoutCard";

type TSortKey = "duration" | "caloriesBurned" | "rating";

const sortOptions: { key: TSortKey; label: string }[] = [
  { key: "duration", label: "Duration" },
  { key: "caloriesBurned", label: "Calories" },
  { key: "rating", label: "Rating" },
];

const Library = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<TSortKey>("duration");

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);

  const sortedWorkouts = useMemo(() => {
    return [...workouts].sort((a, b) => b[sortKey] - a[sortKey]);
  }, [workouts, sortKey]);

  return (
    <section id="library" className="container mx-auto px-4 py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            The Library
          </h2>
          <p className="mt-1 text-base-content/60">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-outline btn-sm rounded-full font-display uppercase tracking-wide"
          >
            Sort By: {sortOptions.find((o) => o.key === sortKey)?.label} ⌄
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-10 mt-2 w-44 rounded-box border border-base-300 bg-base-200 p-2 shadow-lg"
          >
            {sortOptions.map((option) => (
              <li key={option.key}>
                <button onClick={() => setSortKey(option.key)}>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="mt-16 text-center text-base-content/50">
          Loading workouts…
        </p>
      ) : sortedWorkouts.length === 0 ? (
        <p className="mt-16 text-center text-base-content/50">
          No workouts found. Check the FitLog API connection.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sortedWorkouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Library;
