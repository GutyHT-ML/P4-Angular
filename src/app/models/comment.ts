export interface Comment {
    id:          number;
    post_id:     number;
    title:       string;
    description: string;
    user_id:     number;
    created_at:  Date;
    updated_at:  Date;
}
