"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVersion = void 0;
const fs_1 = require("fs");
const getVersion = () => {
    const packagejson = JSON.parse((0, fs_1.readFileSync)('././package.json', 'utf8'));
    const version = process.env.npm_package_version ?? packagejson.version;
    process.env.npm_package_version = version;
    return version;
};
exports.getVersion = getVersion;
//# sourceMappingURL=version.js.map