import { RoomEntity } from 'src/rooms/entities/room.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

export const MESSAGES_TABLE_NAME = 'messages';

@Entity(MESSAGES_TABLE_NAME)
export class MessageEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        nullable: false,
    })
    public roomId: string;

    @ManyToOne(() => RoomEntity, (room) => room.messages, { eager: true })
    @JoinColumn({ name: 'roomId' })
    public room: RoomEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'userId' })
    public user: UserEntity;

    @Column({
        nullable: false,
    })
    public userId: string;

    @Column({
        type: 'text',
        nullable: false,
    })
    public content: string;

    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt: Date;
}
