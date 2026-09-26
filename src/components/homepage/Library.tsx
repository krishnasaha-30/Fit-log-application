"use client";

import { getWorkouts } from "@/lib/api";
import { IWorkout } from "@/types/workout.type";
import React, { useEffect, useState } from "react";
import WorkoutCard from "@/components/shared/WorkoutCard";

const Library = () => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      const data = await getWorkouts();
      setWorkouts(data);
      setLoading(false);
    };

    fetchWorkouts();
  }, []);



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
          <h1>sort</h1>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <p className="mt-16 text-center text-base-content/50">
          Loading workouts…
        </p>
      ) : workouts.length === 0 ? (
        <p className="mt-16 text-center text-base-content/50">
          No workouts found. Check the FitLog API connection.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Library;
