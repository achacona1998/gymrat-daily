import { describe, it, expect, beforeEach, vi } from "vitest";
import { storageService } from "./storage";

describe("StorageService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should save and retrieve routines", () => {
    const routine = { id: "1", name: "Test Routine", day: 1, exercises: [] };
    storageService.saveRoutine(routine);

    const routines = storageService.getRoutines();
    expect(routines).toHaveLength(1);
    expect(routines[0]).toEqual(routine);
  });

  it("should update existing routine", () => {
    const routine = { id: "1", name: "Test Routine", day: 1, exercises: [] };
    storageService.saveRoutine(routine);

    const updatedRoutine = { ...routine, name: "Updated Name" };
    storageService.saveRoutine(updatedRoutine);

    const routines = storageService.getRoutines();
    expect(routines).toHaveLength(1);
    expect(routines[0].name).toBe("Updated Name");
  });

  it("should delete routine", () => {
    const routine = { id: "1", name: "Test Routine", day: 1, exercises: [] };
    storageService.saveRoutine(routine);
    storageService.deleteRoutine("1");

    const routines = storageService.getRoutines();
    expect(routines).toHaveLength(0);
  });
});
