import { useStore } from '../store';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface MemoryForm {
    content: string;
    images: FileList;
}

export default function HomePage() {
    const { memories, addMemory } = useStore();
    const { register, handleSubmit, reset } = useForm<MemoryForm>();

    const onSubmit = (data: MemoryForm) => {
        const newMemory = {
            id: Date.now().toString(),
            content: data.content,
            date: new Date().toISOString(),
            createdBy: '我', // 这里可以改为实际的用户名
            images: Array.from(data.images).map(file => URL.createObjectURL(file))
        };

        addMemory(newMemory);
        reset();
    };

    return (
        <div className="space-y-8">
            {/* 记忆墙标题 */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">我们的记忆墙</h1>
                <p className="text-gray-600">记录每一个美好时刻</p>
            </div>

            {/* 添加新记忆表单 */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">添加新记忆</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="写下此刻的心情..."
                            {...register('content', { required: true })}
                        />
                        <input
                            type="file"
                            className="file-input file-input-bordered w-full"
                            multiple
                            accept="image/*"
                            {...register('images')}
                        />
                        <button type="submit" className="btn btn-primary">保存记忆</button>
                    </form>
                </div>
            </div>

            {/* 记忆列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {memories.map(memory => (
                    <div key={memory.id} className="card bg-base-100 shadow-xl">
                        {memory.images && memory.images.length > 0 && (
                            <figure>
                                <img src={memory.images[0]} alt="记忆照片" className="w-full h-48 object-cover" />
                            </figure>
                        )}
                        <div className="card-body">
                            <p>{memory.content}</p>
                            <div className="card-actions justify-between items-center">
                                <span className="text-sm text-gray-500">
                                    {format(new Date(memory.date), 'PPP', { locale: zhCN })}
                                </span>
                                <span className="badge badge-primary">{memory.createdBy}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 重要日期提醒 */}
            <div className="card bg-primary text-primary-content">
                <div className="card-body">
                    <h2 className="card-title">重要日期</h2>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">在一起</div>
                            <div className="stat-value">365</div>
                            <div className="stat-desc">天</div>
                        </div>
                        <div className="stat">
                            <div className="stat-title">下次纪念日</div>
                            <div className="stat-value">30</div>
                            <div className="stat-desc">天后</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 