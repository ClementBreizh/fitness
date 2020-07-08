
export interface Exercise {
    id: string;
    name: string;
    duration: number;
    date?: Date;
    state?: 'fini' | 'annulé' | null;
}