import { IPlanItem } from "@/types/workout.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPlanWorkoutCardProps {
  item: IPlanItem;
  showMarkAsDone?: boolean;
  onMarkAsDone?: () => void;
  onRemove: () => void;
}

const PlanWorkoutCard = ({
  item,
  showMarkAsDone = false,
  onMarkAsDone,
  onRemove,
}: IPlanWorkoutCardProps) => {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center">
      {/* Thumbnail */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-base-300">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : null}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3
          className={`font-display font-bold uppercase tracking-wide ${
            item.status === "done" ? "text-base-content/40 line-through" : ""
          }`}
        >
          {item.name}
        </h3>
        <p className="text-sm text-base-content/50">{item.equipment}</p>
        <div className="mt-2 flex gap-4">
          <span className="stat-chip">⏱ {item.duration} min</span>
          <span className="stat-chip">🔥 {item.caloriesBurned} kcal</span>
          <span className="stat-chip">⭐ {item.rating}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Link
          href={`/workouts/${item.id}`}
          className="btn btn-outline btn-sm rounded-full font-display uppercase tracking-wide"
        >
          View Details
        </Link>

        {showMarkAsDone && item.status !== "done" && (
          <button
            onClick={onMarkAsDone}
            className="btn btn-success btn-sm rounded-full font-display uppercase tracking-wide"
          >
            ✓ Done
          </button>
        )}

        <button
          onClick={onRemove}
          className="btn btn-ghost btn-sm btn-circle text-error"
          aria-label={`Remove ${item.name}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default PlanWorkoutCard;
