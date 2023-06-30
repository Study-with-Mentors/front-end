export type GetClassResult = {
  id: string;
  version: number;
  startDate: Date;
  endDate: Date;
  enrollmentEndDate: Date;
  status: string;
  price: number;
  courseId: string;
};

export type GetSearchClass = {
  totalPages: number;
  totalElements: number;
  result: GetClassResult[];
};
