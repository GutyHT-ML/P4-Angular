export interface Post {
    id:          number;
    title:       string;
    description: string;
    user_id:     number;
    created_at:  Date;
    updated_at:  Date;
    comments: Comment[];
    user: User;
}

export interface Comment {
  id:          number;
  post_id:     number;
  title:       string;
  description: string;
  user_id:     number;
  created_at:  Date;
  updated_at:  Date;
  user: User;
  editing: Boolean;
}

export interface User {
  id: number;
  username: string;
  email: string;
  created_at:  Date;
  updated_at:  Date;
}
