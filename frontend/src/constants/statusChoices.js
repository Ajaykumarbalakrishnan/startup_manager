// Status choices matching backend
export const PROJECT_STATUSES = [
  { value: "planned", label: "Planned" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
  { value: "paused", label: "Paused" },
];

export const TASK_STATUSES = [
  { value: "todo", label: "To Do" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
  { value: "blocked", label: "Blocked" },
];

export const PHASE_STATUSES = PROJECT_STATUSES;

export const STAGE_STATUSES = PROJECT_STATUSES;

export const COMPANY_STATUSES = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export const PRODUCT_STATUSES = COMPANY_STATUSES;
