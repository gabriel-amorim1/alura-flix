import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';
import Category from '../../category/schemas/Category';

@Entity('videos')
class Video {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ nullable: true })
    category_id?: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;

    @ManyToOne(() => Category, category => category.videos)
    category?: Category;
}

export default Video;
