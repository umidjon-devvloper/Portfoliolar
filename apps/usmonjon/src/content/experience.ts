export type Role = {
  id: string;
  company: string | null;
  from: string;
  to: string | null;
  current: boolean;
  stack: string[];
  /** Number of bullet points held in messages under `<id>.duties`. */
  duties: number;
};

// TODO: no role is listed until the dates and employers are confirmed.
export const roles: Role[] = [];
