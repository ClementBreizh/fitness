
export interface Exercise {
    id: string;
    name: string;
    duration: number;
    date?: Date;
    state?: 'oui' | 'non' | null;
    minutes?: number,
    secondes?: number
}