import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    OneToMany,
    UpdateDateColumn,
} from 'typeorm';
import Video from '../../video/schemas/Video';

@Entity('categories')
class Category {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    title: string;

    @Column()
    color: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date | null;

    @OneToMany(() => Video, video => video.category)
    videos?: Video[];
}

export default Category;
