import { User } from './user';

export type Profile = {
    profile_id: string;
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    github_link: string;
    linkedin_link: string;
    location: string;
    birth_date: Date;
    gender: string;
    user: User;
}