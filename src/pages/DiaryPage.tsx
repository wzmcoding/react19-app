import { useStore } from '../store';
import { useForm } from 'react-hook-form';
import { formatDate } from '../utils/date';

interface DiaryForm {
    content: string;
    mood: 'happy' | 'sad' | 'normal' | 'excited' | 'angry';
    images: FileList;
}

export default function DiaryPage() {
    const { diaries, addDiaryEntry } = useStore();
    const { register, handleSubmit, reset } = useForm<DiaryForm>();

    const onSubmit = (data: DiaryForm) => {
        const newDiary = {
            id: Date.now().toString(),
            content: data.content,
            mood: data.mood,
            date: new Date().toISOString(),
            author: '我',
            images: Array.from(data.images).map(file => URL.createObjectURL(file))
        };

        addDiaryEntry(newDiary);
        reset();
    };

    const getMoodEmoji = (mood: string) => {
        const emojis = {
            happy: '😊',
            sad: '😢',
            normal: '😐',
            excited: '🥳',
            angry: '😠'
        };
        return emojis[mood as keyof typeof emojis];
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">今日心情</h1>
                <p className="text-gray-600">记录生活的点点滴滴</p>
            </div>

            {/* 写日记表单 */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">写日记</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <select
                            className="select select-bordered w-full"
                            {...register('mood', { required: true })}
                        >
                            <option value="">选择心情...</option>
                            <option value="happy">开心 😊</option>
                            <option value="sad">难过 😢</option>
                            <option value="normal">平静 😐</option>
                            <option value="excited">兴奋 🥳</option>
                            <option value="angry">生气 😠</option>
                        </select>

                        <textarea
                            className="textarea textarea-bordered w-full h-32"
                            placeholder="今天发生了什么..."
                            {...register('content', { required: true })}
                        />

                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            multiple
                            accept="image/*"
                            {...register('images')}
                        />

                        <button type="submit" className="btn btn-primary w-full">
                            保存日记
                        </button>
                    </form>
                </div>
            </div>

            {/* 日记列表 */}
            <div className="space-y-4">
                {diaries.map(diary => (
                    <div key={diary.id} className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">{getMoodEmoji(diary.mood)}</span>
                                    <span className="text-sm text-gray-500">
                                        {formatDate(diary.date)}
                                    </span>
                                </div>
                                <span className="badge badge-primary">{diary.author}</span>
                            </div>

                            <p className="py-4">{diary.content}</p>

                            {diary.images && diary.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-2">
                                    {diary.images.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image}
                                            alt={`日记图片 ${index + 1}`}
                                            className="rounded-lg object-cover w-full h-48"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
} 