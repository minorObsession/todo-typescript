export type Item = {
  ID: number;
  title: string;
  isFinished: boolean;
  createdAt: number;
  completedAt?: number;
  completedInMs?: number;
  completedIn?: string;
};

export type Items = Item[];
