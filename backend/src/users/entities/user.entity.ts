import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BaseEntity,
    CreateDateColumn
} from 'typeorm';

export const TABLE_Name = 'users';

@Entity(TABLE_Name)
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({
        nullable: false,
    })
    public username: string;

    @Column({
        nullable: false,
        unique: true,
    })
    public email: string;

    @Column({
        nullable: false,
    })
    public password: string;

    @Column({ default: true })
    public isActive: boolean;

    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt: Date;
}
