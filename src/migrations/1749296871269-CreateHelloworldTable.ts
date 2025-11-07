import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateHelloworldTable1749296871269 implements MigrationInterface {
    name = 'CreateHelloworldTable1749296871269'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "helloworld" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b78f9ddbda83d458a3896f23a40" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "helloworld"`);
    }

}
