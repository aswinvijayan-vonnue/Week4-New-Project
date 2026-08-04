export interface User {
  id: number;
  name: string;
}
export type MovieType = {
  id: string;
  imgSrc: string;
  movie: string;
  director: string;
  year: string;
  description: string;
};

export type StateType = {
  route: {
    path: string;
    params: Record<string, string>;
  };
  username?: string;
  movies?: MovieType[];
};
export type ActionType =
  | {
      type: 'ROUTE_CHANGED';
      payload: {
        path: string;
        params: Record<string, string>;
      };
    }
  | {
      type: 'CREATE_MOVIE';
      payload: MovieType;
    }
  | {
      type: 'USER_CHANGED';
      payload: string;
    }
  | {
      type: 'DELETE_MOVIE';
      payload: string;
    };

export type RenderArg = void | string | undefined;
export type ReturnArg = void | boolean;
