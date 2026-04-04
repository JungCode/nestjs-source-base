import {
  calculatePercentage,
  roundNumberWithTwoDecimals,
} from '@/common/utils/algorithm';

export const averageRatingFormula = (
  totalStars: number,
  totalFeedbacks: number,
) => {
  if (totalFeedbacks === 0) {
    return 0;
  }

  return roundNumberWithTwoDecimals(totalStars / totalFeedbacks);
};

export const feedbackCompletionPercentageFormula = (
  totalFeedbacks: number,
  totalJobs: number,
) => {
  if (totalJobs === 0) {
    return 0;
  }

  return calculatePercentage(totalFeedbacks, totalJobs, 2);
};

export const badWillScoreFormula = (
  level1Complaint: number,
  level2Complaint: number,
  level3Complaint: number,
  totalJobs: number,
) => {
  if (totalJobs === 0) {
    return 0;
  }

  return roundNumberWithTwoDecimals(
    (level1Complaint + level2Complaint * 2 + level3Complaint * 4) / totalJobs,
  );
};

export const goodWillScoreFormula = (
  averageRating: number,
  totalFeedbacks: number,
  badwillScore: number,
  totalJobs: number,
) => {
  if (totalJobs === 0) {
    return 0;
  }

  return roundNumberWithTwoDecimals(
    (averageRating * totalFeedbacks - badwillScore * totalJobs) / totalJobs,
  );
};

export const netPromoteScoreFormula = (
  fiveStarCount: number,
  badWillScore: number,
  totalJobs: number,
) => {
  return roundNumberWithTwoDecimals(fiveStarCount - badWillScore * totalJobs);
};
