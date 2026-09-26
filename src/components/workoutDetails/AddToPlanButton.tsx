"use client";

import { usePlan, PLAN_CAP } from "@/context/PlanContext";
import { IWorkout } from "@/types/workout.type";
import React from "react";

const AddToPlanButton = ({ workout }: { workout: IWorkout }) => {
  const { addToPlan, isInPlan, todaysPlan } = usePlan();
  const alreadyIn = isInPlan(workout.id);
  const isFull = todaysPlan.length >= PLAN_CAP && !alreadyIn;

  return (
    <button
      onClick={() => addToPlan(workout)}
      disabled={alreadyIn || isFull}
      className="btn btn-primary flex-1 rounded-full font-display font-semibold uppercase tracking-wide disabled:opacity-50"
    >
      ➕ {alreadyIn ? "In Today's Plan" : isFull ? "Plan is Full" : "Add to Today's Plan"}
    </button>
  );
};

export default AddToPlanButton;
