export type Item = {
  ID: string;
  title: string;
  isFinished: boolean;
  createdAt: number;
  completedAt?: number;
  completedInMs?: number;
  completedIn?: string;
};

export type Items = Item[];
