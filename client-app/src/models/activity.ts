import { act } from "react-dom/test-utils";
import { Profile } from "./profile";

export interface Activity {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUserName: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile
    attendees: Profile[]
}

export class Activity implements Activity {
    constructor(init?: ActivityFormValues) {
        Object.assign(this, init);
    }
}

export class ActivityFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(activitiy?: ActivityFormValues) {
        if (activitiy) {
            this.id = activitiy.id;
            this.title = activitiy.title;
            this.category = activitiy.category;
            this.description = activitiy.description;
            this.date = activitiy.date;
            this.venue = activitiy.venue;
            this.city = activitiy.city;
        }
    }
}