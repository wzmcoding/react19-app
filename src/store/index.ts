import { create } from 'zustand';
import { Memory, WishListItem, DiaryEntry } from '../types';

interface AuthState {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface StoreState extends AuthState {
    memories: Memory[];
    wishList: WishListItem[];
    diaries: DiaryEntry[];
    addMemory: (memory: Memory) => void;
    addWishListItem: (item: WishListItem) => void;
    addDiaryEntry: (entry: DiaryEntry) => void;
    toggleWishListItem: (id: string) => void;
}

export const useStore = create<StoreState>((set) => ({
    // Auth state
    isAuthenticated: false,
    user: null,
    login: async (username: string, password: string) => {
        // 这里可以添加实际的登录逻辑
        set({ isAuthenticated: true, user: username });
    },
    logout: () => set({ isAuthenticated: false, user: null }),

    // 原有的状态
    memories: [],
    wishList: [],
    diaries: [],

    addMemory: (memory) => set((state) => ({
        memories: [...state.memories, memory]
    })),

    addWishListItem: (item) => set((state) => ({
        wishList: [...state.wishList, item]
    })),

    addDiaryEntry: (entry) => set((state) => ({
        diaries: [...state.diaries, entry]
    })),

    toggleWishListItem: (id) => set((state) => ({
        wishList: state.wishList.map(item =>
            item.id === id
                ? { ...item, completed: !item.completed, completedAt: !item.completed ? new Date().toISOString() : undefined }
                : item
        )
    })),
})); 