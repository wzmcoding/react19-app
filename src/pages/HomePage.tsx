import { useStore } from '../store';
import { useForm } from 'react-hook-form';
import { formatDate, getDaysDifference } from '../utils/date';
import { useState } from 'react';

interface MemoryForm {
    content: string;
    images: FileList;
}

export default function HomePage() {
    const { memories, addMemory } = useStore();
    const { register, handleSubmit, reset } = useForm<MemoryForm>();
    const [anniversaryDate] = useState('2024-01-01'); // 这里可以从store获取或设置
    const [showAddMemory, setShowAddMemory] = useState(false);

    const onSubmit = (data: MemoryForm) => {
        const newMemory = {
            id: Date.now().toString(),
            content: data.content,
            date: new Date().toISOString(),
            createdBy: '我',
            images: Array.from(data.images).map(file => URL.createObjectURL(file))
        };

        addMemory(newMemory);
        reset();
        setShowAddMemory(false);
    };

    // 计算在一起的天数
    const daysCount = getDaysDifference(new Date(anniversaryDate));

    // 计算下一个纪念日
    const nextAnniversary = new Date(anniversaryDate);
    nextAnniversary.setFullYear(new Date().getFullYear());
    if (nextAnniversary < new Date()) {
        nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
    }
    const daysToNextAnniversary = getDaysDifference(new Date(), nextAnniversary);

    return (
        <div className="space-y-8">
            {/* 重要日期卡片 */}
            <div className="stats shadow w-full bg-primary text-primary-content">
                <div className="stat">
                    <div className="stat-title">在一起</div>
                    <div className="stat-value">{daysCount}</div>
                    <div className="stat-desc">天</div>
                </div>
                <div className="stat">
                    <div className="stat-title">下次纪念日</div>
                    <div className="stat-value">{daysToNextAnniversary}</div>
                    <div className="stat-desc">天后</div>
                </div>
            </div>

            {/* 添加记忆按钮 */}
            <div className="text-center">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setShowAddMemory(true)}
                >
                    记录新回忆
                </button>
            </div>

            {/* 添加记忆表单 */}
            {showAddMemory && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="card bg-base-100 w-full max-w-lg">
                        <div className="card-body">
                            <h2 className="card-title">记录新回忆</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <textarea
                                    className="textarea textarea-bordered w-full h-32"
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
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        className="btn"
                                        onClick={() => setShowAddMemory(false)}
                                    >
                                        取消
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        保存
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* 记忆墙 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {memories.map(memory => (
                    <div key={memory.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
                        {memory.images && memory.images.length > 0 && (
                            <figure className="relative h-48">
                                <img
                                    src={memory.images[0]}
                                    alt="记忆照片"
                                    className="w-full h-full object-cover"
                                />
                                {memory.images.length > 1 && (
                                    <div className="absolute bottom-2 right-2 badge badge-primary">
                                        +{memory.images.length - 1}
                                    </div>
                                )}
                            </figure>
                        )}
                        <div className="card-body">
                            <p className="text-lg">{memory.content}</p>
                            <div className="card-actions justify-between items-center mt-4">
                                <span className="text-sm text-gray-500">
                                    {formatDate(memory.date)}
                                </span>
                                <div className="badge badge-ghost">{memory.createdBy}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* 空状态提示 */}
            {memories.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-4xl mb-4">📝</div>
                    <h3 className="text-xl font-semibold mb-2">还没有记忆</h3>
                    <p className="text-gray-500">点击上方按钮记录你们的第一个回忆吧！</p>
                </div>
            )}
        </div>
    );
} 