import Decimal from 'decimal.js';

import { roundNumberWithTwoDecimals } from '@/common/utils/algorithm';

export const salesWeekAverageFormula = (
  currentSaleWeek: number,
  totalOperators: number,
) => {
  if (totalOperators === 0) {
    return 0;
  }
  return roundNumberWithTwoDecimals(currentSaleWeek / totalOperators);
};

export const productionPayrollAverageFormula = (
  productionPayroll: number,
  totalOperators: number,
) => {
  if (totalOperators === 0) {
    return 0;
  }
  return roundNumberWithTwoDecimals(productionPayroll / totalOperators);
};

export const salesProgressBarFormula = (
  salesYTD: number,
  companyGoal: number,
) => {
  if (companyGoal === 0) return 0;

  const progress = (salesYTD / companyGoal) * 100;
  return roundNumberWithTwoDecimals(progress);
};

export const salesYTDAverageFormula = (
  saleYTD: number,
  totalOperators: number,
) => {
  if (totalOperators === 0) {
    return 0;
  }
  return roundNumberWithTwoDecimals(saleYTD / totalOperators);
};

export const productionProgressBarFormula = (
  currentProduction: number,
  companyProductionGoal: number,
) => {
  if (companyProductionGoal === 0) return 0;

  const progress = (currentProduction / companyProductionGoal) * 100;
  return roundNumberWithTwoDecimals(progress);
};

export const currentPayrollProductionFormula = (
  productionYTD: number,
  lastPayrollProduction: number,
) => {
  return productionYTD - lastPayrollProduction;
};

export const productionYTDAverageFormula = (
  productionYTD: number,
  totalOperators: number,
) => {
  if (totalOperators === 0) {
    return 0;
  }
  return roundNumberWithTwoDecimals(productionYTD / totalOperators);
};

export const weeklySaleGoalFormula = (factor: number, goal: number) => {
  return roundNumberWithTwoDecimals(factor * goal);
};

export const avgJobSizeFormula = (totalJobs: number, sales: number) => {
  if (!totalJobs) {
    return 0;
  }
  return roundNumberWithTwoDecimals(sales / totalJobs);
};

export const LCRFormula = (totalConvertedLeads: number, totalLeads: number) => {
  if (!totalLeads) {
    return 0;
  }
  return roundNumberWithTwoDecimals(totalConvertedLeads / totalLeads);
};

export const leadsYTDGoalFormula = (totalEstimation: number, lcr: number) => {
  if (!lcr) return 0;

  return roundNumberWithTwoDecimals(totalEstimation / lcr);
};

export const bookingRateFormula = (totalJobs: number, totalEst: number) => {
  if (!totalEst) return 0;

  return roundNumberWithTwoDecimals(totalJobs / totalEst);
};

export const jobBookedYtdGoalFormula = (goal: number, avgJobSize: number) => {
  if (!avgJobSize) return 0;
  return roundNumberWithTwoDecimals(goal / avgJobSize);
};

export const estCompletedYtdGoalFormula = (
  jobBookedYtdGoal: number,
  bookingRate: number,
) => {
  if (!bookingRate) return 0;

  return roundNumberWithTwoDecimals(jobBookedYtdGoal / bookingRate);
};

export const leadWeeklyGoalFormula = (
  estCompletedYtdGoal: number,
  lcr: number,
) => {
  if (!lcr) return 0;
  return roundNumberWithTwoDecimals(estCompletedYtdGoal / lcr);
};

export const efficiencyFactorFormula = (
  hoursPaid: number,
  hoursWorked: number,
) => {
  if (!hoursWorked) return 0;

  const paid = new Decimal(hoursPaid);
  const worked = new Decimal(hoursWorked);
  return paid.div(worked).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
};

export const currentProductionPayrollFormula = (
  productionYTD: number,
  pastProductionPayrolls: number,
) => {
  return productionYTD - pastProductionPayrolls;
};

export const estimateCancellationRateFormula = (
  totalEstimates: number,
  totalEstimateAppointments: number,
) => {
  if (!totalEstimateAppointments) {
    return 0;
  }

  return 1 - totalEstimates / totalEstimateAppointments;
};

export const estSetGoalFormula = (
  totalJobs: number,
  bookingRate: number,
  estimateCancellationRate: number,
) => {
  if (!estimateCancellationRate || !bookingRate) {
    return 0;
  }

  return Math.ceil(totalJobs / (bookingRate * estimateCancellationRate));
};
