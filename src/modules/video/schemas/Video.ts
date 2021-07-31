import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ObjectID,
    ObjectIdColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('videos')
class Video {
    @ObjectIdColumn()
    _id: ObjectID;

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
    deleted_at: Date;
}

export default Video;
