import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class UpdateCarBrandId1767013542625 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cars", "brand");
        await queryRunner.addColumn("cars",
            new TableColumn({
                name: "brand_id",
                type: "uuid",
                isNullable: true
            })
        );
        await queryRunner.createForeignKey("cars", new TableForeignKey({
            columnNames: ["brand_id"],
            referencedTableName: "brands",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
            name: "FKBrandCar"
        }))

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("cars", "FKBrandCar");
        await queryRunner.dropColumn("cars", "brand_id");
        await queryRunner.addColumn("cars",
            new TableColumn({
                name: "brand",
                type: "varchar",
            })
        )
    }

}
