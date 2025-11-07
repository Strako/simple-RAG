"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = initSwagger;
const swagger_1 = require("@nestjs/swagger");
const helpers_1 = require("../common/helpers");
const envs_1 = require("./envs");
const swaggerOptions = {
    customCss: `.swagger-ui 
  .topbar { background-color: #222222ff; border-bottom: 15px solid #000000ff; } 
  .topbar-wrapper img {content:url(''); width:auto; height:30px;}`,
    customSiteTitle: `${helpers_1.PROJECT_NAME} Docs`,
    customfavIcon: '',
};
async function initSwagger(app, configService) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle(`${helpers_1.PROJECT_NAME.replaceAll('-', ' ').toUpperCase()} (${envs_1.envs.nodeEnv.toUpperCase()})`)
        .setDescription('Simle RAG')
        .setContact('Support', '', 'armandoh.ibarra@gmail.com')
        .setLicense('AIHI', 'http://aihi.work/')
        .setVersion(configService.get('npm_package_version') ?? '0.0.1')
        .addBearerAuth({
        type: 'http',
        in: 'header',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup(helpers_1.SWAGGER_URL, app, document, swaggerOptions);
}
//# sourceMappingURL=swagger.js.map