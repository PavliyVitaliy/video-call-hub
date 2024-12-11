import { MessageEntity } from 'src/chat/entities/message.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToMany,
} from 'typeorm';

export const ROOMS_TABLE_NAME = 'rooms';

@Entity(ROOMS_TABLE_NAME)
export class RoomEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @OneToMany(() => MessageEntity, (message) => message.room)
    public messages: MessageEntity[];

    @ManyToOne(() => UserEntity, { nullable: false, eager: true })
    @JoinColumn({ name: 'creatorId' })
    public creator: UserEntity;

    @Column({
        nullable: false,
    })
    public creatorId: string;

    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt: Date;
}
