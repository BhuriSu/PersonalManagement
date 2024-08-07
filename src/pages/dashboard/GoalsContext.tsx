export const useCalculateCompletionPercentage = (totalGoals: number, completedGoals: number): number => {
    if (totalGoals === 0) return 0;
    return (completedGoals / totalGoals) * 100;
  };