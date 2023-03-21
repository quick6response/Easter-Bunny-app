export interface IRequest<T> {
  data: T;
  status: 'success';
}

export interface IRequestError {
  message: string;
  status: 'error';
}
