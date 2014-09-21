var config = require('../../config/config'),
    expect = require('chai').expect,
    path   = require('path');

describe("Config Settings", function(){

    it ('verify the config settings',function() {
        expect(config).not.to.equal(undefined);

        /* make sure these values exist because they should! */
        expect(config.db).not.to.equal(undefined);
        expect(config.port).to.equal(3030);
        expect(config.rootPath).to.equal(path.normalize(__dirname +  '/../../../'));
    });
});