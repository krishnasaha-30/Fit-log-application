"use client";

import { IPlanItem, IWorkout } from "@/types/workout.type";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-toastify";

export const PLAN_CAP = 5;
const PLAN_STORAGE_KEY = "fitlog:todays-plan";
const SAVED_STORAGE_KEY = "fitlog:saved";

interface IPlanContext {
  todaysPlan: IPlanItem[];
  saved: IPlanItem[];
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  addToPlan: (workout: IWorkout) => void;
  addToSaved: (workout: IWorkout) => void;
  markAsDone: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
}

export const PlanContext = createContext<IPlanContext>({
  todaysPlan: [],
  saved: [],
  isInPlan: () => false,
  isSaved: () => false,
  addToPlan: () => {},
  addToSaved: () => {},
  markAsDone: () => {},
  removeFromPlan: () => {},
  removeFromSaved: () => {},
});

const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [todaysPlan, setTodaysPlan] = useState<IPlanItem[]>([]);
  const [saved, setSaved] = useState<IPlanItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on first mount (optional)
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem(PLAN_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);
      if (storedPlan) setTodaysPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
    } catch (error) {
      console.error("Error reading FitLog data from localStorage:", error);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(PLAN_STORAGE_KEY, JSON.stringify(todaysPlan));
  }, [todaysPlan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(SAVED_STORAGE_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isInPlan = (id: string) => todaysPlan.some((item) => item.id === id);
  const isSaved = (id: string) => saved.some((item) => item.id === id);

  const addToPlan = (workout: IWorkout) => {
    if (isInPlan(workout.id)) {
      toast.info(`"${workout.name}" is already in today's plan`);
      return;
    }
    if (todaysPlan.length >= PLAN_CAP) {
      toast.error(`Today's plan is capped at ${PLAN_CAP} lifts`);
      return;
    }
    setTodaysPlan([...todaysPlan, { ...workout, status: "pending" }]);
    toast.success(`Added "${workout.name}" to today's plan`);
  };

  const addToSaved = (workout: IWorkout) => {
    if (isSaved(workout.id)) {
      toast.info(`"${workout.name}" is already saved`);
      return;
    }
    setSaved([...saved, { ...workout, status: "pending" }]);
    toast.success(`Saved "${workout.name}" for later`);
  };

  const markAsDone = (id: string) => {
    setTodaysPlan((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "done" } : item,
      ),
    );
    toast.success("Marked as done");
  };

  const removeFromPlan = (id: string) => {
    setTodaysPlan((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from today's plan");
  };

  const removeFromSaved = (id: string) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from saved");
  };

  const sharedData: IPlanContext = {
    todaysPlan,
    saved,
    isInPlan,
    isSaved,
    addToPlan,
    addToSaved,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  };

  return (
    <PlanContext.Provider value={sharedData}>{children}</PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);

export default PlanProvider;
