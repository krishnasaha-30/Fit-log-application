"use client";
import PlanWorkoutCard from "@/components/myPlan/PlanWorkoutCard";
import { usePlan } from "@/context/PlanContext";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type TTab = "plan" | "saved";

const tabs: { key: TTab; label: string }[] = [
  { key: "plan", label: "Today's Plan" },
  { key: "saved", label: "Saved" },
];

const MyPlanPage = () => {
  const { todaysPlan, saved, markAsDone, removeFromPlan, removeFromSaved } =
    usePlan();
  const [activeTab, setActiveTab] = useState<TTab>("plan");

  const activeList = activeTab === "plan" ? todaysPlan : saved;

  const metrics = useMemo(
    () => [
      { label: "Exercises", value: todaysPlan.length },
      {
        label: "Minutes",
        value: todaysPlan.reduce((sum, item) => sum + item.duration, 0),
      },
      {
        label: "Calories",
        value: todaysPlan.reduce((sum, item) => sum + item.caloriesBurned, 0),
      },
    ],
    [todaysPlan],
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide md:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-base-content/60">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      {/* Metrics */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-base-300 bg-base-200 p-5 text-center"
          >
            <p className="font-display text-3xl font-bold text-primary">
              {metric.value}
            </p>
            <p className="mt-1 text-xs uppercase text-base-content/50">
              {metric.label}
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-2 border-b border-base-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 font-display text-sm font-semibold uppercase tracking-wide ${
              activeTab === tab.key
                ? "border-b-2 border-primary text-primary"
                : "text-base-content/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="mt-6 space-y-4">
        {activeList.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-base-300 py-16 text-center">
            <h3 className="font-display text-xl font-bold uppercase">
              Nothing Here Yet
            </h3>
            <p className="max-w-sm text-base-content/50">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="btn btn-primary mt-2 rounded-full font-display font-semibold uppercase tracking-wide"
            >
              Go to Workouts
            </Link>
          </div>
        ) : (
          activeList.map((item) => (
            <PlanWorkoutCard
              key={item.id}
              item={item}
              showMarkAsDone={activeTab === "plan"}
              onMarkAsDone={() => markAsDone(item.id)}
              onRemove={() =>
                activeTab === "plan"
                  ? removeFromPlan(item.id)
                  : removeFromSaved(item.id)
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyPlanPage;