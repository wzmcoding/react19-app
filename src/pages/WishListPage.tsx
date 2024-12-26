import { useStore } from '../store';
import { useForm } from 'react-hook-form';

interface WishForm {
    title: string;
    description: string;
}

export default function WishListPage() {
    const { wishList, addWishListItem, toggleWishListItem } = useStore();
    const { register, handleSubmit, reset } = useForm<WishForm>();

    const onSubmit = (data: WishForm) => {
        const newWish = {
            id: Date.now().toString(),
            title: data.title,
            description: data.description,
            completed: false,
            createdAt: new Date().toISOString()
        };

        addWishListItem(newWish);
        reset();
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h1 className="text-3xl font-bold text-primary">我们的愿望清单</h1>
                <p className="text-gray-600">记录想要一起完成的事情</p>
            </div>

            {/* 添加愿望表单 */}
            <div className="card bg-base-200 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">添加新愿望</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <input
                            type="text"
                            placeholder="愿望标题"
                            className="input input-bordered w-full"
                            {...register('title', { required: true })}
                        />

                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="详细描述..."
                            {...register('description', { required: true })}
                        />

                        <button type="submit" className="btn btn-primary w-full">
                            添加愿望
                        </button>
                    </form>
                </div>
            </div>

            {/* 愿望列表 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">进行中</h2>
                    {wishList
                        .filter(wish => !wish.completed)
                        .map(wish => (
                            <div key={wish.id} className="card bg-base-100 shadow-xl">
                                <div className="card-body">
                                    <h3 className="card-title">{wish.title}</h3>
                                    <p>{wish.description}</p>
                                    <div className="card-actions justify-end">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => toggleWishListItem(wish.id)}
                                        >
                                            完成
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold">已完成</h2>
                    {wishList
                        .filter(wish => wish.completed)
                        .map(wish => (
                            <div key={wish.id} className="card bg-base-100 shadow-xl opacity-70">
                                <div className="card-body">
                                    <h3 className="card-title line-through">{wish.title}</h3>
                                    <p className="line-through">{wish.description}</p>
                                    <div className="text-sm text-gray-500">
                                        完成于: {new Date(wish.completedAt!).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
} 