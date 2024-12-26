export interface Memory {
    id: string;
    content: string;
    images?: string[];
    date: string;
    createdBy: string;
}

export interface WishListItem {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    completedAt?: string;
}

export interface DiaryEntry {
    id: string;
    content: string;
    mood: 'happy' | 'sad' | 'normal' | 'excited' | 'angry';
    images?: string[];
    date: string;
    author: string;
} 