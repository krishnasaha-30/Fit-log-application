"use client";

import { usePlan } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";
import React from "react";

const SaveButton = ({ workout }: { workout: IWorkout }) => {
  const { addToSaved, isSaved } = usePlan();
  const alreadySaved = isSaved(workout.id);

  return (
    <button
      onClick={() => addToSaved(workout)}
      disabled={alreadySaved}
      className="btn btn-outline flex-1 rounded-full font-display font-semibold uppercase tracking-wide disabled:opacity-50"
    >
      🔖 {alreadySaved ? "Saved" : "Save for Later"}
    </button>
  );
};

export default SaveButton;
