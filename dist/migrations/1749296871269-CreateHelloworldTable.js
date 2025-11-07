"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHelloworldTable1749296871269 = void 0;
class CreateHelloworldTable1749296871269 {
    name = 'CreateHelloworldTable1749296871269';
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "helloworld" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b78f9ddbda83d458a3896f23a40" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "helloworld"`);
    }
}
exports.CreateHelloworldTable1749296871269 = CreateHelloworldTable1749296871269;
//# sourceMappingURL=1749296871269-CreateHelloworldTable.js.map