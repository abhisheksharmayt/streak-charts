interface UserCalendar {
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  dccBadges: any[]; // Assuming the type of dccBadges is not provided
  submissionCalendar: string; // JSON string representation, you might want to parse this separately
}

interface MatchedUser {
  userCalendar: UserCalendar;
}

export interface LeetcodeStreakData {
  matchedUser: MatchedUser;
}
